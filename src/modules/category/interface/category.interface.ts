import { Category } from "../entity/category.entity";

export interface CategoryMethod {
  exist(id: number): Promise<Category>
}