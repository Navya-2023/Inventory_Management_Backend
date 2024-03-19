import { Product } from 'src/entities/product.entity'

export class ProductResponseDto {
  constructor(
    public status: boolean,
    public message: string,
    public errors: string[],
    public data?: Product | Product[]
  ) {}
}
