import { Router } from 'express';
import user from './userRoute';
import token from './tokenRoute'


// guaranteed to get dependencies
export default () =>{
	const app = Router();
	user(app);
	token(app);

	return app
}
