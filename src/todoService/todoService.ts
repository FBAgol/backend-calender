
import db from '../db/db-connection'
import { ToDo } from '../db/todoTable'
import {todoServiceParams, getTodoServiceResponse, updateTodosServiceResponse} from '../types/types-todos'
import { User } from '../db/userTable'

export class ToDoService {
    public async addToDos(todos: todoServiceParams): Promise<void> {
        const todo = new ToDo()
        todo.todo_list = JSON.stringify(todos.todo)
        todo.date_time = todos.date
        try {
          const user = await db.getRepository(User).findOneBy({ id: todos.userId });
          
          if (!user) {
            throw new Error('User not found');
          }
          todo.user = user;
          
          await db.manager.save(todo);
        } catch (error: any) {
          console.log("Database query Error:", error);
          throw error;
        }
      }

      public async getTodos(todoResponse:getTodoServiceResponse): Promise<string> { 
        try {
          const todo = await db.getRepository(ToDo).createQueryBuilder("todo")
            .where("todo.user.id = :userId", { userId: todoResponse.userId })
            .andWhere("todo.date_time LIKE :date", { date: `${todoResponse.date}%` })
            .getOne();
            //console.log(todo)
            return todo?.todo_list || "No Result Found";  
        } catch (error: any) {
          console.log("Database query Error:", error);
          throw error;
        }
      }

      public async updateTodos(todoResponse:updateTodosServiceResponse): Promise<string> {  
        try {
          const TodoTable = await db.getRepository(ToDo)

          const userTodo= await TodoTable.findOne({
            where: {
              user: { id: todoResponse.userId },
              date_time: todoResponse.date
            }
          });

          if (!userTodo) {
            return "No Result Found";
          }
          userTodo.todo_list = typeof todoResponse.todo === "string" 
          ? todoResponse.todo 
          : JSON.stringify(todoResponse.todo); 
          await TodoTable.save(userTodo);
          return "Updated Successfully";
          } catch (error: any) {
            console.log("Database query Error:", error);
            throw error;
        }
      }

      public async getAllOfMonthTodos(todoResponse:getTodoServiceResponse): Promise<any> { 
        try {
          const todo = await db.getRepository(ToDo).createQueryBuilder("todo")
            .where("todo.user.id = :userId", { userId: todoResponse.userId })
            .andWhere("todo.date_time LIKE :date", { date: `${todoResponse.date}%` })
            .getMany();
           const monthTodos=  todo.map((t) => {
              return {
                date: t.date_time,
                todo: t.todo_list
              }
            } )
          
            return monthTodos
        } catch (error: any) {
          console.log("Database query Error:", error);
          throw error;
        }
      }
    }
