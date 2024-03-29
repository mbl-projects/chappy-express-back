import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StatusEnum } from "../enums/status.enum";
import { UserEntity } from "./user.entity";
import { StepEntity } from "./step.entity";
import { ProjectEntity } from "./project.entity";
import { CategoriesEnum } from "../enums/categories.enum";

@Entity({name:"task"})
export class TaskEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    @Column({type:"varchar"})
    description: string;

    @Column({type:"enum", enum:StatusEnum, default:StatusEnum.IN_PROGRESS})
    status: StatusEnum

    @Column({type:"int"})
    budget: number;

    @Column({type:"date"})
    startDate: Date;

    @Column({type:"enum", enum:CategoriesEnum, default:CategoriesEnum.PLOMBERIE})
    category: CategoriesEnum

    @Column({type:"date"})
    endDate: Date;

    @ManyToMany (() => UserEntity, {cascade: true})
    @JoinTable()
    users: UserEntity[]

    @ManyToOne (() => StepEntity, step => step.tasks, { onDelete: "CASCADE" }) step:StepEntity;
    @ManyToOne (() => ProjectEntity, project => project.tasks, { onDelete: "CASCADE" }) project:ProjectEntity;
    @ManyToOne (() => UserEntity, owner => owner.myOwnTasks) owner:UserEntity;
}