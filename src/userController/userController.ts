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
  
  import {UserService, getAllUsers,userAuthentication} from '../userService/userService'
  import { createToken } from "../createJWT";

interface params{
  firstname:string,
  lastname:string,
  email:string,
  password:string
}

  @Route("user")
  export class UsersController extends Controller {
    @SuccessResponse("201", "Created") 
    @Tags("Post-User")
    @Post("/")
    public async createUser(
      @Body() userParams: params,
    ): Promise<void | string> {

      try {
        await new UserService().userLogin(userParams);
        return createToken(userParams.email, "user")
    } catch (error) {
         console.log(error)
         throw error;
    }
    }
  }

  interface UsersResponseModel {
    firstname: string;
    lastname: string;
    email: string;
    password:string;
  }


  @Route("secure")
export class SecureController extends Controller {
    @Security("jwt", ["user"])
    @Tags("Get-User")
    @Get("getAllUsers")
    public async userInfo(): Promise<UsersResponseModel[]> {
      const users= await new getAllUsers().getUsers()
        return users ;
    }
}

interface UserResponseModel {
  email: string;
  password:string;
}
@Route("/user")
export class getUser extends Controller { 
    @Tags("User")
    @Post("login")
    public async userLogin( @Body() user:UserResponseModel): Promise<Boolean> {
      const res= await new userAuthentication().getUser(user)
        return res ;
    }
}