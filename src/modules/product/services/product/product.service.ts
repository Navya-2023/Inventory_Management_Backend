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
    // @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async createProduct(
    token: string,
    productDetails: CreateProductParams,
  ): Promise<Product> {
    const decodedUser = await this.authService.decodeToken(token);
    console.log(decodedUser)
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
  // async createProduct(token: string, productDetails: CreateProductParams): Promise<Product> {
  //   const decodedUser = await this.authService.decodeToken(token);
  //   if (!decodedUser) {
  //     throw new NotFoundException('User not found in token');
  //   }

  //   //const createdBy = decodedUser.sub;

  //   const newProduct = this.productRepository.create({
  //     ...productDetails,
  //     createdBy: decodedUser,
  //   });
  //   return await this.productRepository.save(newProduct);
  // }
}
