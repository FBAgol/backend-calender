import "reflect-metadata"
import { DataSource } from "typeorm"
import {User} from './userTable'

const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "farzad",
    password: "mysql",
    database: "calender",
    entities: [User],
    synchronize: true,
    logging: false,
})

export default db