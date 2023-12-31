const express = require('express');
const app= express();
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
var server = require('http').createServer(app);
const carController = require('./controllers/Car_Controller');
const cors = require('cors');
// const autoIncrement = require('mongoose-auto-increment');

app.use(cors());
app.use(express.static(__dirname + '/node_modules'));
mongoose.connect('mongodb://127.0.0.1:27017/Car', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
 

app.set('view engine', 'ejs');
app.use(bodyParser.json()); 
app.post('/cars', carController.createCar);
app.get('/cars', carController.getAllCars);
app.post('/cars/update', carController.updateCar);
app.post('/cars/delete', carController.deleteCar);
 
  server.listen(5000,()=>{
      console.log("server is running on port 5000")
  })