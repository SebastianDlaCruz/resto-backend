import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/comment.dto';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) { }


  async create(comment: CreateCommentDto) {

    try {

      const newComment = this.commentRepository.create(comment);

      await this.commentRepository.save(newComment);

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

}
