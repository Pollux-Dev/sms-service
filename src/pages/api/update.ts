// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // access the data from the body and update the database
  const data = req.body;
  // console.log('body  data: ', data);

  const updated = await prisma.account.update({
    where: {
      id: data.id,
    },
    data: {
      category: data.category,
      phone: data.phone,
      serviceProvider: data.serviceProvider,
    },
  });

  res.status(200).json({ data: 'updated' });
}
