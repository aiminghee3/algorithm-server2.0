import { IUser } from '@/interface/IUser' // Import the IUser interface from the appropriate module
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

const env = dotenv.config();
const secretKey = process.env.JWT_SECRET; // Assign the JWT secret key to a variable
if (env.error) {
    // This error should crash whole process
    throw new Error("env파일을 찾을 수 없습니다.");
}

export const verifyAccessToken = (req : Request, res : Response, next : NextFunction) =>{
    try {
        const tokenFromHeader = req.headers.authorization;
        if (!tokenFromHeader) {
            return res.status(401).json({ message: '권한이 없습니다.' });
        }
        const token = tokenFromHeader.split(' ')[1];
        if (!secretKey) {
            throw new Error('JWT 시크릿 키가 정의되지 않았습니다.'); // Throw an error if the JWT secret key is undefined
        }
        jwt.verify(token, process.env.JWT_SECRET!); // Add 'as Record<string, any>' to cast the type
        return next();
    } catch (error : any) {
        if(error.name === 'TokenExpiredError'){ // 유효기간 초과
            return res.status(419).json({
                code : 419,
                message : '토큰이 만료되었습니다.'
            })
        }
    }
    return res.status(401).json({
        code : 401,
        message : '유효하지 않은 토큰입니다.'
    })
}