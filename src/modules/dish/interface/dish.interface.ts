import { Dish } from "../entity/dish.entity";

export interface IDish {
  exist: (id: number) => Promise<Dish | null>
  getDishByComment(id: number): Promise<Dish | null>
  updateQuality(id: number, qualification: string): Promise<void>
}