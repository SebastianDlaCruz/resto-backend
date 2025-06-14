import { Auth } from '@common/decorators';
import { Rol } from '@common/enums';
import { Controller, Delete, Patch, Post } from '@nestjs/common';

@Controller('dish')
export class DishController {


  @Auth(Rol.ADMIN)
  @Post()
  async crate() { }

  @Auth(Rol.USER)
  @Post()
  async getDishes() { }

  @Auth(Rol.ADMIN)
  @Patch(':id')
  async update() { }


  @Auth(Rol.ADMIN)
  @Delete(':id')
  async delete() { }

}
