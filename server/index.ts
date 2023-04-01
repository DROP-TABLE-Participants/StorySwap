import fastify from "fastify";
import fastifyIO from "fastify-socket.io";
import AppDataSource from "./data-source";

import Room from "./entities/Room";
import RoomsUsersRoles from "./entities/RoomsUsersRoles";
import RoomsUsersStates from "./entities/RoomsUsersStates";

import roomsController from "./routes/rooms";
import {onCreate, onGameStart, onJoin} from "./routes/sockets";

const server = fastify({
    logger: true,
});
server.register(fastifyIO);

server.register(roomsController, { prefix: "/rooms" });

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

        socket.on("ready", async (roomId: string) => {
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


            if (readyUsers.length == server.io.sockets.adapter.rooms.get(roomId)?.size) {
                server.io.to(roomId).emit("can_start_game");
                return;
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

                await AppDataSource.getRepository(RoomsUsersStates).save(newRoomState);
            }

            server.io.to(roomId).emit("user_ready", {userId: socket.id});
        });

    });
});

server.listen({
    port: 3000
});

AppDataSource.initialize()


