import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction, request } from 'express';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class AuthMiddlewayre implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers?.sessionid) {
      const sessionId: string = req.headers.sessionid as string;
      req['session'] = await this.authService.getSessionById(sessionId);
    }
    next();
  }
}
