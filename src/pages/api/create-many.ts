// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const data: { contacts: any[] } = req.body;

    // console.log(' crate-many data: ', data);

    try {
      await new Promise((resolve) => {
        data.contacts.forEach(async (contact: any) => {
          const newAccount = await prisma.account.create({
            data: {
              category: contact.category,
              phone: String(contact.phone_number),
              serviceProvider: contact.telecom,
            },
          });
        });
        resolve({});
      });

      return res.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: 'Error creating data' });
    }
  }

  return res.status(404).json({ success: false, message: 'Route not found' });
}
