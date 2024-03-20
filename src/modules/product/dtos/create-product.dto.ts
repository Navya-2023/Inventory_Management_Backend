import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator'
import { config } from 'src/config/messages/config'
import { User } from 'src/entities/user.entity'

// DTO for creating a new product.
export class CreateProductParams {
  
  @IsNotEmpty({ message: config.productTitleNotEmpty })
  @IsString()
  productTitle: string

  @IsNotEmpty({ message: config.productDescriptionNotEmpty })
  @IsString()
  description: string

  @IsNotEmpty({ message: config.productQuantityNotEmpty })
  @IsInt({ message: config.productQuantityIsInt })
  @Min(1, { message: config.productQuantityMin })
  quantity: number

  @IsNotEmpty({ message: config.productPriceNotEmpty })
  @IsInt({ message: config.productPriceIsInt })
  @Min(0, { message: config.productPriceMin })
  price: number

  createdBy: User
}

