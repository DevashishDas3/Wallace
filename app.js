const express = require('express');
const app = express();
// const port = 3000;
const fs = require('fs');
const multer = require('multer');


const depot = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./depot")
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
});

const upload = multer({depot: depot}).single('wall'); //storage: storage
app.set('view engine', 'ejs');

//routes

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', (req, res) => {
  upload(req, res, err => {
    fs.readFile(`./depot/${req.file.originalname}`, (err,data) => {
      if(err) return console.log("Wallace request for image unsuccessful due to ", err);

      Worker
      .recognize(data, 'eng', {tessjs_create_pdf: '1'})
      .progress(progress => {
        console.log(progress);
      })
      .then(result => {
        res.send(result.text);
        var result = result.text;
      });
      Worker.terminate();
    });
  });
});

//start server
const PORT = 3000 || process.env.PORT; 
app.listen(PORT, () => console.log("Listening on port " + PORT));