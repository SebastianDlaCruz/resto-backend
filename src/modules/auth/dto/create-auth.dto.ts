import { Rol } from "@common/enums";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class CreateAuthDto {

  @IsString({ message: 'email: campo requerido' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'password: campo requerido' })
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsString({ message: 'rol: campo requerido' })
  @IsEnum(Rol)
  rol: Rol


}