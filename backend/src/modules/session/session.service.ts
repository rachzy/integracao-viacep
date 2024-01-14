import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { EntityManager, Repository } from 'typeorm';
import { SaveSession } from './dto/save-session.dto';
import { Account } from 'src/modules/account/entities/account.entity';
import { addDays } from 'date-fns';
import { CookieSessionDto } from './dto/cookie-session.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(ipv4: string, account: Account): Promise<Session> {
    const token = randomBytes(16).toString('hex');

    const creationDate = new Date().toISOString();
    const expirationDate = addDays(Date.now(), 1).toISOString();

    const saveSession: SaveSession = {
      accountId: account._id,
      ipv4,
      token,
      creationDate,
      expirationDate,
    };
    const newSession = new Session(saveSession);

    return this.entityManager.save(newSession);
  }

  async validateSession({
    ACCOUNT_ID,
    SESSION_ID,
    SESSION_TOKEN,
  }: CookieSessionDto): Promise<boolean> {
    const session = await this.sessionRepository.findOne({
      where: {
        _id: new ObjectId(SESSION_ID),
        accountId: new ObjectId(ACCOUNT_ID),
        token: SESSION_TOKEN,
        valid: true,
      },
      relations: ['account'],
    });

    if (!session) return false;

    const { expirationDate } = session;

    const expirationTimestamp = new Date(expirationDate).getTime();

    if (expirationTimestamp < Date.now()) {
      session.valid = false;
      await this.entityManager.save(session);
      return false;
    }

    return true;
  }

  async destroySession({
    ACCOUNT_ID,
    SESSION_ID,
    SESSION_TOKEN,
  }: CookieSessionDto) {
    if (!ACCOUNT_ID || !SESSION_ID || !SESSION_TOKEN) {
      throw new BadRequestException(
        `You don't have a currently active session`,
      );
    }

    const session = await this.sessionRepository.findOneBy({
      accountId: new ObjectId(ACCOUNT_ID),
      _id: new ObjectId(SESSION_ID),
      token: SESSION_TOKEN,
    });

    if (!session) return;
    session.valid = false;
    await this.entityManager.save(session);
  }
}
