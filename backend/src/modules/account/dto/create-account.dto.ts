import { Account } from '../entities/account.entity';

export type createAccount = Pick<Account, 'email' | 'username' | 'password'>;
