import dotenv from 'dotenv';
import path from 'path';

// Set the NODE_ENV to 'development' by default
const env = dotenv.config();

if (process.env.NODE_ENV === 'production') {  
  dotenv.config({ path: path.join(__dirname, '../../env/.env.production') });  
} else if (process.env.NODE_ENV === 'dev') {  
  dotenv.config({ path: path.join(__dirname, '../../env/.env.dev') });  
} else if (process.env.NODE_ENV === 'test') {  
  dotenv.config({ path: path.join(__dirname, '../../env/.env.test') });  
} else {  
  throw new Error('process.env.NODE_ENV IS_NOT_SET!!');  
}


export default {
  /**
   * mysql database
   */
  host : process.env.MYSQLDB_HOST,
  user : process.env.MYSQLDB_USER,
  password : process.env.MYSQLDB_ROOT_PASSWORD,
  database : process.env.MYSQLDB_DATABASE,
  mysql_port : process.env.MYSQLDB_PORT,

  /**
   * port
   */
  port : process.env.NODE_PORT,

  /**
   * jwt secret
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * typesorm
   */
  sync : process.env.SYNC,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
};