import { ObjectId } from 'typeorm';

export class CreateUserDto {
  name: string;
  email: string;
  cpf: string;
  birthDate: Date;
  phone: string;
  address: {
    cep: string;
    street: string;
    number: number;
    neighborhood: string;
    complement?: string;
    city: string;
    state: string;
  };
}

export class CreateUser extends CreateUserDto {
  author: ObjectId;
}
