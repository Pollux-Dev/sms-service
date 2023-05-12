// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const data: { outbox: any[] } = req.body;

    // console.log(' crate-many data: ', data);

    try {
      await new Promise((resolve) => {
        data.outbox.forEach(async (item: any) => {
          const outbox = await prisma.outBox.create({
            data: {
              message: item.message,
              account: {
                connect: {
                  id: item.contactId,
                },
              },
            },
          });

          console.log('outbox: ', outbox);
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
