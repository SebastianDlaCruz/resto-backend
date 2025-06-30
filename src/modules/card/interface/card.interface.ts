import { Card } from "../entity/card.entity";

export interface CardMethods {
  exist(uuid: string): Promise<Card | null>
}