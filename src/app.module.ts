import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './typeorm/entities/product.entity';
import { User } from './typeorm/entities/user.entity';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Navya@2001',
      database: 'inventory_management_application',
      entities: [Product, User],
      synchronize: false,
    }),
    UserModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [AppController],
 providers: [
    AppService,
    // {
    //   provide: APP_GUARD, 
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
