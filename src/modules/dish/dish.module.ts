import { ImgService } from '@common/services';
import { CategoryModule } from '@modules/category/category.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DISH_TOKEN_SERVICES } from './const/dish-token.const';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { Dish } from './entity/dish.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dish]),
    CategoryModule
  ],
  controllers: [DishController],
  providers: [{
    provide: DISH_TOKEN_SERVICES,
    useClass: DishService
  }, DishService, ImgService],
  exports: [DISH_TOKEN_SERVICES]
})
export class DishModule { }
