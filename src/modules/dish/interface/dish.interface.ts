import { Dish } from "../entity/dish.entity";

export interface IDish {
  exist: (id: number) => Promise<Dish | null>
}