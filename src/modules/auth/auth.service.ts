import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/typeorm/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findUserByUsername(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username, role: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async getUserById(userId: number): Promise<User> {
    return await this.userService.findUserById(userId);
  }
  async decodeToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.decode(token);
      console.log(decoded)
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
