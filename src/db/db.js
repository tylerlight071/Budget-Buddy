import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://tylerlightwood071:YocHBbQsCmzX52DM@cluster0.uvfs4dm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

export const dbConnect = async () => {
  if (dbConnection) {
    return dbConnection;
  }

  dbConnection = await client.connect();
  return dbConnection;
};

export const dbClose = async () => {
  await client.close();
};
