import { Category } from "@modules/category/entity/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dish {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  img: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column({ default: 0 })
  calcification: string;

  @Column({ default: false })
  promotion: string;

  @Column({ default: 0 })
  promotionAmount: string;


  @ManyToOne(() => Category, category => category.dish)
  @JoinColumn()
  category: Category;
}