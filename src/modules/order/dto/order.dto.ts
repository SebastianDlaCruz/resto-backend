import { IsNotEmpty, IsString } from "class-validator";

export class OrderDto {

  @IsString({
    message: 'El uuid del usuario es requerido'
  })
  @IsNotEmpty({
    message: 'El uuid del usuario es requerido'
  })
  userUuid: string;

  @IsString({
    message: 'El uuid del carrito es requerido'
  })
  @IsNotEmpty({
    message: 'El uuid del carrito es requerido'
  })
  cartUuid: string;

  @IsString({
    message: 'El uuid de la tarjeta es requerido'
  })
  @IsNotEmpty({
    message: 'El uuid de la tarjeta es requerido'
  })
  cardUuid: string;

}