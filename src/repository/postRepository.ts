// repositories/userRepository.ts
import dotenv from 'dotenv';
import { User } from "../models/entity/user"
import { IUser, IUserInputDTO } from "@/interface/IUser";
import { myDataSource } from "@/models";


const env = dotenv.config();
if (env.error) {
  // This error should crash whole process
  throw new Error("env파일을 찾을 수 없습니다.");
}

export default class PostRepository{
    
}