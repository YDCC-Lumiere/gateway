const express = require('express')
const multer = require('multer')
const cors = require('cors')

const { handleHealth } = require('./controller/health')
const { handleFace, handleVoiceUpload, handleVoiceVerify } = require('./controller/main')

const upload = multer({ dest: "uploads/" })
const app = express()

// Middlewares
const corsOption = {
  origin: "*"
}
app.use(cors(corsOption))

// routes
app.get('/api/health', handleHealth)
app.post('/api/face', upload.single('file'), handleFace)
app.post('/api/voice/upload', upload.single('file'), handleVoiceUpload)
app.post('/api/voice/verify', upload.single('file'), handleVoiceVerify)

app.listen(8081, async () => {
  console.log("Started on localhost:8081");
})
