import {Request, Response} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from "@/loader/logger";
import dotenv from 'dotenv';
import {generateAccessToken} from '@/utils/token';

const env = dotenv.config();
const secretKey = process.env.JWT_SECRET; // Assign the JWT secret key to a variable
if (env.error) {
    // This error should crash whole process
    throw new Error("env파일을 찾을 수 없습니다.");
}


export default class tokenService{
    
    public async verifyAccessToken(token : any){
        try{
            if (!secretKey) {
                throw new Error('JWT 시크릿 키가 정의되지 않았습니다.'); // Throw an error if the JWT secret key is undefined
            }
            await jwt.verify(token, secretKey); // Add 'as Record<string, any>' to cast the type
            return;
        } catch (error : any) {
            if(error.name === 'TokenExpiredError'){ // 유효기간 초과
                throw new Error('토큰이 만료되었습니다.');
            }
        }
        throw new Error('유효하지 않은 토큰입니다.');
    }

    // 리프레시 토큰 확인 후 액세스 토큰 재발급
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