import { IsNotEmpty, IsNumber, IsString, IsUUID, Max, MaxLength, Min } from "class-validator";

export class CreateCommentDto {

  @IsNotEmpty({ message: 'La calificación es requerida' })
  @IsNumber({ maxDecimalPlaces: 1 }, {
    message: 'La calificación debe ser un número (puede contener un decimal)'
  })
  @Min(1, { message: 'La calificación mínima es 1' })
  @Max(5, { message: 'La calificación máxima es 5' })
  qualification: number;

  @IsNotEmpty({ message: 'El comentario es requerido' })
  @IsString({ message: 'El comentario debe ser un texto' })
  @MaxLength(50, { message: 'El comentario no puede exceder los 50 caracteres' })
  comment: string;

  @IsNotEmpty({ message: 'El id del platillo es requerido' })
  @IsNumber({}, { message: 'El id del platillo debe ser un número' })
  dishId: number;

  @IsNotEmpty({ message: 'El uuid del usuario es requerido' })
  @IsUUID('4', { message: 'El uuid del usuario debe ser un UUID válido' })
  userUuid: string;
}