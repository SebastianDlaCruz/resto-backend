import { Card } from "@modules/card/entity/card.entity";
import { Cart } from "@modules/cart/entity/cart.entity";
import { User } from "@modules/user/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @OneToOne(() => Cart, (cart) => cart.order)
  @JoinColumn()
  cart: Cart;

  @OneToOne(() => User, (user) => user.order)
  @JoinColumn()
  user: User;

  @OneToOne(() => Card, (card) => card.order)
  @JoinColumn()
  card: Card;


  @Column({ default: () => "CURRENT_TIMESTAMP" })
  date: Date;


}