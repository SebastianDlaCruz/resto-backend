import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dish {

  @PrimaryGeneratedColumn('increment')
  id: number;


  @Column()
  price: number;

}