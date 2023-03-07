require('dotenv').config({ path: './config.env' })

const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000

app.use(cors())
app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({ extended: false }))

app.get('/hello', (req, res) => {
    res.json({msg: 'Hello, World!'})
})

app.listen(port, () => console.log(`Server is running on: http://localhost:${port}`))