import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { CreateUserParams } from 'src/modules/user/dtos/CreateUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  //to find user by providing username and password
  findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  //to create a new user
  async createUser(userDetails: CreateUserParams): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { username: userDetails.username },
    });
    if (existingUser) {
      throw new BadRequestException('Username already exists', '400');
    }

    // if (!userDetails.username || !userDetails.password || !userDetails.roles) {
    //     throw new BadRequestException('Username, password, and role are required', '400');
    // }
    const newUser = this.userRepository.create(userDetails);
    return await this.userRepository.save(newUser);
  }

  async editUser(id: number, updateUserDto: CreateUserParams): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found`);
    }
    await this.userRepository.remove(user);
    console.log('User with ID ', id, ' has been deleted successfully');
  }
}
