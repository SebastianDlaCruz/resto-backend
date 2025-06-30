import { Auth } from '@common/decorators';
import { Rol } from '@common/enums';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CardService } from './card.service';
import { CardDto } from './dto/card.dto';

@Controller('card')
export class CardController {

  constructor(
    private readonly cardService: CardService
  ) { }

  @Auth(Rol.USER)
  @Get()
  async getCards(@Req() req: Request) {
    return this.cardService.getCards(req)
  }

  @Auth(Rol.USER)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() card: CardDto, @Req() req: Request) {
    return this.cardService.create(card, req);
  }

  @Auth(Rol.USER)
  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('uuid') UUID: string) {
    return this.cardService.delete(UUID)
  }

}
