var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/node-demo");

var captSchema = new mongoose.Schema({
    ValueCapt: Number
   });

var Capteur = mongoose.model("Capteur", captSchema);

app.get("/addcapt", (req, res) => {
   Capteur.findById('5ab6ddc71274641be4b5e0cd', function(err, ress) {
     if (err) {
          throw (err);
     }
     
    else {
        res.json(ress)
        console.log(typeof(ress.ValueCapt));
    console.log("----------")
    }
   })
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
   });
    
   app.listen(port, () => {
    console.log("Server listening on port " + port);
   });

//Serial from Arduino

var SerialPort = require('serialport');
var serialport = new SerialPort('COM7', {
    baudRate: 9600
});

serialport.on('open', function(){
  console.log('Serial Port Opend');
  serialport.on('data', function(data){
      console.log(data[0]);
      //5ab6ddc71274641be4b5e0cd
      var myData = new Capteur(data);
      Capteur.findByIdAndUpdate('5ab6ddc71274641be4b5e0cd', {
          ValueCapt : data[0]
      },{
          new : true
      },(err, todo) => {
        // Handle any possible database errors
            if (err) console.log(err) 
          
        })

      
  });
});



