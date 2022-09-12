const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get((req, res) => res.status(200).json({msg: 'ok'}))

// all your express middleware here

module.exports = app
