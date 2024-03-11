import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/typeorm/entities/user.entity';

//AuthService manages user authentication operations like signing in and token decoding.
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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
   * Returns the token.
   */
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
