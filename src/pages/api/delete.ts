// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(' data: ', req.query);

  const deleted = await prisma.account.delete({
    where: {
      id: req.query.id as string,
    },
  });

  res.status(deleted ? 200 : 401).json({ data: 'updated' });
}
