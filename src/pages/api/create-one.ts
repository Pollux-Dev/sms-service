// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = req.body;
  console.log(' data: ', req.body);

  const deleted = await prisma.account.create({
    data: {
      category: data.category,
      phone: data.phone,
      serviceProvider: data.serviceProvider,
    },
  });

  res.status(deleted ? 200 : 401).json({ data: 'updated' });
}
