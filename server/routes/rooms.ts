import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";

import AppDataSource from "../data-source";

import User from "../entities/User";

const roomsController = (server: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    server.get("/generate", (req, res) => {
        return "a";
    })
    


    done();
}

export default roomsController;
