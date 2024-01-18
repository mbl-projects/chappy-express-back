import { IsArray, IsDateString, IsInt, IsNumber, IsString, Length, Max, Min} from "class-validator";

export class CreateProjectDto {
    @IsString()
    @Length(1, 50)
    name:string;
    @IsString()
    @Length(1, 250)
    description:string;
    @IsInt()
    @Max(3)
    status:number;
    @IsInt()
    budget:number;
    @IsString()
    estimEndDate:Date;
    @IsArray()
    @IsNumber({}, {each: true})
    users:number[];
    id:number

    constructor(body:CreateProjectDto) {
        const {name, description, status, budget, estimEndDate, users} = body;
        this.name = name,
        this.description = description,
        this.status = status,
        this.budget = budget,
        this.estimEndDate = estimEndDate,
        this.users = users
    }
}

export class ModifyProjectDto {
    @IsString()
    @Length(1, 50)
    name:string;
    @IsString()
    @Length(1, 250)
    description:string;
    @IsInt()
    @Min(1)
    @Max(3)
    status:number;
    @IsInt()
    budget:number;
    @IsDateString()
    estimEndDate:Date;
    constructor(body:ModifyProjectDto) {
        const {name,description, status, budget, estimEndDate} = body;
        this.name = name,
        this.description = description,
        this.status = status,
        this.budget = +budget,
        this.estimEndDate = estimEndDate
    }
    
}

export class AddUserToProjectDto {
    
}