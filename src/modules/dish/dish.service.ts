import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from './entity/dish.entity';
import { IDish } from './interface/dish.interface';

@Injectable()
export class DishService implements IDish {

  constructor(
    // Repository
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,


  ) { }

  async exist(id: number): Promise<Dish | null> {

    return this.dishRepository.findOne({
      where: {
        id
      }
    })
  }


}
