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
  } from "tsoa";
  import {User} from '../users/user'

  import {UserService} from '../userService/userService'

interface params{
  firstname:string,
  lastname:string,
  email:string,
  password:string
}
  
  @Route("users")
  export class UsersController extends Controller {
    @SuccessResponse("201", "Created") 
    @Post("/{userParams}")
    public async getUser(
      @Body() userParams: params,
      @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
    ): Promise<User> {
      if (!userParams) {
        return notFoundResponse(404, { reason: "We don't know you yet. Please provide a name" });
      }
      return new UserService().userLogin(userParams);
    }
  }
