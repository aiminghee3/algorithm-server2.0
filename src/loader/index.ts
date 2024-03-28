import expressLoader from './express';
import express from 'express';
import Logger from './logger';
import { AppDataSource } from '../models/data-source';

export default async (app : express.Application) => {

    // 데이터베이스 연결
    AppDataSource.initialize().then(() => Logger.info('데이터베이스가 연결되었습니다.')).catch((err) => {
        console.log("데이터베이스 연결에 실패하였습니다.");
    }); // 추가

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */
    /**
     * 
     
    const userModel = {
        name: 'userModel',
        // Notice the require syntax and the '.default'
        model: require('../models/user').default,
    };
    */

// It returns the agenda instance because it's needed  in the subsequent loaders

await expressLoader({ app });

Logger.info('✌️ Express loaded');
};