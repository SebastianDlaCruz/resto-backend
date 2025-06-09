import { Auth } from "@modules/auth/entity/auth.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  number?: number;

  @Column({ nullable: true })
  floor?: number;

  @Column({ nullable: true })
  contact?: number;

  @Column({ nullable: true })
  clarification?: string;

  @Column({ nullable: true })
  postal_code?: number;

  @OneToOne(() => Auth)
  @JoinColumn()
  auth: Auth;

}