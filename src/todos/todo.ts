import {todoServiceParams} from '../types/types-todos'
export class User {
    
    public todo_list:todoServiceParams | null = null
    constructor(todo_list:todoServiceParams) {
        this.todo_list = todo_list
    }
  }
  