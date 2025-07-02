import { IsString } from "class-validator";

export class UpdateCategoryDto {


  img: string;

  @IsString({
    message: 'El nombre tiene que ser un campo de texto'
  })
  name: string;
}