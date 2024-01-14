import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  Req,
  UseGuards,
  UsePipes,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ZodValidationPipe } from 'src/pipes/zodValidation.pipe';
import { createUserPipe } from './pipes/createUser.pipe';
import { CreateUser, CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { ObjectId } from 'mongodb';
import { LookForUserPipe } from './pipes/lookForUser.pipe';
import { parseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UsePipes(new ZodValidationPipe(createUserPipe))
  async createUser(@Req() request: Request, @Body() user: CreateUserDto) {
    const { ACCOUNT_ID } = request.cookies;

    const createUser: CreateUser = {
      author: new ObjectId(ACCOUNT_ID),
      ...user,
    };

    return await this.userService.createUser(createUser);
  }

  @Get('get')
  async getUser(
    @Req() request: Request,
    @Query('id', parseObjectIdPipe, LookForUserPipe) userId: string,
  ) {
    const { ACCOUNT_ID } = request.cookies;
    return await this.userService.getUserById(userId, ACCOUNT_ID);
  }

  @Get('getAll')
  async getAllUsers(@Req() request: Request) {
    const { ACCOUNT_ID } = request.cookies;
    return await this.userService.getAllUsers(ACCOUNT_ID);
  }

  @Put('edit')
  async editUser(
    @Query('id', parseObjectIdPipe, LookForUserPipe) userId: string,
    @Body(new ZodValidationPipe(createUserPipe)) updatedUser: CreateUserDto,
    @Req() request: Request,
  ) {
    const { ACCOUNT_ID } = request.cookies;

    const user: CreateUser = {
      author: new ObjectId(ACCOUNT_ID),
      ...updatedUser,
    };

    return await this.userService.editUser(userId, user);
  }

  @Delete('delete')
  async deleteUser(
    @Query('id', parseObjectIdPipe, LookForUserPipe) userId: string,
  ) {
    await this.userService.deleteUser(userId);
    return {
      message: 'User successfully deleted',
    };
  }
}
