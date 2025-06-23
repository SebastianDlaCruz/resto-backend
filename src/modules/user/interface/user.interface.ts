import { Auth } from "@modules/auth/entity/auth.entity";
import { User } from "../user.entity";

export interface IUser {
  create: (auth: Auth) => Promise<void>;
  exist: (uuid: string) => Promise<User | null>
}