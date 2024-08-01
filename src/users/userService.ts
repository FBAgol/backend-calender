import {User} from './user'

interface params{
    firstname:string,
    lastname: string,
    email: string,
    password:string
}
export class UserService{
    public userLogin(params: params):User{
        return new User(params.firstname, params.lastname,params.email,params.password)
    }
}