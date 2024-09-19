

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
    userId:string
    todo: {
        done: string[]
        notDone : string[]
    }
}

export interface getTodoServiceResponse{
    userId:string
    date:string
}