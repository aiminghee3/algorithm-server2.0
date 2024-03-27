import expressLoader from './express';
import express from 'express';
import Logger from './logger';

export default async (app : express.Application) => {
    Logger.info('데이터베이스가 연결되었습니다');

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