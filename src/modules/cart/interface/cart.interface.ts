import { Cart } from "../entity/cart.entity";

export interface CartMethods {
  exist(uuid: string): Promise<Cart | null>
}