import UserRepository from "@/repository/userRepository";
import { IUser, IUserInputDTO } from "@/interface/IUser";

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
        const user = await this.userRepository.findUserByEmail(newUser.email);
        if(user){
            throw new ErrorEvent('이미 존재하는 이메일입니다.');
        }
        await this.userRepository.signUp(newUser);
    }

    /**
     * 로그인
     */
    public async login(newUser: IUserInputDTO){
        const user = await this.userRepository.findUserByEmail(newUser.email);
        if(!user){
            throw new ErrorEvent('존재하지 않는 계정입니다.');
        }
        if(user.password !== newUser.password){
            throw new ErrorEvent('비밀번호가 일치하지 않습니다.');
        }
        return user;
    }

    /**
     * 회원정보 수정
     */
    public async modifyUserInfo(modifyInfo : IUser){
        await this.userRepository.modifyUserInfo(modifyInfo);
    }
    
    /**
     * 회원정보 조회
     */
    public async getUserInfo(userId: number) : Promise<IUser>{
        const user = await this.userRepository.getUserInfo(userId);
        if(!user){
            throw new ErrorEvent('존재하지 않는 계정입니다.');
        }
        return user;
    }

    /**
     * 회원탈퇴
     */
    public async declareUser(userId: number){
        await this.userRepository.deleteUser(userId);
    }
    
}