import { Auth } from '@common/decorators';
import { Rol } from '@common/enums';
import { ParseFormDataPipe } from '@common/pipes';
import { ImgService } from '@common/services';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DishService } from './dish.service';
import { DishCreateDto } from './dto/dish-create.dto';
import { UpdateDishQualificationDto } from './dto/update-dish-qualification}.dto';

@Controller('dish')
export class DishController {

  constructor(
    private dishService: DishService,
    private imgService: ImgService
  ) { }

  @Auth(Rol.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async crate(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ParseFormDataPipe()) dish: DishCreateDto
  ) {
    const img = await this.imgService.updateLoadImg(file);

    return this.dishService.create({
      ...dish,
      img
    });
  }

  @Auth(Rol.USER)
  @Get()
  async getDishes(@Query('id_category') id_category: string) {
    return this.dishService.getDishes(parseInt(id_category))
  }

  @Auth(Rol.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body(new ParseFormDataPipe()) dish: DishCreateDto
  ) {

    if (file) {
      const img = await this.imgService.updateLoadImg(file);
      dish.img = img
    }


    return this.dishService.update(parseInt(id), dish);

  }


  @Auth(Rol.USER)
  @Put(':id')
  async getUpdateQualification(@Param('id') id: number, @Body() qualification: UpdateDishQualificationDto) {
    return this.dishService.updateCalcification(id, qualification);
  }


  @Auth(Rol.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {

    return this.dishService.delete(parseInt(id));
  }


  @Auth(Rol.USER)
  @Get(':id')
  async getFindOnde(@Param('id') id: string) {
    return this.dishService.getFindOnde(parseInt(id));
  }


}
