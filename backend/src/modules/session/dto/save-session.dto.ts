import { Session } from '../../session/entities/session.entity';

export type SaveSession = Omit<Session, '_id' | 'valid'>;
