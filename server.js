const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const ShortUrl = require('./models/shortUrl')
const connectDB = require('./config/db');
const shortUrl = require('./models/shortUrl');

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

app.use(express.urlencoded({ extended: false }))

//route that handles incoming long Url's
app.post('/shortUrls', async (req, res) => {
  const recieved_url = req.body.fullurl
  const url = await ShortUrl.create({ full: recieved_url })
  res.send({short:'https://nith.herokuapp.com/'+url.short})
})

//route that handles incoming short Url's to be redirected
app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)
  shortUrl.save()
  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000,()=>console.log("server running"));