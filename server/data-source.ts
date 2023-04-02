import "reflect-metadata"
import { DataSource } from "typeorm"

import Room from "./entities/Room";
import RoomsUsersRoles from "./entities/RoomsUsersRoles";
import RoomsOrders from "./entities/RoomsOrders";
import User from "./entities/User";
import RoomsUsersStates from "./entities/RoomsUsersStates";

import * as dotenv from "dotenv";
import UserPrompts from "./entities/UserPrompts";
dotenv.config();


const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: parseInt(process.env.PORT ? process.env.PORT : "5432"),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [Room, RoomsUsersRoles, RoomsUsersStates, User, RoomsOrders, UserPrompts],
    synchronize: true,
    logging: false,
    ssl: true,
    migrations: [
        "./migrations/**/*.js"
    ],

})

export default AppDataSource;
