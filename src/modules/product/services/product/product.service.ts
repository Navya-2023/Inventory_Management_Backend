import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/modules/auth/auth.service';
import { CreateProductParams } from '../../dtos/CreateProduct.dto';
import { Product } from 'src/typeorm/entities/product.entity';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private authService: AuthService,
  ) {}

  //to add product
  async createProduct(
    token: string,
    productDetails: CreateProductParams,
  ): Promise<Product> {
    const decodedUser = await this.authService.decodeToken(token);
    console.log(decodedUser);
    if (!decodedUser) {
      throw new NotFoundException('User not found in token');
    }

    const createdBy = decodedUser.sub;
    console.log(decodedUser);
    const newProduct = this.productRepository.create({
      ...productDetails,
      createdBy: createdBy,
    });
    return await this.productRepository.save(newProduct);
  }

  //to delete product
  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const productName = product.name;
    const productId = product.id;
    await this.productRepository.remove(product);
    console.log(
      'Product ',
      productName,
      ' with ID',
      productId,
      'deleted successfully',
    );
  }

  //to update product
  async editProduct(
    id: number,
    updateProductDto: Partial<CreateProductParams>,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }
}
