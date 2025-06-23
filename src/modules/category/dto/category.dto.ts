import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {

  img: string;

  @IsNotEmpty({
    message: 'El id es requerido'
  })
  @IsString({
    message: 'El nombre tiene que ser un cadena de texto'
  })
  name: string;
}