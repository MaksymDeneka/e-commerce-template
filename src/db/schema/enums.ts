import { pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['user', 'admin']);
export const accountTypeEnum = pgEnum('type', ['email', 'google']);