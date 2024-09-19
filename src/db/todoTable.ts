import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import {User} from './userTable'

@Entity()
export class ToDo {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ default: () => 'NOW()' , nullable: false})
    date_time: string 

    @Column({ nullable: false })
    todo_list: String;

    @ManyToOne(()=>User, (userId)=>userId.toDos ,{onDelete: 'CASCADE'})
    user: User
}

console.log("table todo created")