// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Sent } from '@prisma/client';

type Data = {
  outbox: Sent[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const outbox = await prisma.sent.findMany({});

  res.status(200).json({ outbox });
}
