// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Account } from '@prisma/client';

type Data = {
  contacts: Account[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const contacts = await prisma.account.findMany({});

  console.log('contact data: ', contacts[0].isCorrect);

  res.status(200).json({ contacts });
}
