import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { User } from 'src/entities/user.entity';
import { productValidationMessages } from '../validations/product-error-messages';

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
  @IsNotEmpty({ message: productValidationMessages.productTitleNotEmpty })
  @IsString()
  productTitle: string;

  @IsNotEmpty({ message: productValidationMessages.productDescriptionNotEmpty })
  @IsString()
  description: string;

  @IsNotEmpty({ message: productValidationMessages.productQuantityNotEmpty })
  @IsInt({ message: productValidationMessages.productQuantityIsInt })
  @Min(1, { message: productValidationMessages.productQuantityMin })
  quantity: number;

  @IsNotEmpty({ message: productValidationMessages.productPriceNotEmpty })
  @IsInt({ message: productValidationMessages.productPriceIsInt })
  @Min(0, { message: productValidationMessages.productPriceMin })
  price: number;

  createdBy: User;
}
