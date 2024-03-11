import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  ValidateNested,
} from 'class-validator';
import { User } from 'src/typeorm/entities/user.entity';
/**
 * DTO for creating a new product.
 *
 * a. name: string - The name of the product.
 *    Validation: Must not be empty.
 * b. description: string - The description of the product.
 *    Validation: Must not be empty.
 * c. quantity: number - The quantity of the product.
 *    Validation: Must not be empty, must be an integer, and must be greater than or equal to 1.
 * d. price: number - The price of the product.
 *    Validation: Must not be empty, must be an integer, and must be greater than or equal to 0.
 * e. createdBy: User - The user who created the product.
 */
export class CreateProductParams {
  @IsNotEmpty({ message: 'Product title cannot be empty.' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Product description cannot be empty.' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Please enter the quantity of the product.' })
  @IsInt({ message: 'Enter a valid value.' })
  @Min(1)
  quantity: number;

  @IsNotEmpty({ message: 'Please enter the price of the product.' })
  @IsInt({ message: 'Enter a valid value.' })
  @Min(0)
  price: number;

  createdBy: User;
}
