import { Session } from 'next-auth';
import { UserSchema } from './schemas/user';

export const sessionHasRights = (
  session: Session | null,
  resourceAuthor: UserSchema,
): session is Session =>
  session !== null &&
  session.user.verified &&
  (session.user.role !== 'USER' || session.user.id === resourceAuthor.id);

export const isSessionAdmin = (session: Session | null): session is Session =>
  session !== null && session.user.role === 'ADMIN';
