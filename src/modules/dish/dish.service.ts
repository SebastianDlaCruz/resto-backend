import { CATEGORY_TOKEN } from '@modules/category/const/category.const';
import { CategoryMethod } from '@modules/category/interface/category.interface';
import { HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DishCreateDto } from './dto/dish-create.dto';
import { UpdateDishQualificationDto } from './dto/update-dish-qualification}.dto';
import { Dish } from './entity/dish.entity';
import { IDish } from './interface/dish.interface';

@Injectable()
export class DishService implements IDish {

  constructor(
    // Repository
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
    @Inject(CATEGORY_TOKEN) private category: CategoryMethod,

  ) { }


  async getDishByComment(id: number): Promise<Dish | null> {

    try {

      const dish = await this.dishRepository.findOne({
        where: {
          comment: {
            id
          }
        }, relations: ['comment']
      })

      if (!dish) throw new NotFoundException('Platillo no encontrado');

      return dish;

    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Error al obtener el platillo');
    }
  }



  async updateQuality(id: number, qualification: string): Promise<void> {
    try {

      await this.dishRepository.update(id, { qualification });

    } catch {
      throw new InternalServerErrorException('Error al actualizar la calificación');
    }
  }



  async exist(id: number): Promise<Dish | null> {

    return this.dishRepository.findOne({
      where: {
        id
      }
    })
  }


  async create(dish: DishCreateDto) {

    try {

      const category = await this.category.exist(parseInt(dish.categoryId))

      const newDish = this.dishRepository.create({
        ...dish,
        category
      });

      await this.dishRepository.save(newDish);


      return {
        statusCode: HttpStatus.CREATED,
        message: 'Platillo creado correctamente',
      }
    } catch {
      throw new InternalServerErrorException('Error al crear el platillo');
    }
  }

  async getDishes(id_category?: number) {

    try {

      if (id_category) {

        const dishes = await this.dishRepository.find({
          where: {
            category: {
              id: id_category
            }
          }
        });

        return {
          statusCode: HttpStatus.OK,
          message: 'Platillos entregados exitosamente',
          data: dishes
        }
      }

      const dishes = await this.dishRepository.find();

      return {
        statusCode: HttpStatus.OK,
        message: 'Platillos entregados exitosamente',
        data: dishes
      }

    } catch {
      throw new InternalServerErrorException('Error al traer los platillos')
    }
  }

  async update(id: number, dishDto: DishCreateDto) {
    try {

      const dish = await this.exist(id);

      if (!dish) throw new NotFoundException('Platillo no encontrado');

      await this.dishRepository.update(id, dishDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Éxito al actualizar el platillo'
      }

    } catch (error) {

      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('Error al actualizar el platillo')

    }
  }


  async updateCalcification(id: number, qualification: UpdateDishQualificationDto) {
    try {

      const dish = await this.exist(id);

      if (!dish) throw new NotFoundException('Platillo no encontrado');

      await this.dishRepository.update(id, {
        qualification: qualification.qualification
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Éxito al actualizar la calificación'
      }

    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al actualizar la calificación');
    }
  }


  async delete(id: number) {

    try {

      const dish = await this.exist(id);

      if (!dish) throw new NotFoundException('Platillo no encontrado');

      await this.dishRepository.delete(id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Éxito al eliminar el platillo'
      }

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('Error al eliminar el platillo')

    }
  }

  async getFindOnde(id: number) {
    try {

      const dish = await this.dishRepository.findOne({ where: { id } });

      if (!dish) throw new NotFoundException('Platillo no encontrado');


      return {
        statusCode: HttpStatus.OK,
        message: 'Platillo encontrado',
        data: dish
      }

    } catch (error) {

      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Error al obtener el platillo');
    }
  }



}
