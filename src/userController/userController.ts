import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Response,
    Res,
    TsoaResponse,
    Route,
    SuccessResponse,
    Tags,
    Security,
    Request,
    Put,
  } from "tsoa";
  
  
  import {UserService, getUsers} from '../userService/userService'
  import { createToken } from "../createJWT";
  import { User } from "../db/userTable";
import { JwtPayload } from "jsonwebtoken";

interface params{
  firstname:string,
  lastname:string,
  email:string,
  password:string
}

  @Route("/user")
   export class UserController extends Controller {
    @SuccessResponse("201", "Created") 
    @Tags("Post-User")
    @Post("/register")
    public async createUser(
      @Body() userParams: params,
    ): Promise<void | string> {

      try {
      
        await new UserService().userRegister(userParams);
        return createToken(userParams.email, "user")   
        
    } catch (error:any) {
        // console.log("Database query Error",error)
         throw error
    }
    }
  }

  @Route("secure")
export class SecureController extends Controller {
    @Tags("Get-User")
    @Get("getUsers")
    public async userInfo(): Promise<User[]> {
      try{
        console.log("Attempting to fetch all users...");
        const users = await new getUsers().getAllUsers();
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

interface checkUserExists{
  token:string | undefined,
  isUser:Boolean
}
@Route("/user")
export class getUser extends Controller { 
    @Tags("User")
    @Post("/login")
    public async userLogin( @Body() user:UserResponseModel): Promise<checkUserExists| string |void> {
      try{
        const userExists = await new UserService().userLogIn(user)
        if(userExists){
          const result={token:createToken(user.email, "user"), isUser:userExists}
          return result
        }
        return "user not found"
    }
    catch(error:any){
      console.log(error)
    }
    }
}


@Route("/user")
export class getUserByToken extends Controller { 
    @Tags("User")
    @Get("/token")
   
    public async userToken( @Query() token:string): Promise<any> {
      try{
       const result=  await new UserService().getUserByToken(token)
       return result
    }
    catch(error:any){
      console.log(error)
    }
    }
}


interface userUpdateResponse{
  newFirstname?:string,
  newLastname?: string,
  oldEmail:string,
  newEmail?: string, 
  newPassword?:string

}



@Route("/user")
export class userUpdate extends Controller { 
    @Tags("User")
    @Put("/update")
    public async updateUserData( @Body()updateData:userUpdateResponse): Promise<string> {
      try{
       const result=  await new UserService().userUpdate(updateData)
       return result
    }catch (error: any) {
      throw error
    } 
  }
}