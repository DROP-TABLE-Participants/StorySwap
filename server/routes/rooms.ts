import { FastifyInstance, FastifyPluginOptions } from "fastify";

const roomsController = (server: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    server.get("/generate", (req, res) => {
        res.send("a")
    });



    done();
}

export default roomsController;
