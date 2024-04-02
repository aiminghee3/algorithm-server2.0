import {Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { Post } from "./post";
import { Hashtag } from "./hashtag";

@Entity()
export class PostHashtag{
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(() => Post, post => post.postHashtags)
    @JoinColumn({name : 'postId'})
    post : Post;

    @ManyToOne(() => Hashtag, hashtag => hashtag.postHashtags)
    @JoinColumn({name : 'hashtagId'})
    hashtag : Hashtag;
}