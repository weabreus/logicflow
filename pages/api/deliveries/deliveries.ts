import clientPromise from "../../../lib/mongodb";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = await clientPromise;
  const db = client.db("logicflow");

  switch (req.method) {
    case "POST":    
      let bodyObject = req.body;
      let delivery = await db.collection("deliveries").insertOne(bodyObject);
      res.json({
        delivery: delivery.insertedId,
        message: `The delivery with id ${delivery.insertedId} was created in the deliveries collection.`
      });
      break;
    case "GET":
      const allDeliveries = await db.collection("deliveries").find({}).toArray();
      res.json({ status: 200, data: allDeliveries });
      break;
  }
}
