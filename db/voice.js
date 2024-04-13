const { db } = require('.')

const getCollection = async () => {
  return await db.collection('embedded-voice');
}

const findEmbedding = async (user_id) => {
  const collection = await getCollection();
  const result = await collection.findOne({ user_id });
  if (!result) {
    return null;
  }
  return result;
}

const saveEmbedding = async (user_id, file_name, embedding) => {
  const collection = await getCollection();
  const data = { user_id, file_name, embedding }
  return await collection.insertOne(data);
}

module.exports = {
  findEmbedding,
  saveEmbedding
}
