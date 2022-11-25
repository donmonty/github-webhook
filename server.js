require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
// const cors = require('cors')
const PORT = process.env.PORT || 8800

app.use(express.json())

app.post('/', async (req, res) => {
  const payload = req.body;
  try {
    const response = await axios.post(
      `https://api.github.com/repos/donmonty/image-upload/dispatches`,
      {
        "event_type": "figma-webhook",
        "client_payload": payload
      },
      {
        headers: {
          'Accept': 'application/vnd.github+json',
          "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
        }
      }
    )
    return res.status(200).json(response.data)
  } catch(err) {
    console.log("Error at main route: ", err)
    return res.status(500).json(err)
  }
})

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));