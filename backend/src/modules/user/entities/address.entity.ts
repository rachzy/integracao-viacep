import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Address {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column({ length: 8 })
  cep: string;

  @Column({ length: 255 })
  street: string;

  @Column('int')
  number: number;

  @Column({ length: 64 })
  neighborhood: string;

  @Column({ length: 128, default: 'Nenhum' })
  complement?: string;

  @Column({ length: 32 })
  city: string;

  @Column({ length: 32 })
  state: string;

  constructor(address: Partial<Address>) {
    Object.assign(this, address);
  }
}
