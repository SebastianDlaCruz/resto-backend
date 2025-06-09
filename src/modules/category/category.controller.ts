import { Auth } from '@common/decorators';
import { Rol } from '@common/enums';
import { Controller, Delete, Patch, Post } from '@nestjs/common';

@Controller('category')
export class CategoryController {

  @Auth(Rol.ADMIN)
  @Post()
  async crate() { }

  @Auth(Rol.USER)
  @Post()
  async getCategories() { }

  @Auth(Rol.ADMIN)
  @Patch(':id')
  async update() { }


  @Auth(Rol.ADMIN)
  @Delete(':id')
  async delete() { }

}
