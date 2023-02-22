import { ObjectId } from "mongodb";
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
  const { id } = req.query;

  switch (req.method) {
    case "DELETE":
      let deletedDelivery = await db
        .collection("deliveries")
        // @ts-ignore
        .deleteOne({ _id: new ObjectId(id) });
      res.json({
        message: `The delivery with id ${id} was deleted from the deliveries collection.`,
      });
      break;
    case "GET":
      const foundDelivery = await db
        .collection("deliveries")
        .find({
          // @ts-ignore
          _id: new ObjectId(id),
        })
        .toArray();
      res.json({ status: 200, data: foundDelivery });
      break;
    case "PATCH":
      const updatedDelivery = await db.collection("deliveries").updateOne(
        // @ts-ignore
        { _id: new ObjectId(id) },
        {
          $set: req.body,
        }
      );
      res.json({status: 200, message: `The delivery with the id ${id} has been updated in the deliveries collection.`})
  }
}
