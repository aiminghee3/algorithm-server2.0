import PostRepository from "@/repository/postRepository";
import UserRepository from "@/repository/userRepository";
import { IPostInputDTO, IPostUpdateDTO } from "@/interface/IPost";
import logger from "@/loader/logger";
import { IUser } from "@/interface/IUser";
import { relative } from "path";
import { Post } from "../models/entity/post";
import { User } from "../models/entity/user";
import { myDataSource } from "@/models";

export default class PostService{

    private postRepository = myDataSource.getRepository(Post);
    private userRepository = myDataSource.getRepository(User);

    /**
     * 게시글 작성
     */
    public async createPost(newPost : IPostInputDTO){
        const user = await this.userRepository.findOneBy({ // 1. User객체나 null을 반환할 수 있음
            id: newPost.userId
          });
        if(!user){
            logger.error('존재하지 않는 사용자입니다.');
            throw new Error('존재하지 않는 사용자입니다.');
        }
        else if(!newPost.userId || !newPost.title || !newPost.problem_number || !newPost.problem_link || !newPost.rate || !newPost.content){
            logger.error('입력하지 않은 항목이 있습니다.');
            throw new Error('입력하지 않은 항목이 있습니다.');   
        }
        newPost.user = user;
        try{
            await this.postRepository.save(newPost);
        }
        catch(err){
            logger.err('데이터베이스 오류');
            console.log(err);
        }
    }

    /**
     * 게시글 수정
     */
    public async updatePost(updatePost : IPostUpdateDTO){
        const post = await this.postRepository.findOne({
            where: { id: updatePost.id },
            relations: ['user']
        });
        const { userId, ...updatePostWithoutUserId } = updatePost;

        if(post?.user.id != updatePost.userId){
            logger.error('작성자만 수정할 수 있습니다.');
            throw new Error('작성자만 수정할 수 있습니다.');
        }
        else if(updatePost.title == post.title && updatePost.problem_number == post.problem_number && updatePost.problem_link == post.problem_link && 
            updatePost.rate == post.rate && updatePost.content == post.content){
            logger.error('수정할 정보가 없습니다.');
            throw new Error('수정할 정보가 없습니다.');   
        }
        try{
            await this.postRepository.update(updatePost.id, updatePostWithoutUserId);
        }
        catch(err){
            logger.err('데이터베이스 오류');
            console.log(err);
        }
    }

    /**
     * 게시글 전체조회
     */
    public async getAllPost(){
        try{
            const posts = await this.postRepository.find();
            return posts;
        }
        catch(err){
            logger.err('데이터베이스 오류');
            console.log(err);
        }
    }

    /**
     * 게시글 단일 조회
     */
    public async getPost(postId : number){
        try{
            const post = await this.postRepository.findOneBy({
                id : postId,
            });
            if(!post){
                logger.error('존재하지 않는 게시글입니다.');
                throw new Error('존재하지 않는 게시글입니다.');
            }
            return post;
        }
        catch(err)
        {
            logger.err('데이터베이스 오류');
            console.log(err);
        }
    }

    /**
     * 게시글 삭제
     */
    public async deletePost(postId : number, userId : number){
        const post = await this.postRepository.findOne({
            where: { id: postId },
            relations: ['user']
        });
        if(post?.user.id != userId){
            logger.error('작성자만 삭제할 수 있습니다.');
            throw new Error('작성자만 삭제할 수 있습니다.');
        }
        try{
            await this.postRepository.delete(postId);
        }
        catch(err){
            logger.err('데이터베이스 오류');
            console.log(err);
        }
    }
}