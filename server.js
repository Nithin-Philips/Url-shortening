const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const validateUrl = require('url-validator')
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
  const recievedUrl = req.body.fullurl
  if(!validateUrl(recievedUrl)){
  res.status(404).json('Invalid Url')
  }
  else{
    const url = await ShortUrl.create({ full: recievedUrl })
    res.send({short:url.short})
  }
})

//route that handles incoming short Url's to be redirected
app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)
  shortUrl.save()
  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000,()=>console.log("server running"));