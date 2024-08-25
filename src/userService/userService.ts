
import bcrypt from 'bcrypt';
import { User } from '../db/userTable';
import db from '../db/db-connection'
import { createToken } from '../createJWT';
import { Repository } from 'typeorm';

interface params{
    firstname:string,
    lastname: string,
    email: string,
    password:string
}
const saltRounds = 10;
export class UserService {
    public async userLogin(userParams: params): Promise<string | undefined> {
      const hashedPassword = await bcrypt.hash(userParams.password, saltRounds);
      const user = new User()
      user.firstname=userParams.firstname
      user.lastname=userParams.lastname
      user.email=userParams.email
      user.password=hashedPassword

      await db.manager.save(user)
      return createToken(userParams.email, "user")
    }
  }




export class getUsers {
    public async getAllUsers(): Promise<User[]> {
      try{
        const userRepository= db.getRepository(User)
        const users = await userRepository.find()
       //const users=await db.manager.find(User)
        console.log("Users fetched successfully");
        return users

      }catch(error:any){
        console.log(error)
        throw new Error("Error in getting all users:", error);
      }
        
    }
}

interface UserResponseModel {
  email: string;
  password:string;
}


export class userAuthentication {
  public async getUser(user:UserResponseModel): Promise<Boolean> {

    try{
      const userRepository= db.getRepository(User)
      const userExists = await userRepository.findOneBy({email:user.email})
      //console.log(userExists)
      if(userExists){
        const isMatch = await bcrypt.compare(user.password, userExists.password);
        return isMatch
      }
      return false
    }
    catch(error:any){
      console.log(error)
      throw new Error("Error in getting user:", error);
    }
  }
}


/*
interface UserUpdateModel{
    email:string
    oldPassword:string
    newPassword:string
}

export class UpdateUser {
    public async updateUser(userUpdate:User): Promise<void | string> {
        const query = `
        UPDATE User
        SET password = ?
        WHERE email = ?, password = ?;`;
        return new Promise((resolve, reject) => {
            db.query(query, (err: any, results:any) => {
                if (err) {
                    console.log('Database query Error: ', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });  
    }
}


*/