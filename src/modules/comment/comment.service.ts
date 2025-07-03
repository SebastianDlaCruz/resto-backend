import { DISH_TOKEN_SERVICES } from '@modules/dish/const/dish-token.const';
import { IDish } from '@modules/dish/interface/dish.interface';
import { HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/comment.dto';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @Inject(DISH_TOKEN_SERVICES) private dish: IDish
  ) { }


  async create(comment: CreateCommentDto) {

    try {

      const newComment = this.commentRepository.create({
        ...comment,
        qualification: 5 / comment.qualification
      });

      const save = await this.commentRepository.save(newComment);


      await this.calculateQuality(save);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Comentario creado con éxito',
      }

    } catch {
      throw new InternalServerErrorException('Error al crear el comentario');
    }
  }

  async getFind(id: number) {

    try {

      const comment = await this.commentRepository.find({
        where: {
          id: id
        },
        relations: ['user']
      });

      if (!comment) throw new NotFoundException('Comentario no encontrado');


      return {
        statusCode: HttpStatus.OK,
        message: 'Comentario encontrado',
        data: comment
      }
    } catch (error) {

      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Error al obtener el comentario');
    }
  }

  private async calculateQuality(comment: Comment) {

    try {

      const dish = await this.dish.getDishByComment(comment.dish.id);

      if (!dish) throw new NotFoundException('Platillo no encontrado');

      const userQualifications = dish.comment.map(comment => comment.qualification);
      const totalQualification = userQualifications.reduce((a, b) => a + b, 0) / userQualifications.length;

      await this.dish.updateQuality(dish.id, `${totalQualification}`);

    } catch {
      throw new InternalServerErrorException('Error al actualizar la calificación');
    }

  }

}
