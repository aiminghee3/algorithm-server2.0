import expressLoader from './express';
import { databaseLoader } from '../models/index';
import express from 'express';
import Logger from './logger';
import config from '@/config';

export default async (app : express.Application) => {

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
await databaseLoader();
await expressLoader({ app });
console.log('연결됨')

Logger.info('Express loaded');
};