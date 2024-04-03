import PostService from "@/service/postService";
import { IPostInputDTO, IPostUpdateDTO } from "@/interface/IPost";
import { Response, Request } from 'express';
import logger from "@/loader/logger";

const postService = new PostService();

export default class postController{
    constructor(){

    }

    /**
     * 게시글 작성
     */
    public async createPost(req : Request, res : Response){
        const postInputDTO : IPostInputDTO = req.body;
        try{
            await postService.createPost(postInputDTO);
            logger.info('게시글 작성 성공');
            return res.status(201).json({ message: "게시글 작성이 성공하였습니다." });
        }catch(err: any){
            logger.error('게시글 작성 실패');  
            return res.status(err.statusCode || 500).json({ message: '게시글 작성에 실패하였습니다.' });
        }
    }

    /**
     * 게시글 업데이트
     */
    public async updatePost(req : Request, res : Response){
        const postId = parseInt(req.params.postId, 10);
        const userId = parseInt(req.params.userId, 10);
        const updatePost : IPostUpdateDTO = req.body;
        try{
            await postService.updatePost(updatePost, postId, userId);
            logger.info('게시글 수정 성공');
            return res.status(201).json({ message: "게시글 수정이 성공하였습니다." });
        }
        catch(err : any){
            res.status(err.statusCode || 500).send({message : '게시글 수정에 실패하였습니다.'});
        }
    }


    /**
     * 게시글 삭제
     */
    public async deletePost(req : Request, res : Response){
        const postId : number = parseInt(req.params.postId, 10);
        const userId : number = parseInt(req.params.userId, 10);
        try{
            await postService.deletePost(postId, userId);
            logger.info('게시글 삭제 성공');
            return res.status(200).json({ message : '게시글 삭제 성공'});
        }
        catch(err : any){
            logger.error('게시글 삭제 실패');
            return res.status(err.statusCode || 500).send({message : '게시글 삭제에 실패하였습니다.'});
        }
    }

    /**
     * 게시글 전체조회
     */
    public async getAllPost(req : Request, res : Response){
        try{
            const post = await postService.getAllPost();
            return res.status(200).json({message : '게시글 전체조회 성공', post});
        }
        catch(err : any){
            logger.error('게시글 전체조회 실패');
            res.status(err.statusCode || 500).send({message : '게시글 전체조회에 실패하였습니다.'});
        }
    }

    /**
     * 게시글 상세조회
     */
    public async getPost(req : Request, res : Response){
        const postId : number = parseInt(req.params.postId, 10);
        try{
            const post = await postService.getPost(postId);
            return res.status(200).json({message : '게시글 상세조회 성공', post});
        }
        catch(err : any){
            res.status(err.statusCode || 500).send({message : '게시글 조회에 실패하였습니다.'});
        }
    }

    /**
     * 테스트
     */
    public async getTest(req : Request, res : Response){
        const updatePost : IPostUpdateDTO = req.body;
        try{
            const post = await postService.test(updatePost);
            return res.status(200).json({message : '게시글 상세조회 성공', post});
        }
        catch(err : any){
            res.status(err.statusCode || 500).send({message : '게시글 조회에 실패하였습니다.'});
        }
    }
}