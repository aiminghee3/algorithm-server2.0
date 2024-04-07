import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";
import { PostHashtag } from "./postHashtag";


@Entity()
export class Hashtag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tag: string;

    @OneToMany(() => PostHashtag, postHashtag => postHashtag.hashtag)
    postHashtags: PostHashtag[];
}