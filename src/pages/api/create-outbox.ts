// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const data = req.body;

    console.log(' crate-outbox data: ', data);

    try {
      const outbox = await prisma.sent.create({
        data: {
          message: data.message,
          status: data.status,
          noContacts: data.noContacts,
          category: data.category,
        },
      });

      console.log('outbox created -------: ', outbox);

      return res.status(200).json({ success: true, data: outbox });
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({ success: false, message: error });
    }
  }

  return res.status(404).json({ success: false, message: 'Route not found' });
}
