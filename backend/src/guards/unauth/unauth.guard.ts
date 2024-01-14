import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { SessionService } from 'src/modules/session/session.service';

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest() as Request;

    const { ACCOUNT_ID, SESSION_ID, SESSION_TOKEN } = request.cookies;

    if (!ACCOUNT_ID && !SESSION_ID && !SESSION_TOKEN) {
      return true;
    }

    const validSession = await this.sessionService.validateSession({
      ACCOUNT_ID,
      SESSION_ID,
      SESSION_TOKEN,
    });

    if (!validSession) {
      await this.sessionService.destroySession({
        ACCOUNT_ID,
        SESSION_ID,
        SESSION_TOKEN,
      });
      return true;
    }

    throw new UnauthorizedException(
      `You have to logout in order to use this resource!`,
    );
  }
}
