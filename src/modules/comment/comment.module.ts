import { DishModule } from '@modules/dish/dish.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './entity/comment.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Comment]), DishModule],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule { }
