import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { CARD_TOKEN } from './const/cart.const';
import { Card } from './entity/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), UserModule],
  controllers: [CardController],
  providers: [
    {
      provide: CARD_TOKEN,
      useClass: CardService
    },
    CardService
  ],
  exports: [CARD_TOKEN]
})
export class CardModule { }
