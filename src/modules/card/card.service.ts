import { Payload } from '@modules/auth/interface/payload';
import { USER_SERVICES_CREATE_TOKEN } from '@modules/user/const/constants.';
import { IUser } from '@modules/user/interface/user.interface';
import { HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { CardDto } from './dto/card.dto';
import { Card } from './entity/card.entity';

@Injectable()
export class CardService {

  constructor(

    // repository
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,

    // services
    @Inject(USER_SERVICES_CREATE_TOKEN) private user: IUser) { }


  async getCards(req: Request) {

    try {

      const auth = req?.user as Payload;

      const cards = await this.cardRepository.find({
        where: {
          user: {
            uuid: auth.sub
          }
        }
      });

      return {
        statusCode: HttpStatus.OK,
        status: 'success',
        message: 'Éxito al consultar las tarjetas',
        cards
      }


    } catch {
      throw new InternalServerErrorException('Error al consultar las tarjetas');

    }
  }

  async create(card: CardDto, req: Request) {

    try {

      const auth = req?.user as Payload;


      const user = await this.user.exist(auth.sub);

      if (!user) {
        throw new NotFoundException('Usuario no encontrado')
      }

      card.username = card.username.toLocaleUpperCase()

      const newCard = this.cardRepository.create({
        ...card,
        user
      })

      await this.cardRepository.save(newCard);

      return {
        statusCode: HttpStatus.CREATED,
        status: 'success',
        message: 'Éxito al crear la tarjeta'
      }
    } catch (error) {

      if (error instanceof NotFoundException) {
        throw error
      }


      throw new InternalServerErrorException('Error al crear una tarjeta')
    }

  }


  async delete(uuidCard: string) {
    try {

      const card = await this.cardRepository.findOne({ where: { uuid: uuidCard } });

      if (!card) {
        throw new NotFoundException('Tarjeta no encontrada')
      }

      await this.cardRepository.delete(card.uuid);

      return {
        statusCode: HttpStatus.OK,
        status: 'success',
        message: 'Éxito al eliminar la tarjeta'
      }


    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }

      throw new InternalServerErrorException('Algo salio mal al eliminar la tarjeta')
    }
  }
}
