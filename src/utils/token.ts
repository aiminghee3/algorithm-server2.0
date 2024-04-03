import {Request, Response} from 'express';
import { IUser, IUserInputDTO } from "@/interface/IUser";
import jwt from 'jsonwebtoken';



//Access 토큰 발급하는 함수
export const generateAccessToken = (userId: number): string =>{
    return jwt.sign({ userId: userId }, process.env.JWT_SECRET!, { expiresIn: '30m', issuer : 'jojunhee' });
}

// Refresh 토큰을 발급하는 함수
export const generateRefreshToken = (userId: number): string =>{
    return jwt.sign({ userId: userId }, process.env.JWT_SECRET!, { expiresIn: '7d', issuer : 'jojunhee' });
}