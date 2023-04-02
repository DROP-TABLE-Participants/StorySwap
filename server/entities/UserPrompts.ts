import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Room from "./Room";
import User from "./User";

@Entity()
export default class UserPrompts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    prompt: string;

    @Column()
    url: string;

    @ManyToOne(type => Room, (room) => room.id, { persistence: false })
    @JoinColumn({name: "room"})
    room: Room;

    @Column()
    order: number;

    @ManyToOne(type => User, (user) => user.id, { persistence: false })
    @JoinColumn({name: "user"})
    user: User;
}
