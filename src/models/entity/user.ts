import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Post } from "./post";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public lastUpdatedAt: Date;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];
}