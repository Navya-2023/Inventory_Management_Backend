import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { AuthService } from 'src/modules/auth/auth.service';
import { Product } from 'src/entities/product.entity';
import { CreateProductParams } from './dtos/create-product.dto';
import { ProductResponseDto } from './dtos/product-response.dto';
import { productResponseMessages } from './products.constant';
import { userResponseMessages } from '../user/user.constants';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private authService: AuthService,
  ) {}

  /**
   * Adds a new product to the database.
   * @param token The authentication token.
   * @param productDetails The details of the product to be added.
   * @returns The newly created product.
   * a. Decode the user from the authentication token.
   * b. If the decoded user is null, throw a NotFoundException.
   * c. Extract the user ID from the decoded user.
   * d. Check if a product with the same name already exists in the database.
   * e. If a product with the same name exists, throw a ConflictException.
   * f. Create a new product  with the provided details and set the createdBy field to the user ID.
   * g. Save the new product to the database.
   * h. Return the newly created product.
   */

  async createProduct(
    token: string,
    productDetails: CreateProductParams,
  ): Promise<ProductResponseDto> {
    const decodedUser = await this.authService.decodeToken(token);
    if (!decodedUser) {
      throw new NotFoundException(userResponseMessages.userNotFound);
    }
    const createdBy = decodedUser.id;
    const existingProductByName = await this.productRepository.findOne({
      where: { productTitle: productDetails.productTitle },
    });
    if (existingProductByName) {
      throw new ConflictException(productResponseMessages.alreadyExists);
    }
    try {
      const newProduct = this.productRepository.create({
        ...productDetails,
        createdBy: createdBy,
      });
      const createdProduct = await this.productRepository.save(newProduct);
      return new ProductResponseDto(
        true,
        productResponseMessages.productCreated,
        [],
        createdProduct,
      );
    } catch (error) {
      return new ProductResponseDto(
        false,
        productResponseMessages.failedToCreate,
        [error.message],
      );
    }
  }

  /**
   * Deletes a product from the database.
   * @param id The ID of the product to be deleted.
   * @returns void
   * @throws NotFoundException if the product with the given ID is not found.
   * a. Find the product with the provided ID in the database using productRepository.findOne method.
   * b. If the product is not found, throw a NotFoundException with the message 'Product with ID {id} not found'.
   * c. Store the name and ID of the product for logging purposes.
   * d. Remove the product from the database using productRepository.remove method.
   * e. Log a success message indicating the deletion of the product with its name and ID.
   */

  async deleteProduct(id: UUID): Promise<ProductResponseDto> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException(productResponseMessages.notFound);
      }
      await this.productRepository.remove(product);
      return new ProductResponseDto(true, productResponseMessages.success, []);
    } catch (error) {
      return new ProductResponseDto(
        false,
        productResponseMessages.failedToDelete,
        [error.message],
      );
    }
  }
  /**
   * Updates an existing product in the database.
   * @param id The ID of the product to be updated.
   * @param updateProductDto The updated details of the product.
   * @returns The updated product.
   * @throws NotFoundException if the product with the given ID is not found.
   * a. Retrieve the product from the database by its ID using the productRepository.findOne method.
   * b. If the product is not found, throw a NotFoundException with the message 'Product with ID {id} not found'.
   * c. Merge the existing product with the updated details provided in the updateProductDto using Object.assign.
   * d. Save the updated product to the database using the productRepository.save method.
   * e. Return the updated product.
   */

  async editProduct(
    id: UUID,
    updateProductDto: Partial<CreateProductParams>,
  ): Promise<ProductResponseDto> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException(productResponseMessages.notFound);
      }
      Object.assign(product, updateProductDto);
      const updatedProduct = await this.productRepository.save(product);
      return new ProductResponseDto(
        true,
        productResponseMessages.success,
        [],
        updatedProduct,
      );
    } catch (error) {
      return new ProductResponseDto(
        false,
        productResponseMessages.failedToUpdate,
        [error.message],
      );
    }
  }

  /**
   * Retrieves all products from the database.
   * @returns An array of products.
   * a. Retrieve all products using find method.
   * b. Return the array of products.
   */

  async getAllProducts(): Promise<ProductResponseDto> {
    try {
      const products = await this.productRepository.find();
      return new ProductResponseDto(
        true,
        productResponseMessages.success,
        [],
        products,
      );
    } catch (error) {
      return new ProductResponseDto(
        false,
        productResponseMessages.failedToFetchProducts,
        [error.message],
      );
    }
  }
}
