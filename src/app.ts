import express from 'express';
import Logger from './loader/logger';
import config from './config';
import 'module-alias/register';
import "reflect-metadata"
import 'tsconfig-paths/register';

async function startServer() {
  const app = express();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/


  await require('./loader').default(app);

  app.listen(config.port, () => {
    Logger.info(`
      ------------------------------
      *   ${config.port} 번 포트에서 대기중  *
      ------------------------------
    `);
  }).on('error', err => {
    Logger.error(err);
    process.exit(1);
  });

}

startServer();