import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const prisma = new PrismaClient();

async function main() {
  await prisma.account.deleteMany({});

  const response = await fetch('http://localhost:3000/api/dummy');
  const data = await response.json();
  if (data instanceof Object && 'data' in data && Array.isArray(data.data)) {
    console.log('response: ', data);

    for (const contact of data.data) {
      const acc = await prisma.account.create({
        data: {
          category: contact.category,
          phone: String(contact.phone_number),
          serviceProvider: contact.telecom,
        },
      });

      console.log('account: ', acc.phone);
    }
  }

  if (Array.isArray(data)) {
  }

  const count = await prisma.account.count();
  console.log('count: ', count);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
