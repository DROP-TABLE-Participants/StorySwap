import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import AppDataSource from "@app/data-source";

@Entity()
export default class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roomId: string;
}
