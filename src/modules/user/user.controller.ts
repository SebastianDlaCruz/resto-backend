import { Auth } from '@common/decorators';
import { Rol } from '@common/enums';
import { Payload } from '@modules/auth/interface/payload';
import { Body, Controller, Get, Patch, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';


@Controller('user')

export class UserController {

  constructor(
    private readonly userService: UserService
  ) { }

  @Auth(Rol.USER)
  @Patch()
  async update(@Body() user: UserDto, @Req() req: Request) {
    const auth = req.user as Payload;
    return this.userService.update(user, auth.sub)
  }

  @Auth(Rol.USER)
  @Get()
  async getUser(@Res() res: Response, @Req() req: Request) {
    const auth = req?.user as Payload;
    return this.userService.getUser(res, auth)
  }



}
