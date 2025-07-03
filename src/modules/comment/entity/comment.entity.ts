import { Dish } from "@modules/dish/entity/dish.entity";
import { User } from "@modules/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  comment: string;

  @Column()
  qualification: number;

  @ManyToOne(() => Dish, (dish) => dish.comment)
  @JoinColumn()
  dish: Dish;

  @ManyToOne(() => User, (user) => user.comment)
  @JoinColumn()
  user: User;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  date: Date;

}