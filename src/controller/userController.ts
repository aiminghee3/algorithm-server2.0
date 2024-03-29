import UserService from "@/service/userService";
import { IUser, IUserInputDTO } from "@/interface/IUser";
import { Response, Request } from 'express';

const userService = new UserService();

export default class userController{
    private userService : UserService;

    constructor(){
        // constructor implementation
        this.userService = new UserService();
    }


    async signUp(req: Request, res: Response){
        const userInputDTO : IUserInputDTO = req.body;
        console.log(userInputDTO.email);
        console.log('-------------');
        if(!userInputDTO.email || !userInputDTO.password){
            res.status(400).send('이메일과 비밀번호를 입력해주세요.');
        }
        await userService.signUp(userInputDTO);
        res.status(201).json({ message: "회원가입이 성공하였습니다." });
    }

    async test(req : Request, res : Response){
        res.send('test');
    }
}