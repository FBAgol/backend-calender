import {User} from './user'

const testDict :User= {
    firstname: "farzad", 
    lastname:"golzari",
    email:"farzad@gmail.com",
    password:"farzad18"
}

export class UserService{
    public userLogin():User{
        return testDict
    }
}