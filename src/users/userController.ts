import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
  } from "tsoa";
  import {User} from './user'

  import {UserService} from './userService'

interface params{
  firstname:string,
  lastname:string,
  email:string,
  password:string
}
  
  @Route("users")
  export class UsersController extends Controller {
    @Post("/{userParams}")
    public async getUser(
      @Body() userParams: params
    ): Promise<User> {
      return new UserService().userLogin(userParams);
    }
  }
