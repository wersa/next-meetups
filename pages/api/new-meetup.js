import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI);

    await client.connect();

    const db = client.db();
    
    const clientCollection = db.collection("meetups");

    const result = await clientCollection.insertOne(data);

    client.close();
    res.status(201).json({ message: "Successfuly inserted" });
  }
}

export default handler;
