import { FastifyInstance, FastifyPluginOptions } from "fastify";

const roomsController = (server: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    server.get("/generate", (req, res) => {
        return "a";
    })

    done();
}

export default roomsController;
