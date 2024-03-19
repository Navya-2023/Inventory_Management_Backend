import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/modules/auth/auth.module'
import { Product } from 'src/entities/product.entity'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
//This module provides functionality related to managing products.
@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
