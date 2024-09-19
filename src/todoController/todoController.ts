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
  import jwt, {JwtPayload} from 'jsonwebtoken';
  import {ToDoService} from '../todoService/todoService'
  import { todoControllerParams, getTodoControllerResponse} from '../types/types-todos'	

  @Route("/todo")
  export class ToDoController extends Controller {
   @SuccessResponse("201", "Created") 
   @Tags("Post-todo")
   @Post("/addTodo")
   public async createTodos(
     @Body() toDos:  todoControllerParams,
   ): Promise<void | string> {
     
     try {
      const userVerify=jwt.verify(toDos.token, process.env.JWT_SECRET as string) as JwtPayload
      if(userVerify.userId){
        const todos ={
          userId: userVerify.userId,
          todo: toDos.todo
        }
        await new ToDoService().addToDos(todos);
      }      
        return "Added Successfully" 
       
   } catch (error:any) {
       // console.log("Database query Error",error)
        throw error
   }
   }
 }

 @Route("/")
 export class ToDoListeController extends Controller {
  @SuccessResponse("201", "Created") 
  @Tags("get-todos")
  @Post("/getTodo/{date}")
  public async createTodos(
    @Path() date: string,
    @Query() token:  string,
  ): Promise<String | undefined> {
    try {
     const userVerify=jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
     console.log("userVerify",userVerify.userId)
     if(userVerify.userId){
       const todos ={
         userId: userVerify.userId,
         date: date
       }
       const todoList=await new ToDoService().getTodos(todos);
       
       return todoList
     }      
       
      
  } catch (error:any) {
      // console.log("Database query Error",error)
       throw error
  }
  }
}