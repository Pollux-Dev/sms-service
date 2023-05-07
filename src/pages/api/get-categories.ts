// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Account } from '@prisma/client';

type Data = {
  categories: Account['category'][];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const categories = await prisma.account.findMany({
    select: {
      category: true,
    },
  });

  const distinctCategories = new Set(
    categories.map((category) => category.category),
  );

  res.status(200).json({ categories: Array.from(distinctCategories.values()) });
}
