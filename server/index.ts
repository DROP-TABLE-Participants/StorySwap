import fastify from "fastify";
import fastifyIO from "fastify-socket.io";
import fastifyCors from "@fastify/cors";
import AppDataSource from "./data-source";

import Room from "./entities/Room";
import User from "./entities/User";
import RoomsUsersRoles from "./entities/RoomsUsersRoles";
import RoomsUsersStates from "./entities/RoomsUsersStates";

import roomsController from "./routes/rooms";
import {onCreate, onGameStart, onJoin} from "./routes/sockets";
import ImageService from "./services/ImageService";
import usersController from "./routes/users";
import RoomsOrders from "./entities/RoomsOrders";
import UserPrompts from "./entities/UserPrompts";

const server = fastify({
    logger: true,
});
server.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});
server.register(fastifyIO, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },
});

server.register(roomsController, { prefix: "/rooms" });
server.register(usersController, { prefix: "/users" });

server.ready().then(() => {
    server.io.on("connection", async (socket) => {
        socket.on("create", async (room: string) => {
            await onCreate(socket, room);
        });

        socket.on("join", async (roomId: string) => {
            await onJoin(socket, roomId);
        });

        socket.on("start_game", async (roomId: string) => {
           await onGameStart(server, socket, roomId);
        });

        socket.on("createImage", async (prompt: string) => {
            await ImageService.generateFirstImage(prompt);
        });

        socket.on("ready", async (roomId: string, profileImage: string, username: string) => {
            const room = await AppDataSource.getRepository(Room).findOne({where: {roomId: roomId}});

            if (!room) {
                socket.emit("room_does_not_exist");
                return;
            }

            const readyUsers = await AppDataSource
                .getRepository(RoomsUsersStates)
                .find({
                    where: {
                        room: {roomId: roomId},
                        state: "ready"
                    }
                });

            console.log(readyUsers.length);
            console.log(server.io.sockets.adapter.rooms.get(roomId)?.size);

            if (readyUsers.length + 1 == server.io.sockets.adapter.rooms.get(roomId)?.size) {
                server.io.to(roomId).emit("can_start_game");
            }

            if (await AppDataSource.getRepository(RoomsUsersStates).findOne({where:{room: {roomId: roomId}, userId: socket.id}})) {
                await AppDataSource
                    .createQueryBuilder()
                    .update(RoomsUsersStates)
                    .set({state: "ready"})
                    .where(
                        "room = :roomId AND userId = :userId",
                        {roomId: roomId, userId: socket.id}
                    )
                    .execute()
            } else {
                const newRoomState = new RoomsUsersStates();

                newRoomState.room = room;
                newRoomState.userId = socket.id;
                newRoomState.state = "ready";

                await AppDataSource.getRepository(RoomsUsersStates).save(newRoomState)

                const newUser = new User();
                newUser.profileImage = profileImage;
                newUser.userId = socket.id;
                newUser.username = username;

                await AppDataSource.getRepository(User).save(newUser);
            }

            server.io.to(roomId).emit("user_ready", {userId: socket.id, profileImage: profileImage, username: username});
        });

        socket.on("users_in_room", async (roomId: string) => {
            const users = server.io.sockets.adapter.rooms.get(roomId);

            if (!users) {
                socket.emit("users_in_room", 0);
            } else {
                const objectUsers = Array.from(users).map(async (socketId: string) => {
                    return await AppDataSource.getRepository(User).findOne({where: {userId: socketId}});
                });

                const usersArray = await Promise.all(objectUsers);

                socket.emit("users_in_room", usersArray);
            }
        });

        socket.on("start_game", async (roomId: string) => {
            const room = await AppDataSource.getRepository(Room).findOne({where: {roomId: roomId}});

            if (!room) {
                socket.emit("room_does_not_exist");
                return;
            }

            // const isUserAdmin = !!(await AppDataSource
            //     .getRepository(RoomsUsersRoles)
            //     .findOne({
            //         where: {
            //             type: "admin",
            //             room: {roomId: roomId},
            //             userId: socket.id
            //         }
            //     }));
            //
            // if (!isUserAdmin) {
            //     socket.emit("insufficient_rights");
            //     return;
            // }

            const readyUsers = await AppDataSource
                .getRepository(RoomsUsersStates)
                .find({
                    where: {
                        room: {roomId: roomId},
                        state: "ready"
                    }
                });

            if (readyUsers.length != server.io.sockets.adapter.rooms.get(roomId)?.size) {
                server.io.to(roomId).emit("can_not_start_game");
                return;
            }

            // Shuffle
            let ids = server.io.sockets.adapter.rooms.get(roomId);

            if (!ids) {
                return;
            }

            const roomsOrders = new RoomsOrders();
            roomsOrders.order = Array.from(ids);
            roomsOrders.room = room;

            await AppDataSource.getRepository(RoomsOrders).save(roomsOrders);

            server.io.in(roomId).emit("game_start");

            server.io.to(Array.from(ids)[0]).emit("to_draw");

            const newIds = Array.from(ids);
            newIds.shift();

            newIds?.forEach(id => {
                server.io.to(id).emit("to_wait");
            });
        });

        socket.on("create_image", async (roomId: string, prompt: string) => {
            const roomExists = await AppDataSource
                .getRepository(RoomsOrders)
                .exist({
                    where: {
                        room: {roomId: roomId}
                    }
                });

            if (!roomExists) {
                socket.emit("room_does_not_exist");
                return;
            }

            const rounds = await AppDataSource
                .getRepository(UserPrompts)
                .find({
                    where: {
                        room: {roomId: roomId}
                    }
                })

            const roomOrder = await AppDataSource
                .getRepository(RoomsOrders)
                .findOne({
                    where: {
                        room: {roomId: roomId}
                    }
                });

            if (!roomOrder) {
                socket.emit("game_has_not_started");
                return;
            }

            const round = rounds ? (rounds.length + 1) : 1;

            if (roomOrder.order[round - 1] !== socket.id) {
                socket.emit("insufficient_rights");
                return;
            }

            let imageName = "";

            try {
                if (round == 1) {
                    imageName = await ImageService.generateFirstImage(prompt);
                } else {
                    const prevPrompt = await AppDataSource
                        .getRepository(UserPrompts)
                        .findOne({
                            where: {
                                room: {roomId: roomId},
                                order: round
                            }
                        })

                    if (!prevPrompt) {
                        return;
                    }

                    imageName = await ImageService.generateSecondImages(prevPrompt.prompt, prompt);
                }
            } catch (e) {
                console.log(e);
                socket.emit("try_another_prompt");
                return;
            }

            const room = await AppDataSource.getRepository(Room).findOne({where: {roomId: roomId}});
            const user = await AppDataSource.getRepository(User).findOne({where: {userId: socket.id}});

            if (!room) {
                return;
            }

            if (!user) {
                return;
            }

            const newUserPrompt = new UserPrompts();
            newUserPrompt.room = room;
            newUserPrompt.prompt = prompt;
            newUserPrompt.order = round + 1;
            newUserPrompt.user = user;
            newUserPrompt.url = "https://storyswap.blob.core.windows.net/images/" + imageName;

            await AppDataSource.getRepository(UserPrompts).save(newUserPrompt);

            server.io.to(roomOrder?.order[round - 1]).emit("generation_finished", newUserPrompt.url);

            if (round === roomOrder?.order.length) {
                socket.emit("game_finished");
                return;
            } else {
                socket.emit("round_finished");
            }

            server.io.to(roomOrder?.order[round]).emit("to_draw", newUserPrompt.url);

            roomOrder?.order.filter((el, idx) => idx !== round).forEach(el => {
                server.io.to(el).emit("to_wait");
            })

        });

    });
});

server.listen({
    port: parseInt(process.env.PORT || "3000"),
    host: '0.0.0.0',
});

AppDataSource.initialize()
