import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { User } from './entities/user.entity';
import { CreateUser } from './dto/create-user.dto';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async createUser(createUser: CreateUser): Promise<User> {
    const address = new Address(createUser.address);

    const newUser: Partial<User> = {
      address,
      ...createUser,
    };

    const user = new User(newUser);
    return this.entityManager.save(user);
  }

  async getUserById(userId: string, authorId: string): Promise<User> {
    return this.userRepository.findOneBy({
      _id: new ObjectId(userId),
      author: new ObjectId(authorId),
    });
  }

  async getAllUsers(authorId: string): Promise<User[]> {
    return this.userRepository.find({
      where: { author: new ObjectId(authorId) },
    });
  }

  async editUser(userId: string, createUser: CreateUser): Promise<User> {
    const address = new Address(createUser.address);

    const newUser: Partial<User> = {
      _id: new ObjectId(userId),
      ...createUser,
      address,
    };

    const user = new User(newUser);

    await this.deleteUser(userId);
    return this.userRepository.save(user);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userRepository.delete({ _id: new ObjectId(userId) });
  }
}
