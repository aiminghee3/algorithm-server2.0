// repositories/userRepository.ts
import { DataSource, DataSourceOptions } from "typeorm"
import dotenv from 'dotenv';
import { User } from "../models/entity/user"

const env = dotenv.config();
if (env.error) {
  // This error should crash whole process
  throw new Error("env파일을 찾을 수 없습니다.");
}

const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: process.env.HOST,
  port: 3306,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [User, "./models/entity/*.js", "./models/entity/*.ts"],
  logging: true,
  synchronize: true,
};

const datasource = new DataSource(dataSourceOptions);

const userRepository = datasource.getRepository(User)

export default class UserRepository {
  // Custom repository methods can be defined here if needed
  getUser(){
    const user = userRepository.findOne({ where: { id: 1 } }).then(user => {
      console.log(user)
      return user;
    })
  }
}