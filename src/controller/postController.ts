import PostService from "@/service/postService";
import { IUser, IUserInputDTO, IUserUpdateDTO } from "@/interface/IUser";
import { IPost, IPostInputDTO, IPostUpdateDTO } from "@/interface/IPost";
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
     * 게시글 수정
     */


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

    /**
     * 게시글 단일 조회
     */

    /**
     * 게시글 업데이트
     */
}