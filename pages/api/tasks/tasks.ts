import tasks from "../../../data/tasks";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    id: number;
    pickup_name: string;
    pickup_phone: string;
    pickup_email: string;
    pickup_order: string;
    pickup_address: string;
    pickup_longitude: number;
    pickup_latitude: number;
    pickup_datetime: string;
    delivery_name: string;
    delivery_phone: string;
    delivery_email: string;
    delivery_order: string;
    delivery_address: string;
    delivery_longitude: number;
    delivery_latitude: number;
    delivery_datetime: string;
}[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(tasks);
}