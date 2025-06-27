import { IsInt, IsNotEmpty } from "class-validator";

export class ItemDto {

  @IsInt()
  @IsNotEmpty({ message: 'El uuid de platillo es requerido' })
  idDish: number;

  @IsInt({ message: 'La cantidad tiene que ser un numero entero' })
  @IsNotEmpty({ message: 'La cantidad es requerida' })
  count: number;

}