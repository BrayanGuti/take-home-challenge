import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './user.controller';
import { UsersRepository } from './user.repository';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ClientsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UserModule {}
