import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./user";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title : string;

    @Column()
    problem_number : number

    @Column()
    problem_link : string

    @Column()
    rate : number

    @Column({ type: 'text' })
    content : string

    @Column()
    alarm : Date

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public lastUpdatedAt: Date;

    @ManyToOne(() => User, user => user.posts)
    user : User;
}