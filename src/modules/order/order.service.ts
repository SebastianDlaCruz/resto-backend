import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) { }


  async create(order: OrderDto) {

    try {

      const newOrder = this.orderRepository.create(order);

      await this.orderRepository.save(newOrder);

    } catch (error) {

    }
  }
}
