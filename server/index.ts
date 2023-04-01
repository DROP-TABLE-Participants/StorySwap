import fastify from "fastify";
import fastifyIO from "fastify-socket.io";
import AppDataSource from "./data-source";

import Room from "./entities/Room";
import RoomsUsersRoles from "./entities/RoomsUsersRoles";

import roomsController from "./routes/rooms";

const server = fastify({
    logger: true,
});
server.register(fastifyIO);

server.register(roomsController, { prefix: "/rooms" });

server.ready().then(() => {
    server.io.on("connection", async (socket) => {
        socket.on("create", async (room: string) => {
            socket.join(room);

            const newRoom = new Room();
            newRoom.roomId = room;
            const roomId = await AppDataSource.manager.save(newRoom);

            const roomUserRole = new RoomsUsersRoles()
            roomUserRole.room = roomId;
            roomUserRole.userId = socket.id;
            roomUserRole.type = "admin"

            await AppDataSource.manager.save(roomUserRole);

            socket.emit("room_created");
        });

        socket.on("join", async (roomId: string) => {
            const room = await AppDataSource
                .getRepository(Room)
                .findOne({
                    where: {
                        roomId: roomId
                    }
                });

            if (!room) {
                socket.emit("room_does_not_exist");
                return;
            }

            const isUserAlreadyInRoom = await AppDataSource
                .getRepository(RoomsUsersRoles)
                .findOne({
                    where: {
                        room: room,
                        userId: socket.id
                    }
                })

            if (isUserAlreadyInRoom) {
                socket.emit("user_already_in_room");
                return;
            }

            const roomUserRole = new RoomsUsersRoles()

            roomUserRole.room = room;
            roomUserRole.userId = socket.id;
            roomUserRole.type = "user";

            await AppDataSource.manager.save(roomUserRole);

            socket.join(roomId);
            socket.emit("user_joined");
        })
    });
});

server.listen({
    port: 3000
});

AppDataSource.initialize()
