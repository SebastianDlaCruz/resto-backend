import { DishModule } from '@modules/dish/dish.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CART_TOKEN } from './const/cart.const';
import { Cart } from './entity/cart.entity';
import { ItemCart } from './entity/item-cart.entity';
import { ItemService } from './services/item/item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, ItemCart]), UserModule, DishModule],
  providers: [

    {
      provide: CART_TOKEN,
      useClass: CartService
    },
    CartService,
    ItemService
  ],
  exports: [CART_TOKEN],
  controllers: [CartController]
})
export class CartModule { }
