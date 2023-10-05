import { PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const hashedPassword =
  '$2a$12$77NK1cuwhri3H.PV6g8IEu8JC18DTkZyssmKIEBFM5jg1pP8/7xqm'; // Mot de passe : password

async function insertAdmin() {
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
    },
  });

  // eslint-disable-next-line no-console
  console.log('admin inserted');
}

async function insertUsers() {
  const email1 = 'user@example.com';
  const email2 = 'user1@example.com';
  const email3 = 'user2@example.com';

  const user1 = await prisma.user.create({
    data: {
      email: email1,
      password: hashedPassword,
      role: 'USER',
      firstname: 'Jack',
      lastname: 'Doe',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: email2,
      password: hashedPassword,
      role: 'USER',
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: email3,
      password: hashedPassword,
      role: 'USER',
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
    },
  });
  return [user1, user2, user3];

  // eslint-disable-next-line no-console
  console.log('users inserted');
}

async function resetDB() {
  await prisma.user.deleteMany({});

  // eslint-disable-next-line no-console
  console.log('database reset');
}

async function main() {
  await resetDB();
  await insertAdmin();
  const users = await insertUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
