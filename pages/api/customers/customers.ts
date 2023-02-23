import clientPromise from "../../../lib/mongodb";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  device: string;
  version: string;
  status: boolean;
  image: string;
}[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("logicflow");

  switch (req.method) {
    case "POST":
      let bodyObject = req.body;
      let customer = await db.collection("customers").insertOne(bodyObject);
      res.json({
        customer: customer.insertedId,
        message: `The customer with id ${customer.insertedId} was created in the customers collection.`,
      });
      break;
    case "GET":
      const allCustomers = await db
        .collection("customers")
        .find({})
        .toArray();
      res.json({ status: 200, data: allCustomers });
      break;
  }

}
