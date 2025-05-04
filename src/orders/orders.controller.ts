import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, HttpException, Query, Patch } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { NATS_SERVICE, ORDER_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { PaginationDto } from 'src/common';
import { StatusDto } from './dto/status.dto';


@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly orderClient: ClientProxy ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send( 'createOrder' , createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.orderClient.send('findAllOrders', orderPaginationDto);
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.orderClient.send('findOneOrder', {id})
      );
      return order;
    } catch (err) {
      const errorResponse = err?.response || {};
      const errorMessage = err?.message || 'An unexpected error occurred';
      const errorCode = err?.status || 'UNKNOWN_ERROR';
      throw new HttpException(errorMessage, errorCode );
    }
  }

  @Get(':status')
  async findAllByStatus( @Param() statusDto: StatusDto, @Query() paginationDto: PaginationDto,) {

    try {
      
      return this.orderClient.send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status,
      });
    
       
    } catch (err) {
      const errorResponse = err?.response || {};
      const errorMessage = err?.message || 'An unexpected error occurred';
      const errorCode = err?.status || 'UNKNOWN_ERROR';
      throw new HttpException(errorMessage, errorCode );
    }
  }

  @Patch(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.orderClient.send('changeOrderStatus', { id: id, status: statusDto.status }),
      );
  
      if (!result) {
        throw new HttpException(
          `Failed to change status for order with id ${id}`,
          404,
        );
      }
  
      return result;
    } catch (error) {
      const errorResponse = error?.response || {};
      const errorMessage = errorResponse?.message || 'An unexpected error occurred';
      const errorCode = errorResponse?.status || 500;
  
      // Lanza una excepción HTTP para que el cliente reciba el error correctamente
      throw new HttpException(errorMessage, errorCode);
    }
  }


}
