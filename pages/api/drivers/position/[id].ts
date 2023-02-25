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
              coordinates: { lat: bodyObject.lat, lng: bodyObject.lng },
            },
          }
        );

        if (bodyObject.driverStatus === "busy") {
          if (bodyObject.currentTask.type === "pickup") {
            let task = await db.collection("deliveries").updateOne(
              {
                _id: new ObjectId(bodyObject.currentTask.id),
              },
              {
                $push: {
                  "pickup.locationHistory.route": {
                    coordinates: { lat: bodyObject.lat, lng: bodyObject.lng },
                    timestamp: bodyObject.timestamp
                  },
        
                },
              }
            );
          } else if (bodyObject.currentTask.type === "delivery") {
            let task = await db.collection("deliveries").updateOne(
              {
                _id: new ObjectId(bodyObject.currentTask.id),
              },
              {
                $push: {
                  "delivery.locationHistory.route": {
                    coordinates: { lat: bodyObject.lat, lng: bodyObject.lng },
                    timestamp: bodyObject.timestamp,
                  },
                  
                },
              }
            );
          }
        }

        res.json({
          status: 200,
          message: `The driver with id ${id} was updated.`,
        });
      } catch (error) {
        res.json({
          status: 500,
          message: "Couldn't update de coordinates.",
        });
      }

      break;
  }
}
