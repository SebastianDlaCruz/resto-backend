import { Auth } from '@common/decorators';
import { Rol } from '@common/enums';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {


  constructor(private readonly commentService: CommentService) { }

  @Auth(Rol.USER)
  @Post()
  async create(@Body() comment: CreateCommentDto) {
    return this.commentService.create(comment);
  }

  @Auth(Rol.USER)
  @Get(':id')
  async getFind(@Param() id: number) {
    return this.commentService.getFind(id);
  };
}
