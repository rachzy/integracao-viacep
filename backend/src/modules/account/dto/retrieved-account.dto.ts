import { ObjectId } from 'typeorm';

export const RetrievedAccount = {
  _id: true,
  email: true,
  username: true,
  lastAuthentication: true,
  lastConnection: true,
};

export class RetrievedAccountDto {
  _id: ObjectId;
  email: string;
  username: string;
  lastAuthentication: string;
  lastConnection: string;
}
