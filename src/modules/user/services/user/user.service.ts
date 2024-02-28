import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { CreateUserParams } from 'src/modules/user/dtos/CreateUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    //to find user by providing username and password
    findUserByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({ where: { username } });
    }

    async findUserById(id: number): Promise<User> {
        return await this.userRepository.findOne({ where: { id } });
      }
    
    //to create a new user
    async createUser(userDetails: CreateUserParams): Promise<User> {

        const existingUser = await this.userRepository.findOne({ where: { username: userDetails.username } });
        if (existingUser) {
            throw new BadRequestException('Username already exists', '400');
        }
        
        if (!userDetails.username || !userDetails.password || !userDetails.role) {
            throw new BadRequestException('Username, password, and role are required', '400');
        }
        const newUser = this.userRepository.create(userDetails);
        return await this.userRepository.save(newUser);
    }
}

