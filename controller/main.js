const { FormData } = require('formdata-node')
const { fileFromPath } = require('formdata-node/file-from-path')
const { clientFace, clientVoice } = require('../utils/axios')
const { findEmbedding, saveEmbedding } = require('../db/voice')

const handleFace = (req, res) => {
  const file = req.file;
  console.log(file);

  return res.status(200).send("OK");
}

const uploadVoice = async (path) => {
  const form = new FormData();
  form.append('file', await fileFromPath(path));
  res = await clientVoice.post('/upload', form, (err) => {
    if (err) {
      throw new Error("File upload failed");
    }
  })

  return res.embedding
}

const handleVoiceUpload = async (req, res) => {
  try {
    const file = req.file;
    const embedding = await uploadVoice(file.path);
    const user_id = generateId();
    await saveEmbedding(user_id, file.path, embedding);

    return res.status(200).send("File upload successfully");
  }
  catch (e) {
    return res.status(500).send(e.message)
  }
}

const handleVoiceVerify = async (req, res) => {
  try {
    const file = req.file;
    const user_id = req.body.user_id;

    const existingEmbedding = await findEmbedding(uuid);
    if (!existingEmbedding) {
      return res.status(401).send("Session not found")
    }

    const embedding = await uploadVoice(file.path);

    const data = {
      original: existingEmbedding.embedding,
      verify: embedding
    }
    result = await clientVoice.post('/verify', data, (err) => {
      if (err) {
        throw new Error("Verification failed");
      }
    })


    return res.status(200).json(result)
  }
  catch (e) {
    return res.status(500).send(e.message)
  }
}

module.exports = {
  handleFace,
  handleVoiceUpload,
  handleVoiceVerify
}
