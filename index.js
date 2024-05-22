var express = require('express');
const multer = require('multer');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

var upload = multer({dest:'uploads/'})

app.post('/api/fileanalyse',upload.single('upfile') ,async(req, res)=>{

  var file = req.file
  try{
    console.log(file)
    res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    })
  }
  catch(err){
    res.sendStatus(err)
  }
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
