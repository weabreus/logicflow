import drivers from "../../../data/driver";

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  device: string,
  version: string,
  status: boolean,
  image: string
}[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(drivers)
}
