import {
  Injectable,
  PipeTransform,
  Scope,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserService } from '../user.service';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class LookForUserPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) protected readonly request: Request,
    private readonly userService: UserService,
  ) {}

  async transform(value: any) {
    const id = value;
    const { ACCOUNT_ID } = this.request.cookies;

    const task = await this.userService.getUserById(id, ACCOUNT_ID);

    if (!task) {
      throw new NotFoundException('Invalid user');
    }

    return value;
  }
}
