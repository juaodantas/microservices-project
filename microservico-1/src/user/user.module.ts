import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_CLIENT',
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [process.env.KAFKA_BROKER],
            },
            consumer: {
              groupId: process.env.KAFKA_GROUPID,
            },
          },
        }),
      },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
