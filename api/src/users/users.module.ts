import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AMQ_SERVICE } from '../app.constants';

@Module({
  imports: [
    ClientsModule.register([{
      name: AMQ_SERVICE,
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://user:bitnami@localhost:5672`],
        queue: 'users_queue',
        queueOptions: { durable: false },
      },
    }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }