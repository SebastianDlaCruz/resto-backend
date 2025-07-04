import { ItemCart } from "@modules/cart/entity/item-cart.entity";
import { Category } from "@modules/category/entity/category.entity";
import { Comment } from "@modules/comment/entity/comment.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ default: '0' })
  qualification: string;

  @Column({ default: 'false' })
  promotion: string;

  @Column({ default: '0' })
  promotionAmount: string;


  @ManyToOne(() => Category, category => category.dish)
  @JoinColumn()
  category: Category;

  @OneToMany(() => ItemCart, itemCart => itemCart.dish)
  itemCart: ItemCart[];

  @OneToMany(() => Comment, (comment) => comment.dish)
  comment: Comment[]

}