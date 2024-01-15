import { Column, ObjectIdColumn, ObjectId, Entity } from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @ObjectIdColumn()
  author: ObjectId;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 11 })
  birthdate: string;

  @Column({ length: 128 })
  email: string;

  @Column({ length: 14 })
  phone: string;

  @Column()
  address: Address;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
