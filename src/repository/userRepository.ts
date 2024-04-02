// repositories/userRepository.ts
import { User } from "../models/entity/user"
import { IUser, IUserInputDTO } from "@/interface/IUser";
import { myDataSource } from "@/models";

export default class UserRepository {

  private userRepository = myDataSource.getRepository(User);

  constructor(){
    this.userRepository = myDataSource.getRepository(User);
  }

  /**
   * 회원가입
   */
  public async signUp(newUser: IUserInputDTO) : Promise<IUser>{
    const user = await this.userRepository.save(newUser);
    return user;
  }

  /**
   * 회원정보 수정
   */
  public async update(modifyInfo: IUser){
    await this.userRepository.update(modifyInfo.id, modifyInfo);
  }

  /**
   * 회원탈퇴
   */
  public async delete(userId: number){
    await this.userRepository.delete(userId);
  }

  /**
   * 회원정보 조회
   */
  public async getUserInfo(userId: number){ // 2 .Promise는 null을 반환할 수 없음
    const user = await this.userRepository.findOneBy({ // 1. User객체나 null을 반환할 수 있음
      id: userId
    });
    return user; // 3. 따라서 User | null타입을 IUser로 변환하여 항상 객체를 받을 수 있도록 보장함
  }

  /**
   * 이메일로 회원 조회
   */
  public async findUserByEmail(email: string){
    const user = await this.userRepository.findOneBy({
      email : email
    })
    return user;
  }
  /**
   * 
  async getUserInfo(userId: number) : Promise<IUser>{ // 2 .Promise는 null을 반환할 수 없음
    const user = await userRepository.findOneBy({ // 1. User객체나 null을 반환할 수 있음
      id: userId
    });
    return user as IUser; // 3. 따라서 User | null타입을 IUser로 변환하여 항상 객체를 받을 수 있도록 보장함
  }
  */
}