import { ItemDto } from '@modules/cart/dto/item.dto';
import { Cart } from '@modules/cart/entity/cart.entity';
import { ItemCart } from '@modules/cart/entity/item-cart.entity';
import { DISH_TOKEN_SERVICES } from '@modules/dish/const/dish-token.const';
import { IDish } from '@modules/dish/interface/dish.interface';
import { HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {

  constructor(
    @InjectRepository(ItemCart)
    private itemRepository: Repository<ItemCart>,

    //services
    @Inject(DISH_TOKEN_SERVICES) private dish: IDish,
  ) { }


  async add(item: ItemDto, cart: Cart) {

    try {

      const dish = await this.dish.exist(item.idDish);


      if (!dish) throw new NotFoundException('El platillo no existe');


      const newItem = this.itemRepository.create({
        cart,
        count: item.count,
        total: parseFloat(dish.price) * item.count,
        dish
      })


      await this.itemRepository.save(newItem)

      return {
        statusCode: HttpStatus.OK,
        message: 'Existo al agregar el item al carrito'
      }

    } catch (error) {

      if (error instanceof NotFoundException) throw error;



      throw new InternalServerErrorException('Error al agregar el platillo al item del carrito')
    }

  }

  async delete(id: number) {
    try {

      await this.itemRepository.delete(id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Existo al eliminar el item al carrito'
      }

    } catch {
      throw new InternalServerErrorException('Error al eliminar el item del carrito')
    }
  }


}
