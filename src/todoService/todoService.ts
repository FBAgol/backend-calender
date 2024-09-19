
import db from '../db/db-connection'
import { ToDo } from '../db/todoTable'
import {todoServiceParams, getTodoServiceResponse} from '../types/types-todos'
import { User } from '../db/userTable'

export class ToDoService {
    public async addToDos(todos: todoServiceParams): Promise<void> {
        const todo = new ToDo()
        todo.todo_list = JSON.stringify(todos.todo)
        
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

      public async getTodos(todoResponse:getTodoServiceResponse): Promise<String> {
        const todo = new ToDo()
        
        try {
          const user = await db.getRepository(ToDo).findOneBy({id: todoResponse.userId});
          
          if (!user) {
            throw new Error('User not found');
          }
          
          return user.todo_list
        } catch (error: any) {
          console.log("Database query Error:", error);
          throw error;
        }
      }
    }
