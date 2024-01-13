import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Account {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({
    length: 64,
  })
  username: string;

  @Column({
    length: 128,
  })
  email: string;

  @Column({
    length: 255,
  })
  password: string;

  @Column('timestamp with time zone', { default: 'NOW()' })
  lastAuthentication: string;

  @Column('timestamp with time zone', { default: 'NOW()' })
  lastConnection: string;

  constructor(account: Partial<Account>) {
    Object.assign(this, account);
  }
}
