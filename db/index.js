const { MongoClient } = require('mongodb');

// Connection URL
const url = process.env.MONGODB_URL;
// const url = "mongodb://user:pass@localhost:27017"
const client = new MongoClient(url);

// Database Name
const dbName = 'lumiere';

const getDb = async () => {
  const conn = await client.connect();
  return conn.db(dbName);
}

module.exports = getDb;
