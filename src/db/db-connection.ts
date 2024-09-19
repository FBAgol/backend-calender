import "reflect-metadata"
import { DataSource } from "typeorm"
import {User} from './userTable'
import { ToDo } from "./todoTable"

const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "farzad",
    password: "mysql",
    database: "calender",
    entities: [ User, ToDo],
    synchronize: true,
    logging:false,
})

export default db