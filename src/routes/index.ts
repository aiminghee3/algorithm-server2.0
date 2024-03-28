import { Router } from 'express';
import user from './user/userRoute';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	user(app);

	return app
}