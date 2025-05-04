import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';

@Module({
  controllers: [OrdersController],
  imports:[
      ClientsModule.register([
        {
          name: NATS_SERVICE, 
          transport: Transport.NATS,
          options: {
            servers: envs.natsServers
          }
        },
      ])
    ]
})
export class OrdersModule {}
