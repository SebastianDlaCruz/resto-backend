import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min, MinLength } from "class-validator";

export class UserDto {

  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre de usuario no debe estar vacío' })
  @MinLength(8, { message: 'El nombre de usuario debe tener al menos 8 caracteres' })
  username: string;

  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La dirección no debe estar vacía' })
  @MinLength(8, { message: 'La dirección debe tener al menos 8 caracteres' })
  address: string;

  @IsNotEmpty({ message: 'El número no debe estar vacío' })
  @IsInt({ message: 'El número debe ser un valor entero' })
  @Min(1000, { message: 'El número debe tener al menos 4 dígitos' })
  number: number;

  @IsNumber({}, { message: 'El piso debe ser un número' })
  @IsNotEmpty({ message: 'El piso no debe estar vacío' })
  @Min(1, { message: 'El piso mínimo es 1' })
  @Max(99, { message: 'El piso máximo es 99' })
  floor: number;

  @IsInt({ message: 'El contacto debe ser un número entero' })
  @IsNotEmpty({ message: 'El contacto no debe estar vacío' })
  @Min(10000000, { message: 'El contacto debe tener exactamente 8 dígitos' }) // Mínimo 8 dígitos
  @Max(99999999, { message: 'El contacto debe tener exactamente 8 dígitos' }) // Máximo 8 dígitos
  contact: number;

  @IsNotEmpty({ message: 'La aclaración no debe estar vacía' })
  @IsString({ message: 'La aclaración debe ser una cadena de texto' })
  @MinLength(12, { message: 'La aclaración debe tener al menos 12 caracteres' })
  clarification: string;

  @IsNotEmpty({ message: 'El código postal no debe estar vacío' })
  @IsInt({ message: 'El código postal debe ser un número entero' })
  @Min(1000, { message: 'El código postal debe tener exactamente 4 dígitos' }) // Mínimo 1000 (4 dígitos)
  @Max(9999, { message: 'El código postal debe tener exactamente 4 dígitos' }) // Máximo 9999 (4 dígitos)
  postal_code: number; // Cambiado de string a number (ya que es un número)
}