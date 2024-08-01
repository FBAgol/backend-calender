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

  interface UserParams {
    firstname: string;
    lastname: string;
    email:string
    password: string;
  }
  
  @Route("users")
  export class UsersController extends Controller {
    @Get("/{params}")
    public async getUser(
      @Path() params: string
    ): Promise<User> {
      const { firstname, lastname,email, password }: UserParams = JSON.parse(decodeURIComponent(params));
      return new UserService().userLogin({ firstname, lastname, email, password });
    }
  }
