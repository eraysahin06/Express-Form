const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");

const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static("./public/"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/registerUser.html'));
});

const storage = multer.diskStorage({
  destination: "./public/photos/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(express.urlencoded({extended:true}));

app.post('/register-user', upload.single('photo'), (req, res) => {
    const formData = req.body;
    const formFile = req.file;
  
    const dataReceived = "Your submission was received:<br/><br/>" +
      "Your form data was:<br/>" + JSON.stringify(formData) + "<br/><br/>" +
      "Your File data was:<br/>" + JSON.stringify(formFile) +
      "<br/><p>This is the image you sent:<br/><img src='/photos/" + formFile.filename + "'/>";
    res.send(dataReceived);
})

app.listen(HTTP_PORT, onHttpStart);