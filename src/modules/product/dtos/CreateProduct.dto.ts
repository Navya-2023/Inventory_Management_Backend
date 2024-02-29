import { User } from "src/typeorm/entities/user.entity";

export type CreateProductParams={
  name: string;
  description: string;
  quantity: number;
  price: number;
  createdBy: User;
}
