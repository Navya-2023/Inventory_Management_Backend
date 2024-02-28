import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { AuthService } from 'src/modules/auth/auth.service';
import { CreateProductParams } from '../../dtos/CreateProduct.dto';
import { ProductService } from '../../services/product/product.service';
import { Product } from 'src/typeorm/entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  
  async createProduct(
    @Request() req,
    @Body() createProductDto: CreateProductParams,
  ): Promise<Product> {
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.productService.createProduct(token, createProductDto);
  }
}
