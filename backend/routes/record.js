require('dotenv').config({ path: '../config.env' })

const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectId

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router()

// This will help us connect to the database
const dbo = require('../db/conn')

// verify user exists
recordRoutes.route('/verify').post(async (req, res) => {
  const dbConnect = dbo.getDb()
  const collection = dbConnect.collection('users')
  const cred = { email: req.body.email }

  try {
    const user = await collection.findOne(cred)
    
    if(user !== null) {
      const isMatch = await bcrypt.compare(req.body.password, user.password)

      if(!isMatch) {
        res.json({ msg: 'error' })
        return
      }

      const token = jwt.sign(user, process.env.JWT_SECRET)

      res.json(token)
    } else {
      res.json({ msg: 'error' })
    }
  } catch(err) {
    res.json({ msg: 'error' })
  }
})

// register a new user
recordRoutes.route('/register').post(async (req, res) => {
  const dbConnect = dbo.getDb()
  const collection = dbConnect.collection('users')
  const newUser = {
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    password: req.body.password
  }

  try {
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(newUser.password, salt)
    
    newUser.password = passwordHash
    const result = await collection.insertOne(newUser)
    
    if(result.insertedId !== null) {
      res.json(result)
    } else {
      res.json({ err: 'error' })
    }
  } catch(err) {
    res.json({ err: 'error' })
  }
})

// get user info
recordRoutes.route('/user').post(async (req, res) => {
  const token = req.body.token.replace(/"/g, '')

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET)
    const dbConnect = dbo.getDb()
    const collection = dbConnect.collection('users')
    const user = await collection.findOne({ _id: new ObjectId(verify._id) })

    res.json(user)
  } catch(err) {
    console.log(err)
    res.json({ msg: 'error' })
  }
})

module.exports = recordRoutes