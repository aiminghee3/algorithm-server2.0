import { Router, Request, Response } from 'express';
import typeokenController from '../controller/tokenController';


const route = Router();
const tokenController = new typeokenController();

export default (app : Router) =>{
    app.use('/token', route);

    //access토큰 검증
    route.post('/access', tokenController.verifyAccess);

    //Refresh토큰 검증
    route.post('/refresh', tokenController.verifyRefresh);
}