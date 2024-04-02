import {Request, Response} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from "@/loader/logger";
import dotenv from 'dotenv';
import {generateAccessToken} from '@/utils/token';

const env = dotenv.config();

if (env.error) {
    // This error should crash whole process
    throw new Error("env파일을 찾을 수 없습니다.");
}


export default class tokenService{
    
    public verifyRefreshToken(token : string){
        try{
            //refreshToken을 통해 accesstoken발급
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            return generateAccessToken(decodedToken.userId);
        }
        catch(err : any){
            logger.error('Access토큰 재발급에 실패하였습니다.');
            throw new Error('Access토큰 재발급에 실패하였습니다.');
        }
    }
}