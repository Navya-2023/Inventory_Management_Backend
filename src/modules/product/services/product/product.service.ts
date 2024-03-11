import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  ): Promise<Product> {
    const decodedUser = await this.authService.decodeToken(token);
    if (!decodedUser) {
      throw new NotFoundException('User not found in token');
    }
    const createdBy = decodedUser.sub;
    const existingProductByName = await this.productRepository.findOne({
      where: { name: productDetails.name },
    });
    if (existingProductByName) {
      throw new ConflictException(
        'A product with the same name already exists',
      );
    }
    const newProduct = this.productRepository.create({
      ...productDetails,
      createdBy: createdBy,
    });
    return await this.productRepository.save(newProduct);
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

  /**
   * Retrieves all products from the database.
   * @returns An array of products.
   * a. Retrieve all products using find method.
   * b. Return the array of products.
   */
  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
