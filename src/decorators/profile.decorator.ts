import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Profile = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.session?.profile || false;
    return user;
  },
);
