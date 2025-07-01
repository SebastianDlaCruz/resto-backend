import { Auth } from '@common/decorators';
import { Rol } from '@common/enums';
import { Payload } from '@modules/auth/interface/payload';
import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {


  constructor(
    private readonly orderService: OrderService
  ) { }

  @Auth(Rol.USER)
  @Post()
  async create(@Body() order: OrderDto, @Req() req: Request) {

    const auth: Payload = req.user as Payload;
    return this.orderService.create(order, auth.sub);
  }

  @Auth(Rol.USER)
  @Get('generate-pdf/:uuid')
  async generaPdf(
    @Param('uuid') uuid: string,
    @Res() res: Response
  ) {

    return await this.orderService.generatePdf(uuid, res);
  }

  @Auth(Rol.ADMIN)
  @Get()
  async getAll(@Query('date') date?: Date) {
    return this.orderService.getAll(date);
  }
}
