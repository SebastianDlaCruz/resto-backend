import { CardModule } from '@modules/card/card.module';
import { CartModule } from '@modules/cart/cart.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { GeneratePdfService } from './services/generate-pdf/generate-pdf.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CartModule, UserModule, CardModule],
  controllers: [OrderController],
  providers: [OrderService, GeneratePdfService],
})
export class OrderModule { }
