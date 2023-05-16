// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(
    ' GET_URL -------------> ',
    'body: ',
    req.body,
    'query string: ',
    req.query,
    'req Obj: ',
    req,
  );
  res.status(200);
}
