import { Router, Request, Response } from 'express';
import express from 'express';

const router = express.Router();

export default (app: Router) => {
  app.use('/user', router);

  //router.post('/users', createUser);
};