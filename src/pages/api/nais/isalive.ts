import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    message: string;
};

// NAIS configuration
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({ message: 'OK' });
}
