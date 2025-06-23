import { Auth } from '@common/decorators';
import { Rol } from '@common/enums';
import { ParseFormDataPipe } from '@common/pipes';
import { ImgService } from '@common/services';
import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';


@Controller('category')
export class CategoryController {

  constructor(
    private categoryService: CategoryService,
    private imgService: ImgService
  ) { }

  @Auth(Rol.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async crate(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ParseFormDataPipe()) categoryDto: CreateCategoryDto) {

    const img = await this.imgService.updateLoadImg(file);
    return this.categoryService.create({
      ...categoryDto,
      img
    })
  }

  @Auth(Rol.USER)
  @Get()
  async getCategories() {
    return this.categoryService.getAll();
  }

  @Auth(Rol.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body(new ParseFormDataPipe()) categoryDto: CreateCategoryDto
  ) {

    const img = await this.imgService.updateLoadImg(file);

    return this.categoryService.update(id,
      {
        ...categoryDto,
        img
      }
    )
  }


  @Auth(Rol.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }

}
