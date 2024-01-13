import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Session {
  @ObjectIdColumn()
  _id: ObjectId;

  @ObjectIdColumn()
  accountId: ObjectId;

  @Column({ length: 255 })
  token: string;

  @Column({ length: 16 })
  ipv4: string;

  @Column('timestamp with time zone')
  creationDate: string;

  @Column('timestamp with time zone')
  expirationDate: string;

  @Column('boolean', { default: true })
  valid: boolean = true;

  constructor(session: Partial<Session>) {
    Object.assign(this, session);
  }
}
