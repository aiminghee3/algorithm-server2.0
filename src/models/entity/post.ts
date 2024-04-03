import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
import { User } from "./user";
import { PostHashtag } from "./postHashtag";

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

    @Column(({ type: 'timestamp', nullable: true }))
    alarm : Date

    @CreateDateColumn(({ type: 'timestamp'}))
    public createdAt: Date;

    @UpdateDateColumn(({ type: 'timestamp'}))
    public lastUpdatedAt: Date;


    @ManyToOne(() => User, user => user.posts)
    user : User;

    
    @OneToMany(() => PostHashtag, postHashtag => postHashtag.post, { cascade: true, onDelete: 'CASCADE' })
    postHashtags: PostHashtag[];
}