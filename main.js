// Load HTTP module
const express = require("express");
const path = require('path')
const app = express();
const fs = require('fs')
const port = 80;
//const server = require('http').createServer(app)

const fileup = require('express-fileupload')
const bodyParser = require('body-parser')
 
// create application/json parser
app.use(fileup()); 
 
// create application/x-www-form-urlencoded parser

//app.use(express.bodyParser());
  
app.get("/", function (req, res) {
    //res.send("Hello World!");
    res.sendFile(path.join(__dirname, '/index.html'));
    //console.log(req)  
    console.log("hi")
});

app.get('/styles.css', function(req, res) {
    res.sendFile(__dirname + "/" + "styles.css");
});

app.get('/getfiles', async function (req, res) {
    await fs.readdir(__dirname + '/files', async (err, files) => {
        if (err) 
          console.log(err); 
        else {
          files.forEach(file => { 
            console.log(file); 
          })
        }
        console.log(files)
        res.send(JSON.stringify(files));
      })
})

app.post('/getfile', bodyParser.json(), async function (req, res) {
    res.setHeader("content-disposition", "attachment; filename=" + req.body.name);
    res.sendFile(__dirname + "/files/" + req.body.name);
})

app.post("/send", (req, res) => {
    if (req.files) {
        console.log(req.files)
        sendcalled(req.files.downloadfile)
        res.send("File sent")
    }
})


app.listen(port, '0.0.0.0', function () {
    console.log(`Example app listening on port ${port}!`);
});

//server.listen(port, '0.0.0.0', () => {});

function sendcalled(file) {
    // const send = document.getElementById('sendinput')
    // let file = send.files[0]
    // let newfs = fs.createWriteStream(file.name)
    // let filereader = new FileReader()
    // filereader.readAsArrayBuffer(file)
    // newfs.write(filereader.result)
    // newfs.close()
    // console.log("hhioh")
    file.mv(__dirname + "/files/" + file.name, (err) => {});
}

function getcalled() {

}