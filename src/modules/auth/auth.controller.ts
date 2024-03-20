import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signInDto.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Performs user authentication and returns an authentication token.
   * API URL: POST /auth/login
   * @param signInDto Contains user credentials
   * @returns Authentication token.
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SigninDto):Promise<{ access_token: string }> {
    return this.authService.signIn(signInDto);
  }
}

