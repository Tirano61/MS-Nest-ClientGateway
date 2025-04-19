import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OrderItemDto } from "./order-item.dto";


export class CreateOrderDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type( () => OrderItemDto)
    items: OrderItemDto[]

    //! Antes de crear la tabla OrderItems
    /* @IsNumber()
    @IsPositive()
    totalAmount: number;
    
    @IsNumber()
    @IsPositive()
    totalItems: number;

    @IsEnum( OrdersStatusList, {
        message: `Possible status values are ${ OrdersStatusList }`
    })
    @IsOptional()
    status: OrderStatus = OrderStatus.PENDING;

    @IsBoolean()
    @IsOptional()
    paid: boolean = false; */
    //! -----------------------------

}
