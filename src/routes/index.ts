import { Router } from 'express';
import user from './userRoute';


// guaranteed to get dependencies
export default () =>{
	const app = Router();
	user(app);

	return app
}
