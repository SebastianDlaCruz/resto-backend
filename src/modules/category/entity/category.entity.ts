import { Dish } from "@modules/dish/entity/dish.entity";
import { IsNotEmpty, IsString } from "class-validator";
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsNotEmpty({
    message: 'La img de la categoría es requerido'
  })
  @IsString()
  img: string;

  @IsNotEmpty({
    message: 'El nombre de la categoría es requerido'
  })
  @IsString()
  name: string;

  @OneToMany(() => Dish, dish => dish)
  dish: Dish

}