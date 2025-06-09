import { User } from "@modules/user/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ItemCart } from "./item-cart.entity";

@Entity()
export class Cart {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @OneToMany(() => ItemCart, (ItemCart) => ItemCart)
  @JoinColumn()
  items: ItemCart[];


  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  total: number;
}