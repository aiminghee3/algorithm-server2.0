import { Entity,PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";
import { postHashtag } from "./postHashtag";


@Entity()
export class Hashtag{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    tag : string;

    @OneToMany(() => postHashtag, postHashtag => postHashtag.hashtag)
    postHashtags : postHashtag[];
}