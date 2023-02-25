import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("logicflow");

  switch (req.method) {
    case "PATCH":
      let bodyObject = req.body;

      try {
        let driver = await db.collection("deliveries").updateOne(
          // @ts-ignore
          { _id: new ObjectId(bodyObject.taskId) },
          {
            $set: {
              "delivery.status": "in process",
              "delivery.locationHistory.start": {
                coordinates: bodyObject.location,
                timestamp: bodyObject.timestamp,
              },
            },
          }
        );

        res.json({
          status: 200,
          message: `The delivery with id ${bodyObject.taskId} was updated.`,
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
