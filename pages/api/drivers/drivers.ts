import clientPromise from "../../../lib/mongodb";

import drivers from "../../../data/driver";

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
      let driver = await db.collection("drivers").insertOne(bodyObject);
      res.json({
        driver: driver.insertedId,
        message: `The driver with id ${driver.insertedId} was created in the drivers collection.`,
      });
      break;
    case "GET":
      const alldrivers = await db
        .collection("drivers")
        .find({})
        .toArray();
      res.json({ status: 200, data: alldrivers });
      break;
  }

}
