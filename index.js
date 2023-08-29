require("dotenv").config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const upload = multer()
const mongoose = require("mongoose");
const Key = require("./models/Key");

mongoose.connect(process.env.MONGO_SRV, {
}).then(() =>[
  console.log("Connected to the database!")
]).catch((err) =>{
    console.log('Failed connect to the database!')
})

async function verifyKey(req, res, next) {
    const key = req.body.key;
    const findKey = await Key.findOne({ key: key });
    if (findKey) {
        next();
    } else {
        res.status(401).send({ error: "Invalid key" });
    }
}

app.post('/upload', verifyKey, upload.single('file'), function (req, res) {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
      } else {
        res.send(process.env.DOMAIN + `/${req.file.filename}`)
      }
})

app.listen(process.env.PORT)
console.log(`Listening on port ${process.env.PORT}`)