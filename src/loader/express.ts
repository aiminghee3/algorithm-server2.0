import {Application, Request, Response} from 'express';
import express from 'express';
import routes from '@/routes'; // 라우터 설정파일
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';


const env = dotenv.config();
if (env.error) {
  // This error should crash whole process
  throw new Error("env파일을 찾을 수 없습니다.");
}

// 특정 도메인에서의 요청만 허용
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // 인증 정보를 포함하려면 true로 설정
  Headers: ["Content-type", "Authorization"],
  optionsSuccessStatus: 204,
};

export default ({ app }: { app: Application }) => {

  //console.log(config.jwtSecret);
  app.use(cors(corsOptions)); // cors문제 해결
  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: true })); // URL-encoded 형식의 body 파싱 -> 프론트에서 form형식으로 제출되면 express.json으로 해석불가해서 사용
  app.use(cookieParser()) // 쿠키 확인
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