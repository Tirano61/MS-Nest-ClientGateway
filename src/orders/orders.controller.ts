import { Controller, Get, Post, Body, Param, Inject, ParseIntPipe } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly orderClient: ClientProxy ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send( 'createOrder' , createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderClient.send('findAllOrders',{});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderClient.send('findOneOrder', id);
  }

}
