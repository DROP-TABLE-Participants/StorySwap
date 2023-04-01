import { Socket } from "socket.io";
import {FastifyInstance} from "fastify";

import Room from "../entities/Room";
import AppDataSource from "../data-source";
import RoomsUsersRoles from "../entities/RoomsUsersRoles";
import { getUserRole } from "../utils/sockets";
import RoomsUsersStates from "../entities/RoomsUsersStates";


export const onCreate = async (socket: Socket, room: string) => {
    const roomAlreadyExists = await AppDataSource.getRepository(Room).findOne({where: {roomId: room}});

    if (roomAlreadyExists) {
        const userIsAdmin = await AppDataSource
            .getRepository(RoomsUsersRoles)
            .findOne({
                where: {
                    room: roomAlreadyExists,
                    userId: socket.id,
                    type: "admin"
                }
            });

        if (userIsAdmin) {
            socket.join(room);
        } else {
            socket.emit("room_already_exists")
            return;
        }
        socket.emit("room_created");
        return;
    }

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
}

export const onJoin = async (socket: Socket, roomId: string) => {
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
        });

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
}

export const onGameStart = async (server: FastifyInstance, socket: Socket, roomId: string) => {
    const isUserAdminAndInRoom = await AppDataSource
        .getRepository(RoomsUsersRoles)
        .findOne({
            where: {
                room: {roomId: roomId},
                userId: socket.id,
                type: "admin"
            }
        });

    if (!isUserAdminAndInRoom) {
        socket.emit("insufficient_rights");
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


    if (readyUsers.length != server.io.sockets.adapter.rooms.get(roomId)?.size) {
        server.io.to(roomId).emit("can_not_start_game");
        return;
    }

        server.io.to(roomId).emit("start_game");
}
