import { Dish } from "@modules/dish/entity/dish.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class ItemCart {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Dish, (dish) => dish.itemCart)
  @JoinColumn()
  dish: Dish

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn()
  cart: Cart;

  @Column()
  count: number;

  @Column()
  total: number;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  dateOfAddition: Date;

}