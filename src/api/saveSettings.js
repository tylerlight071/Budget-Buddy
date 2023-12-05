// /api/saveSettings.js

import { dbConnect } from "../../db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const { userId, settings } = req.body;

  // Connect to the database
  const db = await dbConnect();

  // Insert the data into the database
  await db.collection("settings").insertOne({
    userId,
    ...settings,
  });

  res.status(200).end();
}
