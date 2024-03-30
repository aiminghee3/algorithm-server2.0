import { Request, Response } from 'express';
import TokenService from '@/service/tokenService';
import jwt from 'jsonwebtoken';

const tokenService = new TokenService();

export default class TokenController {

    // Refresh 토큰이 유효하면 Access토큰 재발급
    public verifyRefresh(req: Request, res: Response) {
        try{
            const refreshToken = req.headers.authorization;
            if(!refreshToken){
                return res.status(401).json({ message : '토큰이 없습니다.'});
            }
            const accessToken = tokenService.verifyRefreshToken(refreshToken.split(' ')[1]);
            res.cookie('accessToken', accessToken);
            return res.status(200);
        }
        catch(err : any){
            return res.status(500).json({ message : 'Refresh 토큰이 유효하지 않습니다.'});
        }
    }
}