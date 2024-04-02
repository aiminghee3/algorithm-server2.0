import { Request, Response } from 'express';
import TokenService from '@/service/tokenService';
import jwt from 'jsonwebtoken';
import logger from '@/loader/logger';

const tokenService = new TokenService();

export default class TokenController {


    // Access 토큰이 유효한지 확인
    public async verifyAccess(req: Request, res: Response) {
        try{
            const accessToken = req.headers['authorization'];
            if(!accessToken){
                return res.status(401).json({ message : '토큰이 없습니다.'});
            }
            // 유효함
            const token = accessToken.split(' ')[1]
            console.log(token);
            //await jwt.verify(token, process.env.JWT_SECRET!); // Add 'as Record<string, any>' to cast the type
            await tokenService.verifyAccessToken(token);
            return res.status(200).json({ message : 'Access 토큰검증에 성공하였습니다.'});
        }
        catch(err : any){
            logger.error(err)
            logger.error('Access 토큰검증에 실패하였습니다.')
            return res.status(500).json({ message : 'Access 토큰이 유효하지 않습니다.'});
        }
    }
    // Refresh 토큰이 유효하면 Access토큰 재발급
    public async verifyRefresh(req: Request, res: Response) {
        try{
            const refreshToken = req.headers['authorization'];
            if(!refreshToken){
                return res.status(401).json({ message : '토큰이 없습니다.'});
            }
            const accessToken = await tokenService.verifyRefreshToken(refreshToken.split(' ')[1]);
            const encodedToken = encodeURIComponent(accessToken);
            res.cookie("accessToken" , encodedToken);
            console.log(encodedToken)
            return res.status(200).json({ message : 'Refresh토큰을 통해 Access토큰을 발급하였습니다.'});;
        }
        catch(err : any){
            return res.status(500).json({ message : 'Refresh 토큰이 유효하지 않습니다.'});
        }
    }
}