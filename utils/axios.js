const axios = require('axios')

const clientFace = axios.create({
  baseURL: process.env.FACE_URL
})
clientFace.defaults.headers.common['Authorization'] = process.env.FACE_TOKEN

const clientVoice = axios.create({
  baseURL: process.env.VOICE_URL
})
clientVoice.defaults.headers.common['Authorization'] = process.env.VOICE_TOKEN

module.exports = {
  clientFace,
  clientVoice
}
