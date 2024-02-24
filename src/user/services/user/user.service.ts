import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { CreateUserParams } from 'src/user/dtos/CreateUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}
    findUser(){
        return this.userRepository.find();
    }
    async createUser(userDetails: CreateUserParams): Promise<User> {
        
        if (!userDetails.username || !userDetails.password || !userDetails.role) {
            throw new BadRequestException('Username, password, and role are required', '400');
        }
        const newUser = this.userRepository.create(userDetails);
        return await this.userRepository.save(newUser);
    }
}
