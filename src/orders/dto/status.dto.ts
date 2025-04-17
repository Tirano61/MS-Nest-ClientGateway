import { IsEnum, IsOctal, IsOptional } from "class-validator";
import { OrdersStatusList, OrderStatus } from "../enum/enum.orders";




export class StatusDto {

    @IsOptional()
     @IsEnum( OrdersStatusList, {
        message: `Valid status are ${ OrdersStatusList }`
    })
    status: OrderStatus;

}