import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = await clientPromise;
  const db = client.db("logicflow");
  const { id } = req.query;

  switch (req.method) {
    case "DELETE":
      let deletedCustomer = await db
        .collection("customers")
        // @ts-ignore
        .deleteOne({ _id: new ObjectId(id) });
      res.json({
        message: `The customer with id ${id} was deleted from the customers collection.`,
      });
      break;
    case "GET":
      const foundCustomer = await db
        .collection("customers")
        .find({
          // @ts-ignore
          _id: new ObjectId(id),
        })
        .toArray();
      res.json({ status: 200, data: foundCustomer });
      break;
    case "PATCH":
      const updatedCustomer = await db.collection("customers").updateOne(
        // @ts-ignore
        { _id: new ObjectId(id) },
        {
          $set: req.body,
        }
      );
      res.json({status: 200, message: `The customer with the id ${id} has been updated in the customers collection.`})
  }
}
