import {User} from '../users/user'
import { db } from '../db/db_connection';
import bcrypt from 'bcrypt';
interface params{
    firstname:string,
    lastname: string,
    email: string,
    password:string
}
const saltRounds = 10;
export class UserService{
    public async userLogin(userParams:params):Promise<void>{
        const hashedPassword = await bcrypt.hash(userParams.password, saltRounds);
        const query= `
        INSERT INTO User(firstname, lastname, email, password) VALUES(?,?,?,?)`
        try{
            await db.query(query,[userParams.firstname, userParams.lastname, userParams.email, hashedPassword])

        }catch(err){
            console.log('Database query Error: ',err)

        }  
    }
}