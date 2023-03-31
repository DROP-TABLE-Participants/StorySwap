import { FastifyInstance, FastifyPluginOptions } from "fastify";

const roomsController = (server: FastifyInstance, opts: FastifyPluginOptions, done) => {
    server.get("/generate", (req, res) => {
        res.send("a")
    });

    server.post("/connect", (req, res) => {
        console.log(req.body);

        server.io.in()
    });

    done();
}

export default roomsController;
