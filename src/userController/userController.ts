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
  } from "tsoa";
  
  import {UserService} from '../userService/userService'
  import { createToken } from "../createJWT";
import { tokenToString } from "typescript";

interface params{
  firstname:string,
  lastname:string,
  email:string,
  password:string
}

  @Route("users")
  export class UsersController extends Controller {
    @SuccessResponse("201", "Created") 
    @Tags("User")
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
