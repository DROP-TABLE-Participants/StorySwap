import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    username: string;

    @Column()
    profileImage: string;
}
