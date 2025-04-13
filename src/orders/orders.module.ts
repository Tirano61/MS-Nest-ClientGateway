import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';

@Module({
  controllers: [OrdersController],
  imports:[
      ClientsModule.register([
        {
          name: ORDER_SERVICE, 
          transport: Transport.TCP,
          options: {
            host: envs.orderMicroserviceHost,
            port: envs.orderMicroservicePort,
          }
        },
      ])
    ]
})
export class OrdersModule {}
