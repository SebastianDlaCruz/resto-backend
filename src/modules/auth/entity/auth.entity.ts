import { Rol } from "@common/enums";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'rol', type: 'enum', enum: Rol, default: Rol.USER, nullable: false })
  rol: Rol;

} 