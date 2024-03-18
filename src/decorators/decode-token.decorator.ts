import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DecodeUser = createParamDecorator(
  async (_, ctx: ExecutionContext) => {
    const authService = ctx.switchToHttp().getRequest().authService; 

    const token = ctx
      .switchToHttp()
      .getRequest()
      .headers.authorization?.replace('Bearer ', '');
    if (!token || !authService) {
      return null;
    }

    return authService.decodeToken(token);
  },
);
