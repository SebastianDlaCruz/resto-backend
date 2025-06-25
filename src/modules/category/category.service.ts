import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/category.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }


  async create(categoryDto: CreateCategoryDto) {

    try {

      const create = this.categoryRepository.create(categoryDto);

      await this.categoryRepository.save(create);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Existo al crear la categoría'
      }

    } catch {
      throw new InternalServerErrorException('Erro al crear la categoría')
    }
  }


  async getAll() {
    try {

      const categories = await this.categoryRepository.find();

      if (!categories) throw new NotFoundException('Error al obtener las categorías')

      return {
        statusCode: HttpStatus.OK,
        message: 'Éxito al obtener las categorías',
        data: categories
      }

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Error al obtener las categorías')
    }
  }

  async update(id: number, categoryDto: CreateCategoryDto) {
    try {
      await this.categoryRepository.update(id, categoryDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Éxito al actualizar la categoría'
      }

    } catch {
      throw new InternalServerErrorException('Erro al actualizar la categoría');

    }

  }

  async delete(id: number) {
    try {
      await this.categoryRepository.delete(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Éxito al eliminar la categoría'
      }
    } catch {
      throw new InternalServerErrorException('Error al eliminar la categoría');
    }
  }
}
