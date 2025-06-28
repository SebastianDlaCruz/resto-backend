import { Payload } from '@modules/auth/interface/payload';
import { USER_SERVICES_CREATE_TOKEN } from '@modules/user/const/constants.';
import { IUser } from '@modules/user/interface/user.interface';
import { User } from '@modules/user/user.entity';
import { HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    @Inject(USER_SERVICES_CREATE_TOKEN) private user: IUser,
    private readonly itemService: ItemService

  ) { }


  async getCart(uuidAuth: string) {

    try {
      const user = await this.user.exist(uuidAuth);

      if (!user) throw new NotFoundException('Usuario no encontrado');

      const cart = await this.cartRepository.findOne({
        where: {
          user
        },
        relations: {
          items: { dish: true }
        }
      })

      if (!cart) throw new NotFoundException('Carrito no encontrado');



      return {
        statusCode: HttpStatus.OK,
        message: 'Datos del carrito',
        data: cart
      }

    } catch (error) {

      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Error al obtener el carrito')
    }
  }

  async addItem(item: ItemDto, auth: Payload) {

    try {

      const user = await this.user.exist(auth.sub);

      if (!user) throw new NotFoundException('Usuario no encontrado');

      let cart = await this.cartRepository.findOne({
        where: {
          user
        },

      })

      if (!cart) {
        const newCart = await this.create(user);
        cart = { ...newCart };
      }


      const newItems = await this.itemService.add(item, cart);


      await this.updateTotalPrice(cart.uuid, this.sumTotal(newItems.total, cart.total));


      return {
        statusCode: HttpStatus.OK,
        message: 'Item agregado al carrito',

      }


    } catch (error) {

      if (error instanceof NotFoundException) throw error;

      if (error instanceof InternalServerErrorException) throw error;

      throw error

    }
  }


  private async create(user: User) {

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

  async deleteItem(uuidUser: string, id: number) {

    try {

      const user = await this.user.exist(uuidUser);

      if (!user) throw new NotFoundException('Usuario no encontrado');

      const cart = await this.cartRepository.findOne({
        where: {
          user
        }
      })

      if (!cart) throw new NotFoundException('Carrito no encontrado');

      const item = await this.itemRepository.findOne({
        where: {
          id
        }
      })

      if (!item) throw new NotFoundException('Item no encontrado');


      await this.updateTotalPrice(cart.uuid, this.decrementTotal(cart.total, item.total));

      return this.itemService.delete(id);

    } catch (error) {

      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Error al eliminar el item del carrito')
    }


  }


  private sumTotal(total: number, price: number) {
    return total + price;
  }

  private decrementTotal(total: number, price: number) {
    return total - price;
  }

  private async updateTotalPrice(uuidCart: string, total: number) {

    try {

      await this.cartRepository.update(uuidCart, {
        total
      });


    } catch {
      throw new InternalServerErrorException('Error al calcular el precio total')
    }

  }

}
