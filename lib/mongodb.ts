import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

let client;
let clientPromise: Promise<MongoClient>;

// Check if the is a MongoDB uri
if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
  throw new Error("Add a MongoDB URI to .env.local");
} else if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
} else {
    throw Error("Couldn't connect to the MongoDB database.")
}

export default clientPromise;
