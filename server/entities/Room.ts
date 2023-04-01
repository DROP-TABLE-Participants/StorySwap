import "reflect-metadata"

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({   unique: true })
    roomId: string;
}
