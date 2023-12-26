import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("logicflow");
  const { id } = req.query;
  switch (req.method) {
    case "PATCH":
      let bodyObject = req.body;

      try {
        let driver = await db.collection("drivers").updateOne(
          // @ts-ignore
          { _id: new ObjectId(id) },
          {
            $set: {
              status: bodyObject.status,
            },
          }
        );

        res.json({
          status: 200,
          message: `The driver with id ${id} was updated.`,
        });
      } catch (error) {
        res.json({
          status: 500,
          message: "Couldn't update the driver status.",
        });
      }

      break;
  }
}

