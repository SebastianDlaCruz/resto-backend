
import { AccessTokenGuard, RefreshTokenGuard } from '@common/guards';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }


  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() authDto: CreateAuthDto, @Res() res: Response) {
    return this.authService.signup(authDto, res)
  }

  @Post('sing-in')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authDto: AuthDto, @Res() res: Response) {
    return this.authService.login(authDto, res)
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh_token')
  refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'] as string;
    return this.authService.refreshToken(refreshToken, res)
  }

  @UseGuards(AccessTokenGuard)
  @Get('sing-out')
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }


}
