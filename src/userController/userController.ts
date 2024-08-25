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
  } from "tsoa";
  
  
  import {UserService, getUsers, userAuthentication} from '../userService/userService'
  import { createToken } from "../createJWT";
  import { User } from "../db/userTable";

interface params{
  firstname:string,
  lastname:string,
  email:string,
  password:string
}

  @Route("user")
   export class UserController extends Controller {
    @SuccessResponse("201", "Created") 
    @Tags("Post-User")
    @Post("/")
    public async createUser(
      @Body() userParams: params,
    ): Promise<void | string> {

      try {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.(com|de|org|net|[a-zA-Z]{2,})$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/\\|-]).{8,}$/;

        if(!emailRegex.test(userParams.email) || !passwordRegex.test(userParams.password)){
          return "Invalid email or password"
        }else{
          await new UserService().userLogin(userParams);
          return createToken(userParams.email, "user")
        }
        
    } catch (error) {
         console.log(error)
         throw error;
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
    @Post("login")
    public async userLogin( @Body() user:UserResponseModel): Promise<checkUserExists| string> {
      try{
        const userExists = await new userAuthentication().getUser(user)
        if(userExists){
          const result={token:createToken(user.email, "user"), isUser:userExists}
          return result
        }
        return "user not found"
    }
    catch(error:any){
      console.log(error)
      throw new Error("Error in getting user:", error);
    }
    }
}