import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
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

  //post api to create product
  @UseGuards(AuthGuard)
  @Post()
  async createProduct(
    @Request() req,
    @Body() createProductDto: CreateProductParams,
  ): Promise<Product> {
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException('You do not have permission to create a product.');
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.productService.createProduct(token, createProductDto);
  }

  //post api to delete product
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number, @Request() req): Promise<any> {
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException('You do not have permission to create a product.');
    }
    await this.productService.deleteProduct(id);
    return `Product with ID ${id} deleted successfully`;
  }

  //post api to delete product
  @UseGuards(AuthGuard)
  @Put(':id')
  async editProduct(
    @Param('id') id: number,
    @Body() updateProductDto: Partial<CreateProductParams>,
    @Request() req,
  ): Promise<Product> {
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException('You do not have permission to create a product.');
    }
    return this.productService.editProduct(id, updateProductDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }
}
