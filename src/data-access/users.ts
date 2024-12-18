import prisma from '@/db/prisma';

export async function createUser(email: string) {
  const user = await prisma.users.create({
    data: {
      email,
    },
  });
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });
  return user;
}
