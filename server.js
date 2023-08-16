const express = require('express')
const mongoose = require('mongoose')

const ShortUrl = require('./models/shortUrls')
const app = express()

app.set("view engine",'ejs')
app.use(express.urlencoded({extended: false}))

mongoose.connect("mongodb+srv://test:testdb@cluster0.2q8lkyw.mongodb.net/?retryWrites=true&w=majority")

app.get('/',async (req,res)=>{
     
    const shortUrls = await ShortUrl.find()
    res.render('index',{shortUrls})
})

app.post('/shortUrls', async (req,res) =>{
    await ShortUrl.create({full: req.body.fullUrl})
    res.redirect('/')
})

app.get('/:shortUrl',async (req,res) =>{
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if(shortUrl === null) return res.status(404).json("url not found")
    shortUrl.clicks ++;
    shortUrl.save()
    res.redirect(shortUrl.full)
})

app.listen(3000,(req,res)=>{
    console.log("connected to",3000);
})