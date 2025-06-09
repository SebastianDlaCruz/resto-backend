import { Payload } from '@modules/auth/interface/payload';
import { DISH_TOKEN_SERVICES } from '@modules/dish/const/dish-token.const';
import { IDish } from '@modules/dish/interface/dish.interface';
import { USER_SERVICES_CREATE_TOKEN } from '@modules/user/const/constants.';
import { IUser } from '@modules/user/interface/user.interface';
import { User } from '@modules/user/user.entity';
import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemDto } from './dto/item.dto';
import { Cart } from './entity/cart.entity';
import { ItemCart } from './entity/item-cart.entity';
import { ItemService } from './services/item/item.service';

@Injectable()
export class CartService {

  constructor(

    // Repository
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(ItemCart)
    private itemRepository: Repository<ItemCart>,


    // services
    @Inject(DISH_TOKEN_SERVICES) private dish: IDish,
    @Inject(USER_SERVICES_CREATE_TOKEN) private user: IUser,
    private readonly itemService: ItemService

  ) { }

  async addItem(item: ItemDto, auth: Payload) {

    try {

      const user = await this.user.existUuidAuth(auth.sub);

      if (!user) throw new NotFoundException('Usuario no encontrado');

      let cart = await this.cartRepository.findOne({
        where: {
          user
        },
        relations: ['items']
      })

      if (!cart) {
        const newCart = await this.create(user);
        cart = { ...newCart };
      }

      const response = await this.itemService.add(item, cart);

      return response;


    } catch (error) {

      if (error instanceof NotFoundException) throw error;

      if (error instanceof InternalServerErrorException) throw error;

      throw error

    }
  }



  async create(user: User) {

    try {

      const newCart = this.cartRepository.create({
        user,
        items: [],
        total: 0
      })

      return this.cartRepository.save(newCart);

    } catch {
      throw new InternalServerErrorException('Error al crear el carrito')
    }

  }




}
