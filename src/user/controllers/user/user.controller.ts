import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { User } from 'src/typeorm/entities/user.entity';
import { CreateUserParams } from 'src/user/dtos/CreateUser.dto';
import { UserService } from 'src/user/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  async getUserByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.userService.findUserByUsername(username);
    if (!user) {
      throw new NotFoundException(`User with username '${username}' not found`);
    }
    return user;
  }
  @Post()
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserParams): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }
}
