import "reflect-metadata"
import {Entity, JoinColumn, Column, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Room from "./Room";

@Entity()
export default class RoomsUsersRoles {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Room, (room) => room.id, { persistence: false })
    @JoinColumn({name: "room"})
    room: Room;

    @Column()
    userId: string;

    @Column()
    type: string;
}
