import { IsDateString, IsInt, IsString, Length, Max, Min } from "class-validator";

export class PurchaseDto {
    @IsString()
    @Length(1, 50)
    name:string;
    @IsString()
    ref:string;
    @IsInt()
    @Max(3)
    status:number;
    @IsInt()
    price:number;
    @IsDateString()
    commandDate:Date;
    @IsDateString()
    deliveryDate:Date;
    idProject:string

    constructor(body:PurchaseDto) {
        const {name, ref, status, price, commandDate, deliveryDate} = body;
        this.name = name,
        this.ref = ref,
        this.status = status,
        this.price = price,
        this.commandDate = commandDate,
        this.deliveryDate = deliveryDate
    }
}

export class CreatePurchaseDto extends PurchaseDto {
    @IsInt()
    @Min(1)
    project: number;

    constructor(body: CreatePurchaseDto){
        super(body)
        this.project = body.project
    }
}

export const cleanResDataPurchases = {
    ref: true,
    id: true,
    name: true,
    status: true,
    price: true,
    commandDate: true,
    deliveryDate: true,
    project: {id:true, users: {id: true}, owner: {id: true}}
  }