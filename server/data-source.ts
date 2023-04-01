import "reflect-metadata"
import { DataSource } from "typeorm"

import Room from "./entities/Room";
import RoomsUsersRoles from "./entities/RoomsUsersRoles";

import * as dotenv from "dotenv";
dotenv.config();


const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: "StorySwap",
    entities: [Room, RoomsUsersRoles],
    synchronize: true,
    logging: false,
    migrations: [
        "./migrations/**/*.js"
    ],
})

export default AppDataSource;
