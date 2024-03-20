import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  /**
   *
   * @param context gives access to current context.
   * @returns
   * canActivate function determines if a route should be activated
   * It extracts the token from the request header using the extractTokenFromHeader method.
   * If a token is not found, it throws an UnauthorizedException, user is not authenticated.
   * Else if a token is found, it verifies the token using the verifyAsync.
   * Once the token is verified it extracts the user information (payload) from the token.
   * If the token is not verified the token will throw an UnauthorizedException with an error message.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  /**
   * Extracts the JWT token from the request header.
   * @param request The request object.
   * @returns The JWT token extracted from the request header, or undefined if no token is found found.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

