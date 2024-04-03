import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/user"
import { Post } from "./entity/post"
import { Hashtag } from "./entity/hashtag"
import { PostHashtag } from "./entity/postHashtag";
import config from "@/config"

const TYPESORM_SYNC: boolean = config.sync === 'true'; // 데이터베이스 동기화

export const myDataSource = new DataSource({
  type: "mysql",
  host: config.host,
  port: Number(config.mysql_port),
  username: config.user,
  password: config.password,
  database: config.database,
  entities: [User,Post, Hashtag, PostHashtag,  "./entity/*.js", "./entity/*.ts"],
  logging: true,
  synchronize: TYPESORM_SYNC,
  migrations: ['src/models/migration/*.ts'],
  migrationsTableName: 'migrations',
})


