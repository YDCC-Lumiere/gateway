const { MongoClient } = require('mongodb');

// Connection URL
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

// Database Name
const dbName = 'lumiere';
let db;

const initDb = async () => {
  await client.connect();
  console.log('Connected successfully to server');
  db = client.db(dbName);
}

module.exports = {
  db,
  initDb
}
