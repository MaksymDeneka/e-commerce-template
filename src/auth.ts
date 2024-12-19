import prisma from './db/prisma';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { getSessionToken } from './lib/session';

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15;
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;

//PLACE SOMEWHERE ELSE ///////////////////////////////////////////////////
interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
}

interface User {
  id: string;
  email: string;
}
//////////////////////////////////////////////////////////////////////////

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(token: string, userId: string): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
  };
  // await database.insert(sessions).values(session);
  await prisma.sessions.create({
    data: session,
  });
  return session;
}

export async function validateRequest(): Promise<SessionValidationResult> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return { session: null, user: null };
  }
  return validateSessionToken(sessionToken);
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const sessionInDb = await prisma.sessions.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!sessionInDb) {
    return { session: null, user: null };
  }

  if (Date.now() >= sessionInDb.expiresAt.getTime()) {
    await prisma.sessions.delete({
      where: {
        id: sessionInDb.id,
      },
    });
    return { session: null, user: null };
  }

  const user = await prisma.users.findUnique({
    where: {
      id: sessionInDb.userId,
    },
  });

  if (!user) {
    await prisma.sessions.delete({
      where: {
        id: sessionInDb.id,
      },
    });
    return { session: null, user: null };
  }

  if (Date.now() >= sessionInDb.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS) {
    const updatedExpiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);

    await prisma.sessions.update({
      where: {
        id: sessionInDb.id,
      },
      data: {
        expiresAt: updatedExpiresAt,
      },
    });

    sessionInDb.expiresAt = updatedExpiresAt;
  }

  return { session: sessionInDb, user };
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
