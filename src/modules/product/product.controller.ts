import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common'
import { UUID } from 'crypto'
import { AuthGuard } from 'src/modules/auth/auth.guard'
import { RolesGuard } from '../roles/roles.guards'
import { Roles } from '../roles/roles.decorator'
import { Role } from '../roles/role.enum'
import { CreateProductParams } from './dtos/create-product.dto'
import { ProductService } from './product.service'
import { ProductResponseDto } from './dtos/product-response.dto'

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  // POST API to create a product
  /**
   * API URL: POST /products
   * This function creates a new product.
   * @param req The request object containing user information.
   * @param createProductDto The DTO containing product attributes.
   * @returns {Promise<ProductResponseDto>} The newly created product.
   * a. The function does not take any parameters.
   * b. It takes the request object 'req', which contains user information.
   * c. It takes the 'createProductDto' parameter, which is an instance of 'CreateProductParams' containing product creation parameters.
   * d. It checks if the authenticated user has the necessary role ('admin') to create a product.
   * e. It extracts the token from the request headers.
   * f. Then it calls the 'createProduct' method of the 'productService' to create a new product with the provided details.
   */
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async createProduct(
    @Request() req,
    @Body() createProductDto: CreateProductParams
  ): Promise<ProductResponseDto> {
    const token = req.headers.authorization.replace('Bearer ', '')
    return this.productService.createProduct(token, createProductDto)
  }

  /**
   * API URL: DELETE /products/:id
   * This function deletes a product by its ID.
   * @param id The ID of the product to be deleted.
   * @returns {Promise<string>} A message indicating the outcome of the deletion operation.
   * a. The function takes a parameter 'id', which specifies the ID of the product to be deleted.
   * b. It checks if the authenticated user's is role is admin to delete a product.
   * c. Then it calls the 'deleteProduct' method of the 'productService' to delete the product with the provided ID.
   * d. If the product is successfully deleted, it returns a success message.
   * e. If the product is not found, it throws a 'NotFoundException' with an appropriate error message.
   * f. If the user is not authorized to delete the product, it throws an 'UnauthorizedException' with an error message.
   * g. If any other error occurs during the deletion process, it throws an internal server error.
   */
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: UUID): Promise<ProductResponseDto> {
    return await this.productService.deleteProduct(id)
  }

  /**
   * API URL: PUT /products/:id
   * This function edits a product by its ID.
   * @param id The ID of the product to be edited.
   * @param updateProductDto The DTO contains product details.
   * @param req The request contains user information.
   * @returns {Promise<Product>} The updated product object.
   * a. The function takes parameters 'id' and 'updateProductDto', where 'id' specifies the ID of the product to be edited,
   *    and 'updateProductDto' contains the product details.
   * b. It checks if the authenticated user is an admin to edit a product.
   * c. Then it calls the 'editProduct' method of the 'productService' to edit the product with the provided ID.
   * d. If the product is successfully edited, it returns the updated product object.
   * e. If the user is not authorized to edit the product, it throws an 'UnauthorizedException' with an error message.
   */
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  async editProduct(
    @Param('id') id: UUID,
    @Body() updateProductDto: Partial<CreateProductParams>
  ): Promise<ProductResponseDto> {
    return this.productService.editProduct(id, updateProductDto)
  }

  // Get API to retrieve all products
  /**
   * API URL: GET /products
   * This function retrieves all products.
   * @returns {Promise<Product[]>} An array of all products.
   * a. The function does not take any parameters.
   * b. It checks if the authenticated user has the necessary permissions to retrieve all products.
   * c. Then it calls the 'getAllProducts' method of the 'productService' to retrieve all products.
   */
  @UseGuards(AuthGuard)
  @Get()
  async getAllProducts(): Promise<ProductResponseDto> {
    return this.productService.getAllProducts()
  }
}
