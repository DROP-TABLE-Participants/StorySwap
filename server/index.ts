import fastify from "fastify";
import fastifyIO from "fastify-socket.io";

import roomsController from "./routes/rooms";

const server = fastify({
    logger: true,
});
server.register(fastifyIO);

server.register(roomsController, { prefix: "/rooms" });

server.ready().then(() => {
    server.io.on("connection", (socket) => {
        socket.on("create", (room: string) => {
            socket.join(room);
        });
    });
});

server.listen({
    port: 3000
});
