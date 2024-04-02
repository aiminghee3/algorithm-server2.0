import PostRepository from "@/repository/postRepository";
import UserRepository from "@/repository/userRepository";
import { IPostInputDTO, IPostUpdateDTO } from "@/interface/IPost";
import logger from "@/loader/logger";
import { IUser } from "@/interface/IUser";
import { relative } from "path";
import { Post } from "../models/entity/post";
import { User } from "../models/entity/user";
import { myDataSource } from "@/models";
import { Hashtag } from "@/models/entity/hashtag";
import { PostHashtag } from "@/models/entity/postHashtag";

export default class PostService{

    private postRepository = myDataSource.getRepository(Post);
    private userRepository = myDataSource.getRepository(User);
    private hashtagRepository = myDataSource.getRepository(Hashtag);
    private postHashtagRepository = myDataSource.getRepository(PostHashtag);

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
            // 해시태그 저장
            const hashtags = await Promise.all(newPost.hashtags.map(async (tag) => {
                // 이미 있는 해시태그인지 확인
                let existingHashtag = await this.hashtagRepository.findOne({ where: { tag: tag.toString() } });

                // 이미 있는 해시태그가 없는 경우에만 새로운 해시태그를 생성하여 저장
                if (!existingHashtag) {
                    const hashtag = new Hashtag();
                    hashtag.tag = tag.toString();
                    existingHashtag = await this.hashtagRepository.save(hashtag);
                }

                return existingHashtag;
            }));

            // 게시글 저장
            const post = await this.postRepository.save(newPost);

            //중간 테이블 저장
            await Promise.all(hashtags.map(async (tag) => {
                const postHashtag = new PostHashtag();
                postHashtag.post = post;
                postHashtag.hashtag = tag;
                await this.postHashtagRepository.save(postHashtag);
            }))
        }
        catch(err){
            logger.err('데이터베이스 오류');
            throw new Error('데이터베이스 오류');
        }

    }

    /**
     * 게시글 수정
     */
    
    public async updatePost(updatePost : IPostUpdateDTO){
    
        const post = await this.postRepository.findOne({
            where: { id: updatePost.id },
            relations: ["postHashtags.hashtag", "user"]
        });
        
        const postHashtags = post?.postHashtags.map(postHashtag => postHashtag.hashtag.tag);
        const isSame = JSON.stringify(updatePost.hashtags.sort()) === JSON.stringify(postHashtags?.sort());
        
        if (post?.user.id != updatePost.userId) {
            logger.error('작성자만 수정할 수 있습니다.');
            throw new Error('작성자만 수정할 수 있습니다.');
        } else if (updatePost.title == post.title && updatePost.problem_number == post.problem_number && updatePost.problem_link == post.problem_link &&
            updatePost.rate == post.rate && updatePost.content == post.content && isSame) {
            logger.error('수정할 정보가 없습니다.');
            throw new Error('수정할 정보가 없습니다.');
        }

        try{
            // 해시태그를 찾거나 생성합니다.
            const hashtags : any = await Promise.all(updatePost.hashtags.map(async (tag) => {
                let hashtag = await this.hashtagRepository.findOne({ where: { tag : tag } });
                if (!hashtag) {
                    hashtag = this.hashtagRepository.create({ tag }); // 인스턴스 생성
                    await this.hashtagRepository.save(hashtag); // 저장
                }
                return hashtag;
        }));
        
        const updatedPost = await this.postRepository.save(updatePost);
        // 기존의 PostHashtag를 삭제합니다.
        await this.postHashtagRepository.remove(post.postHashtags);

        await this.postHashtagRepository.save(hashtags.map((hashtag : any) => {
            const postHashtag = new PostHashtag();
            postHashtag.post = updatedPost;
            postHashtag.hashtag = hashtag;
            return postHashtag;
        }));
        
        }
        catch(err){
            logger.err('데이터베이스 오류');
            throw new Error('데이터베이스 오류');
        }
    }
    

    /**
     * 게시글 전체조회
     */
    public async getAllPost(){
        try{
            const posts = await this.postRepository.find({
                relations: ['user', 'postHashtags.hashtag']
            });
            return posts;
        }
        catch(err){
            logger.err('데이터베이스 오류');
            throw new Error('데이터베이스 오류');
        }
    }

    /**
     * 게시글 단일 조회
     */
    public async getPost(postId : number){
        try{
            /**
            const post = await this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.postHashtags', 'postHashtags') // postHashtags와 JOIN
            .leftJoinAndSelect('postHashtags.hashtag', 'hashtag')  // 해시태그 정보 join
            .where('post.id = :id', { id: postId })
            .getOne();
             */
            const post = await this.postRepository.findOne({
                where: { id: postId },
                relations: ['postHashtags.hashtag']
            })

            if(!post){
                logger.error('존재하지 않는 게시글입니다.');
                throw new Error('존재하지 않는 게시글입니다.');
            }
            return post;
        }
        catch(err)
        {
            logger.error('데이터베이스 오류');
            throw new Error('데이터베이스 오류');
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
            throw new Error('데이터베이스 오류');
        }
    }

    public async test(updatePost : IPostUpdateDTO){

        const post = await this.postRepository.findOne({
            where: { id: updatePost.id },
            relations: ["postHashtags", "postHashtags.hashtag"]
        });
        console.log(post);
        if(!post){
            return ('존재하지 않는 게시글입니다.');
        }
        try{
            // 해시태그를 찾거나 생성합니다.
            const hashtags : any = await Promise.all(updatePost.hashtags.map(async (tag) => {
                let hashtag = await this.hashtagRepository.findOne({ where: { tag : tag } });
                if (!hashtag) {
                    hashtag = this.hashtagRepository.create({ tag }); // 인스턴스 생성
                    await this.hashtagRepository.save(hashtag); // 저장
                }
                return hashtag;
        }));
        
        const updatedPost = await this.postRepository.save(updatePost);
        // 기존의 PostHashtag를 삭제합니다.
        await this.postHashtagRepository.remove(post.postHashtags);

        await this.postHashtagRepository.save(hashtags.map((hashtag : any) => {
            const postHashtag = new PostHashtag();
            postHashtag.post = updatedPost;
            postHashtag.hashtag = hashtag;
            return postHashtag;
        }));
        
        }
        catch(err){
            logger.err('데이터베이스 오류');
            throw new Error('데이터베이스 오류');
        }
    }
}