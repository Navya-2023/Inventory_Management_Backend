import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { User } from 'src/entities/user.entity';
import { ProductValidationMessages } from '../validations/product-error-messages';
/**
 * DTO for creating a new product.
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
  @IsNotEmpty({ message: ProductValidationMessages.productTitleNotEmpty })
  @IsString()
  productTitle: string;

  @IsNotEmpty({ message: ProductValidationMessages.productDescriptionNotEmpty })
  @IsString()
  description: string;

  @IsNotEmpty({ message: ProductValidationMessages.productQuantityNotEmpty })
  @IsInt({ message: ProductValidationMessages.productQuantityIsInt })
  @Min(1, { message: ProductValidationMessages.productQuantityMin })
  quantity: number;

  @IsNotEmpty({ message: ProductValidationMessages.productPriceNotEmpty })
  @IsInt({ message: ProductValidationMessages.productPriceIsInt })
  @Min(0, { message: ProductValidationMessages.productPriceMin })
  price: number;

  createdBy: User;
}
