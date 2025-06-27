import { ImgService } from '@common/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CATEGORY_TOKEN } from './const/category.const';
import { Category } from './entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [ImgService, {
    provide: CATEGORY_TOKEN,
    useClass: CategoryService
  }, CategoryService],
  exports: [CATEGORY_TOKEN]
})
export class CategoryModule { }
