import { Dish } from "@modules/dish/entity/dish.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Category {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  img: string;

  @Unique(["name"])
  @Column()
  name: string;

  @OneToMany(() => Dish, dish => dish)
  dish: Dish[]

}