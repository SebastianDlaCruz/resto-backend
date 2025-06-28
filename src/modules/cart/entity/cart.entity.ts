import { Order } from "@modules/order/entity/order.entity";
import { User } from "@modules/user/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ItemCart } from "./item-cart.entity";

@Entity()
export class Cart {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @OneToMany(() => ItemCart, (ItemCart) => ItemCart.cart)
  items: ItemCart[];

  @OneToOne(() => Order, (order) => order.cart)
  order: Order

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  total: number;

}