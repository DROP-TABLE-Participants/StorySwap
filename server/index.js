"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_socket_io_1 = __importDefault(require("fastify-socket.io"));
const data_source_1 = __importDefault(require("./data-source"));
const Room_1 = __importDefault(require("./entities/Room"));
const RoomsUsersRoles_1 = __importDefault(require("./entities/RoomsUsersRoles"));
const rooms_1 = __importDefault(require("./routes/rooms"));
const server = (0, fastify_1.default)({
    logger: true,
});
server.register(fastify_socket_io_1.default);
server.register(rooms_1.default, { prefix: "/rooms" });
server.ready().then(() => {
    server.io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
        socket.on("create", (room) => __awaiter(void 0, void 0, void 0, function* () {
            socket.join(room);
            const newRoom = new Room_1.default();
            newRoom.roomId = room;
            const roomId = yield data_source_1.default.manager.save(newRoom);
            const roomUserRole = new RoomsUsersRoles_1.default();
            roomUserRole.room = roomId;
            roomUserRole.userId = socket.id;
            roomUserRole.type = "admin";
            yield data_source_1.default.manager.save(roomUserRole);
            socket.emit("room_created");
        }));
        socket.on("join", (roomId) => __awaiter(void 0, void 0, void 0, function* () {
            const room = yield data_source_1.default
                .getRepository(Room_1.default)
                .findOne({
                where: {
                    roomId: roomId
                }
            });
            if (!room) {
                socket.emit("room_does_not_exist");
                return;
            }
            const isUserAlreadyInRoom = yield data_source_1.default
                .getRepository(RoomsUsersRoles_1.default)
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
            const roomUserRole = new RoomsUsersRoles_1.default();
            roomUserRole.room = room;
            roomUserRole.userId = socket.id;
            roomUserRole.type = "user";
            yield data_source_1.default.manager.save(roomUserRole);
            socket.join(roomId);
            socket.emit("user_joined");
        }));
    }));
});
server.listen({
    port: 3000
});
data_source_1.default.initialize();
