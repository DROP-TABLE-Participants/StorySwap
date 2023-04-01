import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";

import AppDataSource from "../data-source";

import User from "../entities/User";

const usersController = (server: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    server.get("/:id", (req: any, res) => {
        return AppDataSource.getRepository(User).findOne({where: {userId: req.params.id}});
    })
    


    done();
}

export default usersController;
