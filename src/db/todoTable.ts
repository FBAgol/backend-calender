import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique } from "typeorm"
import {User} from './userTable'

@Entity()
@Unique(["user", "date_time"])
export class ToDo {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false})
    date_time: string 

    @Column({ nullable: false })
    todo_list: string;

    @ManyToOne(()=>User, (userId)=>userId.toDos ,{onDelete: 'CASCADE'})
    user: User
}

console.log("table todo created")