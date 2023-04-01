import "reflect-metadata"
import {Entity, JoinColumn, Column, ManyToOne, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import Room from "./Room";

@Entity()
export default class RoomsUsersStates {
    @ManyToOne(type => Room, (room) => room.id, { persistence: false })
    @JoinColumn({name: "room"})
    room: Room;

    @PrimaryColumn()
    userId: string;

    @PrimaryColumn()
    state: string;
}
