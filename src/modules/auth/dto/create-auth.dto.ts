import { Rol } from "@common/enums";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class CreateAuthDto {

  @IsString({ message: 'name: tiene que ser una cadena de texto' })
  @IsNotEmpty({ message: 'name: campo requerido' })
  @MinLength(5, { message: 'name: debe tener al menos 5 caracteres' }) // Corregí de 15 a 5 para que sea coherente con el valor
  @MaxLength(50, { message: 'name: debe tener como máximo 50 caracteres' })
  name: string;

  @IsEmail({}, { message: 'email: debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'email: campo requerido' })
  email: string;

  @IsNotEmpty({ message: 'password: campo requerido' })
  @IsString({ message: 'password: tiene que ser una cadena de texto' })
  @MinLength(6, { message: 'password: debe tener al menos 6 caracteres' })
  @MaxLength(20, { message: 'password: debe tener como máximo 20 caracteres' })
  password: string;

  @IsString({ message: 'rol: tiene que ser una cadena de texto' })
  @IsEnum(Rol, { message: 'rol: debe ser un valor de rol válido' })
  @IsNotEmpty({ message: 'rol: campo requerido' })
  rol: Rol;


}