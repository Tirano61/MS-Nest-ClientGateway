import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [OrdersController],
  imports:[NatsModule]
})
export class OrdersModule {}
