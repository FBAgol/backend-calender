

export interface todoControllerParams{
    token: string
    todo: {
        done: string[]
        notDone : string[]
    }
}

export interface getTodoControllerResponse{
    token:string
    date:string
}
export interface todoServiceParams{
    userId:string,
    date:string,
    todo: {
        done: string[]
        notDone : string[]
    }
}

export interface getTodoServiceResponse{
    userId:string
    date:string
}

export interface updateTodosServiceResponse{ 
    userId:string
    date:string
    todo: {
        done: string[]
        notDone : string[]
    }
    
}

export interface updateTodosControllerParams{ 
    todo: {
        done: string[]
        notDone : string[]
    }

}