import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

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
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  /**
   * Retrieves the user profile.
   * API URL: GET /auth/profile
   * @param req Bearer token
   * @returns User profile information.
   */
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
