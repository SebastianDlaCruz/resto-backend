import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dish {

  @PrimaryGeneratedColumn('increment')
  id: number;
}