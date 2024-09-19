import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { ToDo } from "./todoTable"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column({
        unique: true 
    })
    email: string

    @Column()
    password: string

    @OneToMany(()=>ToDo, (todos)=>todos.user)
    toDos: ToDo[]

}

console.log("table user created")