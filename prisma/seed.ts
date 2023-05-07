import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
// import mui from 'mui-tel-input';
import { isValidPhoneNumber } from 'libphonenumber-js';

const prisma = new PrismaClient();

async function main() {
  await prisma.account.deleteMany({});

  const response = await fetch('http://localhost:3000/api/dummy');
  const data: unknown = await response.json();

  if (
    data instanceof Object &&
    'contacts' in data &&
    Array.isArray(data.contacts)
  ) {
    const contacts = data.contacts.slice(0, 20);

    for (const contact of contacts) {
      const acc = await prisma.account.create({
        data: {
          category: contact.category,
          phone: String(contact.phone_number),
          serviceProvider: contact.telecom,
          isCorrect: isValidPhoneNumber(String(contact.phone_number), 'ET'),
        },
      });

      console.log(
        'account: ',
        contact.phone_number,
        isValidPhoneNumber(String(contact.phone_number), 'ET'),
      );
    }
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
