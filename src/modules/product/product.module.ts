import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product/product.controller';
import { ProductService } from './services/product/product.service';
import { Product } from 'src/typeorm/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
