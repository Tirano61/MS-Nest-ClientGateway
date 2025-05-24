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
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send( 'createOrder' , createOrderDto);
  }

  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      const orders = await firstValueFrom(
        this.client.send('findAllOrders', orderPaginationDto)
      )
      return orders;
      
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.client.send('findOneOrder', {id})
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findAllByStatus( @Param() statusDto: StatusDto, @Query() paginationDto: PaginationDto,) {

    try {
      
      return this.client.send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status,
      });
    
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.client.send('changeOrderStatus', { id: id, status: statusDto.status }),
      );
  
      if (!result) {
        throw new HttpException(
          `Failed to change status for order with id ${id}`,
          404,
        );
      }
  
      return result;

    } catch (error) {
      throw new RpcException(error);
    }
  }


}
