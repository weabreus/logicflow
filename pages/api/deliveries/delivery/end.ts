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
              status: true,
              "delivery.status": 'completed',
              "delivery.locationHistory.end": {
                coordinates: bodyObject.location,
                timestamp: bodyObject.timestamp
              }
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
          message: "Couldn't update the delivery status.",
        });
      }

      break;
  }
}
