import { Auth } from '@common/decorators';
import { Rol } from '@common/enums';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {


  constructor(private orderService: OrderService) { }

  @Auth(Rol.USER)
  @Post()
  async create(@Body() order: OrderDto) {

  }

  @Auth(Rol.USER)
  @Get()
  generaPdf() {

  }

  @Auth(Rol.ADMIN)
  @Get()
  getAll() {

  }
}
