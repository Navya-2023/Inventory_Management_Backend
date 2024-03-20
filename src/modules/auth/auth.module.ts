import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { jwtConstants } from './constants'
import { AuthService } from './auth.service'
import { User } from 'src/entities/user.entity'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'

//The AuthModule is responsible for managing authentication.
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }
    }),
    UserModule
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService]
})

export class AuthModule {}

