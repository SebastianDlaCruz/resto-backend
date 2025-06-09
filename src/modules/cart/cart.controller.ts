import { Auth } from '@common/decorators';
import { Rol } from '@common/enums';
import { Payload } from '@modules/auth/interface/payload';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CartService } from './cart.service';
import { ItemDto } from './dto/item.dto';

@Controller('cart')
export class CartController {

  constructor(
    private readonly cartService: CartService
  ) { }

  @Auth(Rol.USER)
  @Post('add-item')
  async addItem(@Body() item: ItemDto, @Req() req: Request) {
    const auth = req.user as Payload;
    return this.cartService.addItem(item, auth)
  }


  @Auth(Rol.USER)
  @Get()
  async getCart(@Req() req: Request) {
    const auth = req.user as Payload;
    return this.cartService.getCart(auth.sub);
  }


}
