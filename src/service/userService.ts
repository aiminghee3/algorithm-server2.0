import UserRepository from "@/repository/userRepository";
import { IUser, IUserInputDTO } from "@/interface/IUser";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";
import jwt from 'jsonwebtoken';
import logger from "@/loader/logger";
import dotenv from 'dotenv';

const env = dotenv.config();

if (env.error) {
    // This error should crash whole process
    throw new Error("env파일을 찾을 수 없습니다.");
}

export default class userService{
    private userRepository : UserRepository;

    constructor(){
        // constructor implementation
        this.userRepository = new UserRepository();
    }

    /**
     * 회원가입
     */
    public async signUp(newUser: IUserInputDTO){
        // 비밀번호 특수문자 검증
        const pwValidation = new RegExp(
            `^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})`
        );
        if(!pwValidation.test(newUser.password)) {
            logger.error(`비밀번호는 영문, 숫자, 특수문자를 포함한 8~20자로 입력해주세요.`);
            throw new Error(`비밀번호는 영문, 숫자, 특수문자를 포함한 8~20자로 입력해주세요.`);
        }

        const user = await this.userRepository.findUserByEmail(newUser.email);
        if(user){
            logger.error('이미 존재하는 이메일입니다.');
            throw new Error('이미 존재하는 이메일입니다.');
        }
        await this.userRepository.signUp(newUser);
    }

    /**
     * 로그인
     */
    public async login(newUser: IUserInputDTO){

        const user = await this.userRepository.findUserByEmail(newUser.email);
        if(!user){
            logger.error('존재하지 않는 계정입니다.');
            throw new ErrorEvent('존재하지 않는 계정입니다.');
        }
        if(user.password !== newUser.password){
            logger.error('비밀번호가 일치하지 않습니다.');
            throw new ErrorEvent('비밀번호가 일치하지 않습니다.');
        }
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        return {accessToken, refreshToken, user};
    }

    /**
     * 회원정보 수정
     */
    public async updateUserInfo(modifyInfo : IUser){
        const user = await this.userRepository.getUserInfo(modifyInfo.id);
        if(!user){
            logger.error('존재하지 않는 계정입니다.');
            throw new Error('존재하지 않는 계정입니다.');
        }
        else if(user === modifyInfo){
            logger.error('수정할 정보가 없습니다.');
            throw new Error("수정할 정보가 없습니다.")
        }
        await this.userRepository.update(modifyInfo);
    }
    
    /**
     * 회원정보 조회
     */
    public async getUserInfo(userId: number) : Promise<IUser>{
        const user = await this.userRepository.getUserInfo(userId);
        if(!user){
            logger.error('존재하지 않는 계정입니다.');
            throw new ErrorEvent('존재하지 않는 계정입니다.');
        }
        return user as IUser;
    }

    /**
     * 회원탈퇴
     */
    public async deleteUser(userId: number){
        const user = await this.userRepository.getUserInfo(userId);
        if(!user){
            logger.error('존재하지 않는 계정입니다.');
            throw new ErrorEvent('존재하지 않는 계정입니다.');
        }
        await this.userRepository.delete(userId);
    }
    
}