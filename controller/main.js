const { FormData } = require('formdata-node')
const { fileFromPath } = require('formdata-node/file-from-path');
const { ReadableStream } = require('web-streams-polyfill');
const { v4 } = require('uuid');
const { clientFace, clientVoice } = require('../utils/axios');
const { findEmbedding, saveEmbedding } = require('../db/voice');
const { success, failure } = require('../utils/response');

const generateId = () => {
  return v4();
}

// NOTE: profiling ReadableStream
Object.defineProperties(globalThis, {
  ReadableStream: { value: ReadableStream }
})

const handleFace = (req, res) => {
  const file = req.file;

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

  return res.data.embed
}

const handleVoiceUpload = async (req, res) => {
  try {
    const file = req.file;
    const embedding = await uploadVoice(file.path);
    const user_id = generateId();
    const saved = await saveEmbedding(user_id, file.path, embedding);
    saved.user_id = user_id;

    return success(res, saved, `File upload successfully, user_id is ${user_id}`);
  }
  catch (e) {
    return failure(res, {}, e.message);
  }
}

const handleVoiceVerify = async (req, res) => {
  try {
    const file = req.file;
    const user_id = req.body.user_id;

    const existingEmbedding = await findEmbedding(user_id);
    if (!existingEmbedding) {
      return failure(res, {}, "Session not found");
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


    if (result.data.verify) {
      return success(res, result.data, "Audio file is vaild");
    }
    else {
      return success(res, result.data, "Audio file is invaild");
    }
  }
  catch (e) {
    console.log(e.stack);
    return failure(res, {}, e.message);
  }
}

module.exports = {
  handleFace,
  handleVoiceUpload,
  handleVoiceVerify
}
