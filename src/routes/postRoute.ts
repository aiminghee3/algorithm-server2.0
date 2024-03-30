import { Router, Request, Response } from 'express';
import PostController from '@/controller/postController';
import { verifyAccessToken } from "../config/middlewares/auth";

const route = Router();
const postController = new PostController();

export default (app: Router) => {
  app.use('/post', route);


  //게시글 작성
  route.post('/create', postController.createPost);
};