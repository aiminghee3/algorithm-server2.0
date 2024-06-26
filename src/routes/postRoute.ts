import { Router, Request, Response } from 'express';
import PostController from '@/controller/postController';
import { verifyAccessToken } from "../config/middlewares/auth";

const route = Router();
const postController = new PostController();

export default (app: Router) => {
  app.use('/post', route);


  //게시글 작성
  //verifyAccessToken 미들웨어 써야함
  route.post('/create', verifyAccessToken, postController.createPost);

  //게시글 삭제
  //verifyAccessToken 미들웨어 써야함
  route.delete('/delete/:postId/:userId', verifyAccessToken, postController.deletePost);

  //게시글 수정
  //verifyAccessToken 미들웨어 써야함
  route.put('/update/:postId/:userId', verifyAccessToken, postController.updatePost);

  //게시글 전체조회
  route.get('/getAll', postController.getAllPost);

  //게시글 상세조회
  route.get('/:postId', postController.getPost);

  //테스트
  route.post('/test', postController.getTest);
};