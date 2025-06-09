import { CardeEnum } from "@common/enums";
import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty, Max, Min, MinLength } from "class-validator";

export class CardDto {

  @IsNotEmpty({ message: 'El tipo de tarjeta no puede estar vacío' })
  @IsEnum(CardeEnum, { message: 'El tipo de tarjeta no es válido' })
  type: CardeEnum;

  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
  @MinLength(12, { message: 'El nombre y apellido debe tener al menos 12 caracteres' })
  username: string;

  @Transform(({ value }) => new Date(value as string))
  @IsDate({ message: 'La fecha de expiración debe ser una fecha válida' })
  @IsNotEmpty({ message: 'La fecha de expiración no puede estar vacía' })
  expiration_date: Date;

  @IsNotEmpty({ message: 'El CVV no puede estar vacío' })
  @Min(100, { message: 'El CVV debe ser mayor o igual a 100' })
  @Max(999, { message: 'El CVV debe ser menor o igual a 999' })
  @IsInt({ message: 'El CVV debe ser un número entero' })
  cvv: number;



}