import { Auth } from '@common/decorators';
import { Rol } from '@common/enums';
import { Payload } from '@modules/auth/interface/payload';
import { Body, Controller, Get, Param, Patch, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';


@Controller('user')

export class UserController {

  constructor(
    private readonly userService: UserService
  ) { }

  @Auth(Rol.USER)
  @Patch(':uuid')
  async update(@Body() user: UserDto, @Param('uuid') uuid: string, @Res() res: Response) {
    return this.userService.update(user, uuid, res)
  }

  @Auth(Rol.USER)
  @Get()
  async getUser(@Res() res: Response, @Req() req: Request) {
    const auth = req?.user as Payload;
    return this.userService.getUser(res, auth)
  }



}
