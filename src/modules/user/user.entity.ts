import { Auth } from "@modules/auth/entity/auth.entity";
import { Cart } from "@modules/cart/entity/cart.entity";
import { Order } from "@modules/order/entity/order.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  number?: number;

  @Column({ nullable: true })
  floor?: number;

  @Column({ nullable: true })
  contact?: number;

  @Column({ nullable: true })
  clarification?: string;

  @Column({ nullable: true })
  postal_code?: number;

  @OneToOne(() => Auth)
  @JoinColumn()
  auth: Auth;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;


  @OneToOne(() => Order, (order) => order.user)
  order: Order;

}