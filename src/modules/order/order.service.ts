import { CARD_TOKEN } from '@modules/card/const/cart.const';
import { CardMethods } from '@modules/card/interface/card.interface';
import { CART_TOKEN } from '@modules/cart/const/cart.const';
import { CartMethods } from '@modules/cart/interface/cart.interface';
import { USER_SERVICES_CREATE_TOKEN } from '@modules/user/const/constants.';
import { IUser } from '@modules/user/interface/user.interface';
import { HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { Order } from './entity/order.entity';
import { GeneratePdfService } from './services/generate-pdf/generate-pdf.service';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @Inject(CART_TOKEN) private cart: CartMethods,
    @Inject(CARD_TOKEN) private card: CardMethods,
    @Inject(USER_SERVICES_CREATE_TOKEN) private user: IUser,
    private readonly generatePdfService: GeneratePdfService) { }


  async create(order: OrderDto, uuidAuth: string) {

    try {

      const [cart, card, user] = await Promise.all([
        this.cart.exist(order.cartUuid),
        this.card.exist(order.cardUuid),
        this.user.searchForAuth(uuidAuth)
      ]);


      if (!cart) throw new NotFoundException('El carrito no existe');

      if (!card) throw new NotFoundException('La tarjeta no existe');

      if (!user) throw new NotFoundException('El usuario no existe');

      const newOrder = this.orderRepository.create(
        {
          card,
          cart,
          user,
        }
      );

      await this.orderRepository.save(newOrder);


      return {
        statusCode: HttpStatus.CREATED,
        message: 'Orden creada correctamente',
        data: {
          "uuid": newOrder.uuid
        }
      }

    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Error al crear la orden');
    }
  }



  async getAll(date?: Date) {

    try {


      const orders = await this.getOrder(date);

      if (!orders) throw new NotFoundException('No se encontraron ordenes');

      return {
        statusCode: HttpStatus.OK,
        message: 'Existo al obtener las ordenes',
        data: orders
      }

    } catch (error) {

      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al obtener las ordenes');
    }
  }

  async generatePdf(uuidOrder: string, res: Response) {

    try {

      const order = await this.exist(uuidOrder);

      if (!order) throw new NotFoundException('La orden no existe');


      const pdfBuffer = await this.generatePdfService.generate(order);

      console.log(`
        ******** pdfBuffer *****

        ${pdfBuffer.toString()} 
        `)

      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `attachment; filename=${uuidOrder}.pdf`);
      res.setHeader('Content-Length', pdfBuffer.length);

      return {
        statusCode: HttpStatus.OK,
        message: 'Existo al generar el pdf',
        data: res.send(pdfBuffer)
      }

    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al generar el pdf');
    }
  }


  private async exist(uuid: string) {
    return await this.orderRepository.findOne({
      where: { uuid }, relations: {
        user: true,
        cart: {
          items: {
            dish: true
          },
        },
      }
    });

  }

  private async getOrder(date?: Date) {

    if (!date) return this.orderRepository.find({ relations: ['cart', 'user'] });

    return this.orderRepository.find({ where: { date }, relations: ['cart', 'user'] });
  }
}
