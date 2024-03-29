import {Application, Request, Response} from 'express';
import express from 'express';
import config from '@/config'; // configuration 설정파일
import routes from '@/routes'; // 라우터 설정파일
import cors from 'cors';


export default ({ app }: { app: Application }) => {
  /**
   * 헬스체크 엔드포인드
   * @TODO Explain why they are here
   */

  
  app.get('/', (req: Request, res: Response) => {
    res.send('테스트');
  });

  //console.log(config.jwtSecret);
  app.use(express.json());
  app.use(routes());
  app.use(cors());

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  //app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  //app.use(require('method-override')());

  // Transforms the raw string of req.body into json
  //app.use(express.json());
  // Load API routes


  /// catch 404 and forward to error handler
  
  /**
  app.use((req, res, next) => {
      const err:any = new Error('Not Found');
      err.status = 404;
      next(err);
  });
 */
/**
  /// error handlers
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
       * Handle 401 thrown by express-jwt library
       
      if (err.name === 'UnauthorizedError') {
          return res
              .status(err.status)
              .send({ message: err.message })
              .end();
      }
      return next(err);
  });
  */
 /**
  * 
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
  */
};