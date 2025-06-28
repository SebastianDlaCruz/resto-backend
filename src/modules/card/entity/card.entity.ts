import { CardeEnum } from "@common/enums";
import { ItemCart } from "@modules/cart/entity/item-cart.entity";
import { Order } from "@modules/order/entity/order.entity";
import { User } from "@modules/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Card {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => User, user => user)
  @JoinColumn()
  user: User;


  @OneToMany(() => ItemCart, (item) => item)
  items: ItemCart[]

  @Column({ name: 'type', type: 'enum', enum: CardeEnum })
  type: CardeEnum;

  @Column()
  username: string;

  @Column()
  expiration_date: Date;

  @Column()
  cvv: number;


  @OneToOne(() => Order, (order) => order.card)
  order: Order;
}