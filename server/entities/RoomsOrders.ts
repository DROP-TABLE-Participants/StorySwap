import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Room from "./Room";

@Entity()
export default class RoomsOrders {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Room, (room) => room.id, { persistence: false })
    @JoinColumn({name: "room"})
    room: Room;

    @Column("varchar", { array: true})
    order: string[];
}
