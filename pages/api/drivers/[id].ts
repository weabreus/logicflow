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
  driver_name: string;
  driver_phone: string;
  driver_email: string;
  driver_order: string;
  driver_address: string;
  driver_longitude: number;
  driver_latitude: number;
  driver_datetime: string;
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
      let deletedDriver = await db
        .collection("drivers")
        // @ts-ignore
        .deleteOne({ _id: new ObjectId(id) });
      res.json({
        message: `The driver with id ${id} was deleted from the drivers collection.`,
      });
      break;
    case "GET":
      const foundDriver = await db
        .collection("drivers")
        .find({
          // @ts-ignore
          _id: new ObjectId(id),
        })
        .toArray();
      res.json({ status: 200, data: foundDriver });
      break;
    case "PATCH":
      const updateddriver = await db.collection("drivers").updateOne(
        // @ts-ignore
        { _id: new ObjectId(id) },
        {
          $set: req.body,
        }
      );
      res.json({status: 200, message: `The driver with the id ${id} has been updated in the drivers collection.`})
  }
}
