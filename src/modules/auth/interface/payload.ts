import { Rol } from "@common/enums";

export interface Payload {
  email: string;
  sub: string;
  rol: Rol;
}


export interface PayloadAuth {
  token: string;
  sub: string;
}