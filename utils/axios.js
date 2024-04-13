const axios = require('axios')

const clientFace = axios.create({
  baseURL: process.env.FACE_URL
})
clientFace.defaults.headers.common['Authorization'] = process.env.FACE_TOKEN

const clientVoice = axios.create({
  baseURL: process.env.VOICE_URL
  // baseURL: "https://328c-183-91-22-22.ngrok-free.app"
})
clientVoice.defaults.headers.common['Authorization'] = process.env.VOICE_TOKEN

module.exports = {
  clientFace,
  clientVoice
}
