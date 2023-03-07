require('dotenv').config({ path: './config.env' })

const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000
const dbo = require('./db/conn')
const dbRoutes = require('./routes/record.js')

app.use(cors())
app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({ extended: false }))
app.use('/', dbRoutes)

app.get('/hello', (req, res) => {
    res.json({msg: 'Hello, World!'})
})

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
	if (err) {
	  console.error(err)
	  process.exit()
	}
  
	// start the Express server
	app.listen(port, () => {
	  console.log(`Server is running on: http://localhost:${port}`)
	})
})

// app.listen(port, () => console.log(`Server is running on: http://localhost:${port}`))