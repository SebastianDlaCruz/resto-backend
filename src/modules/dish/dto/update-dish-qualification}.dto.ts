import { IsString, Max, Min } from "class-validator";

export class UpdateDishQualificationDto {
  @IsString({
    message: 'calificación debe ser un número'
  })
  @Min(0, {
    message: 'calificación no puede ser menor que 0'
  })
  @Max(5, {
    message: 'calificación no puede ser mayor que 5'
  })
  qualification: string;
}