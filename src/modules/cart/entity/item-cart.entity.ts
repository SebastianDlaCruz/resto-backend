import { Dish } from "@modules/dish/entity/dish.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class ItemCart {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToMany(() => Dish, (dish) => dish)
  @JoinTable()
  dishes: Dish[]

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @Column()
  count: number;

  @Column()
  total: number;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  dateOfAddition: Date;

}