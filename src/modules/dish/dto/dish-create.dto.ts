import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DishCreateDto {
  /* 
    @IsNotEmpty({ message: 'La imagen no puede estar vacía' })
    @IsString({ message: 'La imagen debe ser una cadena de texto' }) */
  img: string;

  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name: string;

  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  description: string;

  @IsNotEmpty({ message: 'El precio no puede estar vacío' })
  @IsString({ message: 'El precio debe ser un texto válido' })
  price: string;

  @IsOptional()
  @IsString({ message: 'El monto de promoción debe ser un text válido' })
  promotionAmount: string;

  @IsOptional()
  @IsString({ message: 'la promoción debe ser un texto' })
  promotion: string;

  @IsOptional()
  @IsString({ message: 'la calificación debe ser un texto' })
  calcification: string;


  @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
  @IsString({ message: 'El ID de categoría debe ser una cadena  de texto' })
  categoryId: string;
}