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
    Patch,
  } from "tsoa";
  import { Request as ExRequest } from 'express'; 
  import jwt, {JwtPayload} from 'jsonwebtoken';
  import {ToDoService} from '../todoService/todoService'
  import { todoControllerParams, updateTodosControllerParams} from '../types/types-todos'	
  import {ToDo} from '../db/todoTable'

  @Route("/todo")
  export class ToDoController extends Controller {
   @SuccessResponse("201", "Created") 
   @Tags("Post-todo")
   @Post("/addTodo/{date}")
   public async createTodos(
     @Path() date: string,
     @Body() toDos:  todoControllerParams,
   ): Promise<void | string> {
     
     try {
      const userVerify=jwt.verify(toDos.token, process.env.JWT_SECRET as string) as JwtPayload
      if(userVerify.userId){
        const todos ={
          userId: userVerify.userId,
          date: date,
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
    @Get("/getTodo/{date}")
    public async recieveTodos(
      @Path() date: string,
      @Request() request: ExRequest
    ): Promise<String | undefined> {
      try {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Unauthorized");
      }
      const token = authHeader.split(" ")[1];
      const userVerify=jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
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

@Route("/")
export class updateTodosController extends Controller {
  @SuccessResponse("201", "Created") 
  @Tags("update-todos")
  @Patch("/update/{date}")
  public async updateTodoList(
    @Path() date: string,
    @Request() request: ExRequest,
    @Body() toDos:  updateTodosControllerParams
  ): Promise<String | undefined> {
    try {
      
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    const userVerify=jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    if(userVerify.userId){
      const updateTodos ={
        userId: userVerify.userId,
        date: date,
        todo: toDos.todo
      }
      await new ToDoService().updateTodos(updateTodos);
      
      return "Updated Successfully"
    }          
      
  } catch (error:any) {
      // console.log("Database query Error",error)
      throw error
  }
  }
}

@Route("/")
export class PDFFromMonthTodosController extends Controller {
  @SuccessResponse("201", "Created") 
  @Tags("get-Monthtodos")
  @Get("/monthtodos/{date}")
  public async recieveMonthTodos(
    @Path() date: string,
    @Request() request: ExRequest
  ): Promise<any> {
    try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    const userVerify=jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    if(userVerify.userId){
      const todos ={
        userId: userVerify.userId,
        date: date
      }
      const todoList=await new ToDoService().getAllOfMonthTodos(todos);
      
      return todoList
    }          
      
  } catch (error:any) {
      // console.log("Database query Error",error)
      throw error
  }
  }
}