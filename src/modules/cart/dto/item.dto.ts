import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class ItemDto {

  @IsInt()
  @IsNotEmpty({ message: 'El uuid de platillo es requerido' })
  idDish: number;

  @IsInt({ message: 'La cantidad tiene que ser un numero entero' })
  @IsNotEmpty({ message: 'La cantidad es requerida' })
  count: number;

  @IsNumber()
  @IsNotEmpty({ message: 'El total  es requerida' })
  total: number;
}