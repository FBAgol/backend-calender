import { db } from '../db/db_connection';
import bcrypt from 'bcrypt';


interface params{
    firstname:string,
    lastname: string,
    email: string,
    password:string
}
const saltRounds = 10;
export class UserService {
    public async userLogin(userParams: params): Promise<void> {
      return new Promise<void>(async (resolve, reject) => {
        try {
          // Passwort hashen
          const hashedPassword = await bcrypt.hash(userParams.password, 10);
  
          const query = 'INSERT INTO User(firstname, lastname, email, password) VALUES(?, ?, ?, ?)';
          db.query(query, [userParams.firstname, userParams.lastname, userParams.email, hashedPassword], (error:any, results:any) => {
            if (error) {
              if (error.code === 'ER_DUP_ENTRY') {
                // Falls ein Duplikatfehler auftritt, wird der Fehler hier abgefangen und mit spezifischen Daten weitergeleitet
                return reject({
                  code: 'ER_DUP_ENTRY',
                  message: 'Duplicate entry detected',
                  fields: { email: userParams.email }
                });
              }
              // Andere Fehler werden ebenfalls weitergeleitet
              return reject(error);
            }
            resolve();
          });
        } catch (hashError) {
          // Fehler beim Hashen des Passworts abfangen
          return reject(hashError);
        }
      });
    }
  }



interface UsersResponseModel {
    firstname: string;
    lastname: string;
    email: string;
    password:string;
  }



export class getAllUsers {
    public async getUsers(): Promise<UsersResponseModel[]> {
        const query = `
        SELECT * FROM User`;
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

interface UserResponseModel {
  email: string;
  password:string;
}


export class userAuthentication {
  public async getUser(user:UserResponseModel): Promise<Boolean> {
      const query = `
      SELECT email, password FROM User WHERE email=?`;
      return new Promise((resolve, reject) => {
          db.query(query,[user.email],async (err: any, results:any) => {
              if (err) {
                  console.log('Database query Error: ', err);
                  reject(err);
              } else {
                if (results.length > 0) {
                  const hashedPassword = results[0].password;
                  const isMatch = await bcrypt.compare(user.password, hashedPassword);
                  resolve(isMatch);
              } else {
                  resolve(false); 
              }
                
                  
              }
          });
      });  
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

