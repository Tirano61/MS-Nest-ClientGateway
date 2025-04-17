import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { OrdersStatusList, OrderStatus } from "../enum/enum.orders";


export class OrderPaginationDto extends PaginationDto{
    @IsOptional()
    @IsEnum( OrdersStatusList, {
        message: `Valid status are ${ OrdersStatusList }`
    })
    status: OrderStatus;
}