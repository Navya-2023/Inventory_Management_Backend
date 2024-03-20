import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { decodePassword } from 'src/utils/bcrypt.utils';
import { SigninDto } from './dtos/signInDto.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { config } from 'src/config/messages/config';

//AuthService manages user authentication operations like signing in and token decoding.
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * signIn - authenticate user by verifying the username and password
   * @param username username of the user.
   * @param password password provided by the user on registration.
   * @returns token -containing information about the user.
   * Retrieves the user with the provided username from the database.
   * Then checks whether the user exists and if the password matches with the provided password.
   * It throws an UnauthorizedException if the provided username does not exist or if the password does not match.
   * If a user exist and password matches it generates a payload containing the information of the user such as id ,username and role.
   * Returns the token
   */
  async signIn(signInDto: SigninDto): Promise<{ access_token: string }> {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || decodePassword(password, user.password) === false) {
      throw new UnauthorizedException(config.invalidEmailPassword);
    }
    const payload = {
      sub: user.id,
      username: user.userName,
      role: user.userRole,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  /**
   * decodeToken - to decode the user information  from the token.
   * @param token
   * @returns decoded token
   * decodes the token using a method decode.
   * Then returns the decoded information.
   * Throw an UnauthorizedException if decoding fails
   */
  async decodeToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.decode(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
