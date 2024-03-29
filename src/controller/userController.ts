import UserService from "@/service/userService";
import { IUser, IUserInputDTO, IUserUpdateDTO } from "@/interface/IUser";
import { Response, Request } from 'express';
import logger from "@/loader/logger";

const userService = new UserService();

export default class userController{

    /**
     * 회원가입
     */
    async signUp(req: Request, res: Response){
        const userInputDTO : IUserInputDTO = req.body;
        if(!userInputDTO.email || !userInputDTO.password){
            return res.status(400).send('이메일 또는 비밀번호가 누락되었습니다.');
        }
        try{
            await userService.signUp(userInputDTO);
            logger.info('회원가입 성공');
            return res.status(201).json({ message: "회원가입이 성공하였습니다." });
        }catch(err: any){
            logger.error('회원가입 실패');  
            return res.status(err.statusCode || 500).json({ message: '회원가입에 실패하였습니다.' });
        }
    }

    /**
     * 로그인
     */
    async login(req : Request, res : Response){
        const userInputDTO : IUserInputDTO = req.body;

        if(!userInputDTO.email || !userInputDTO.password){
            return res.status(400).send('이메일 또는 비밀번호가 누락되었습니다.');
        }

        try{
            const user : IUser = await userService.login(userInputDTO);
            logger.info('로그인 성공');
            return res.status(200).json({message : '로그인 성공', user : user});
        }
        catch(err : any){
            logger.error('로그인 실패');
            return res.status(err.statusCode || 500).json({messagge : '로그인에 실패하였습니다.'});
        }
    }

    /**
     * 회원정보 조회
     */
    async getInfo(req : Request, res : Response){
        const userId: number = parseInt(req.params.userId, 10);
        if(!userId){
            logger.error('userId가 누락되었습니다.');
            return res.status(400).send('userId가 누락되었습니다.');
        }
        try{
            const user : IUser = await userService.getUserInfo(userId);
            return res.status(200).json({message : '회원정보 조회 성공', user : user});
        }
        catch(err : any){
            logger.error('회원정보 조회 실패');
            return res.status(err.statusCode || 500).json({message : '회원정보 조회 실패'});
        }
    }

    /**
     * 회원정보 수정
     
    async updateUser(req : Request, res : Response){
        const updateInfo : IUserUpdateDTO = req.body;

    }
    */

    /**
     * 회원탈퇴
     */
    async deleteUser(req : Request, res : Response){
        const userId : number = parseInt(req.params.userId, 10);
        if(!userId){
            logger.error('userId가 누락되었습니다.');
            return res.status(400).send('userId가 누락되었습니다.');
        }
        try{
            await userService.deleteUser(userId);
            return res.status(200).json({message : '회원탈퇴 성공'});
        }
        catch(err : any){
            logger.error('회원탈퇴 실패');
            return res.status(err.statusCode || 500).json({message : '회원탈퇴 실패'});
        }
    }

    async test(req : Request, res : Response){
        res.send('test');
    }
}