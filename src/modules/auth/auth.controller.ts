
import { AccessTokenGuard } from '@common/guards';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }


  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() authDto: CreateAuthDto, @Res() res: Response) {
    return this.authService.signup(authDto, res)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authDto: AuthDto, @Res() res: Response) {
    return this.authService.login(authDto, res)
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }


}
