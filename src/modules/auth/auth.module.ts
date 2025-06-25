import { User } from '@modules/user/user.entity';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './entity/auth.entity';
import { CookieService } from './services/cookie/cookie.service';
import { HastService } from './services/hast/hast.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([Auth, User]),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, HastService, CookieService, JwtStrategy, RefreshStrategy],
  exports: [AuthService, CookieService]
})
export class AuthModule { }
