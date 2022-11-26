import type { NextApiRequest, NextApiResponse } from 'next'
import cache from "../../../lib/cache/cache";

type Data = {
  message: string
}

// NAIS configuration
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

  res.status(cache.isReady() ? 200 : 500).end()
}