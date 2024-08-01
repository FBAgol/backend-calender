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

  @Route("users")
export class UsersController extends Controller {
  @Get("/")
  public async getUser(
  ): Promise<User> {
    return new UserService().userLogin();
  }
}