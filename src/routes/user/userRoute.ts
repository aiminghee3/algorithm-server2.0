import { Router, Request, Response } from 'express';
import UserController from '@/controller/userController';

const route = Router();
const userController = new UserController();

export default (app: Router) => {
  app.use('/user', route);


  //회원가입
  route.post('/signup', userController.signUp);

  //로그인
  route.post('/login', userController.login);

  //회원정보 조회
  route.get('/getinfo/:userId', userController.getInfo);

  //회원정보 수정
  //route.put('/modify', userController.updateUser);

  //회원탈퇴
  route.delete('/delete/:userId', userController.deleteUser);
  
  //테스트
  route.get('/test', userController.test);
};