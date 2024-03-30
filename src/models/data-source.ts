import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from 'dotenv';
import { User } from "./entity/user"
import { Post } from "./entity/post"

const env = dotenv.config();
if (env.error) {
  // This error should crash whole process
  throw new Error("env파일을 찾을 수 없습니다.");
}

export const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: 3306,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [User,Post,  "./entity/*.js", "./entity/*.ts"],
    logging: true,
    synchronize: true,
})