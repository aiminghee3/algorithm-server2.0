import PostRepository from "@/repository/postRepository";
import UserRepository from "@/repository/userRepository";
import { IPostInputDTO, IPostUpdateDTO } from "@/interface/IPost";
import logger from "@/loader/logger";
import { IUser } from "@/interface/IUser";

export default class PostService{
    private postRepository : PostRepository;
    private userRepository : UserRepository;

    constructor(){
        this.postRepository = new PostRepository();
        this.userRepository = new UserRepository();
    }

    /**
     * 게시글 작성
     */
    public async createPost(newPost : IPostInputDTO){
        const user = await this.userRepository.getUserInfo(newPost.userId);
        if(!user){
            logger.error('존재하지 않는 사용자입니다.');
            throw new Error('존재하지 않는 사용자입니다.');
        }
        else if(!newPost.userId || !newPost.title || !newPost.problem_number || !newPost.problem_link || !newPost.rate || !newPost.content){
            logger.error('입력하지 않은 항목이 있습니다.');
            throw new Error('입력하지 않은 항목이 있습니다.');   
        }
        newPost.user = user;
        await this.postRepository.create(newPost);
    }

    /**
     * 게시글 수정
     */
    public async updatePost(updatePost : IPostUpdateDTO){
        const post = await this.postRepository.findOne(updatePost.postId);
        if(post?.user.id != updatePost.userId){
            logger.error('작성자만 수정할 수 있습니다.');
            throw new Error('작성자만 수정할 수 있습니다.');
        }
        else if(updatePost.title == post.title && updatePost.problem_number == post.problem_number && updatePost.problem_link == post.problem_link && 
            updatePost.rate == post.rate && updatePost.content == post.content){
            logger.error('수정할 정보가 없습니다.');
            throw new Error('수정할 정보가 없습니다.');   
        }
        await this.postRepository.update(updatePost);
    }
    /**
     * 게시글 전체조회
     */
    public async getAllPost(){
        const posts = await this.postRepository.findAll();
        return posts;
    }

    /**
     * 게시글 단일 조회
     */
    public async getPost(postId : number){
        const post = await this.postRepository.findOne(postId);
        if(!post){
            logger.error('존재하지 않는 게시글입니다.');
            throw new Error('존재하지 않는 게시글입니다.');
        }
        return post;
    }
    /**
     * 게시글 삭제
     */
    public async deletePost(postId : number, userId : number){
        const post = await this.postRepository.findOne(postId);
        if(post?.user.id != userId){
            logger.error('작성자만 삭제할 수 있습니다.');
            throw new Error('작성자만 삭제할 수 있습니다.');
        }
        await this.postRepository.delete(postId);
    }
}