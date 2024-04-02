import { Router } from 'express';
import user from './userRoute';
import token from './tokenRoute'
import post from './postRoute'


// guaranteed to get dependencies
export default () =>{
	const app = Router();
	user(app);
	post(app);
	token(app);

	return app
}
