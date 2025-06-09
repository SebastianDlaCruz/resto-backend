import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_SERVICES_CREATE_TOKEN } from './const/constants.';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [{ provide: USER_SERVICES_CREATE_TOKEN, useClass: UserService }, UserService],
  exports: [USER_SERVICES_CREATE_TOKEN]
})
export class UserModule { }
