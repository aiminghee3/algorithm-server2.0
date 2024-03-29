import { myDataSource } from "./data-source"
import { User } from "./entity/user"
import Logger from '../loader/logger';

// 데이터베이스 커넥션 초기화 
export const databaseLoader = () => {
    myDataSource
        .initialize()
        .then(() => Logger.info('데이터베이스가 연결되었습니다.'))
        .catch((err) => {
            console.error("Error during Data Source initialization:", err)
    })
}

export { myDataSource };

