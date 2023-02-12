import customers from "../../../data/customers";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    id: number;
    image: string;
    name: string;
    phone: string;
    email: string;
    registration: string;
    address: string;
    longitude: number;
    latitude: number;
}[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(customers);
}
