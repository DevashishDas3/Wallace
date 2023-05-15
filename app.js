const express = require('express');
const app = express();
// const port = 3000;
const fs = require('fs');
const multer = require('multer');
import { createWorker } from 'tesseract.js';

const worker = await createWorker({
  logger: m => console.log(m)
});

(async () => {
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
  console.log(text);
  await worker.terminate();
})();

const depot = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "./depot")
    },
    filename: (req, res, cb) => {
        cb(null, req.file);
    }
});

const upload = multer({depot: storage}).single('wall'); //storage: storage
app.set('view engine', 'ejs');


app.get('/uploads', (req, res) => {
    console.log("Connection Established");
});

//start server
const PORT = 3000 || process.env.PORT; 
app.listen(PORT, () => console.log("Listening on port " + PORT));