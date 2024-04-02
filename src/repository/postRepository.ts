// repositories/userRepository.ts
import dotenv from 'dotenv';
import { User } from "../models/entity/user"
import { Post } from "../models/entity/post"
import { IUser, IUserInputDTO } from "@/interface/IUser";
import { IPost, IPostInputDTO, IPostUpdateDTO } from "@/interface/IPost";
import { myDataSource } from "@/models";


const env = dotenv.config();
if (env.error) {
  // This error should crash whole process
  throw new Error("env파일을 찾을 수 없습니다.");
}

export default class PostRepository{
    
    private postRepository = myDataSource.getRepository(Post);

    constructor(){
      this.postRepository = myDataSource.getRepository(Post);
    }

    /**
     * 게시글 작성
     */
    public async create(newPost : IPostInputDTO){
        const post = await this.postRepository.save(newPost);
        return post;
    }

    /**
     * 게시글 전체 조회
     */
    public async findAll(){
        const posts = await this.postRepository.find();
        return posts;
    }

    /**
     * 게시글 단일 조회
     */
    public async findOne(postId : number){
        const post = await this.postRepository.findOneBy({
            id : postId,
        });
        return post;
    }

    /**
     * 게시글 업데이트
     */
    public async update(updatePost : IPostUpdateDTO){
       // await this.postRepository.update(updatePost.id, updatePost);
    }

    /**
     * 게시글 삭제
     */
    public async delete(postId : number){
        await this.postRepository.delete(postId);
    }
}