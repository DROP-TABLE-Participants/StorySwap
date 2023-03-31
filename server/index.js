"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_socket_io_1 = __importDefault(require("fastify-socket.io"));
const rooms_1 = __importDefault(require("./routes/rooms"));
const server = (0, fastify_1.default)({
    logger: true,
});
server.register(fastify_socket_io_1.default);
server.register(rooms_1.default, { prefix: "/rooms" });
server.ready().then(() => {
    server.io.on("connection", (socket) => {
        socket.on("create", (room) => {
            socket.join(room);
        });
    });
});
server.listen({
    port: 3000
});
