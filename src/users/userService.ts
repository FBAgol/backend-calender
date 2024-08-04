import {User} from './user'

interface params{
    firstname:string,
    lastname: string,
    email: string,
    password:string
}
export class UserService{
    public userLogin(userParams:params):User{
        return new User(userParams.firstname, userParams.lastname, userParams.email,userParams.password)
    }
}