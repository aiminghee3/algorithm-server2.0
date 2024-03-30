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
}