// projectData = {}


var path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const mockApi = require("./mockAPI");
require('dotenv').config()
// const apiCall = mockApi.method;
let inputBox = mockApi.otherMethod;
const pixabay = mockApi.otherOtherMethod;

// const mockAPIResponse = require('./mockAPI.js')



const app = express()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

// app.post("/UI_Inp", apiCall)
app.post("/UI_Inp", pixabay)

app.get("/results", function(req,res){
  console.log("inputBox =>", inputBox);
  res.send(inputBox);
});

// app.post("/addWeather", addWeather);

// /*let data = [];*/

// function addWeather (req,res){
//     let data = req.body;

//     projectData["temp"]= data.temp;
//     projectData["feelings"]= data.feelings;
//     projectData["date"]= data.date


// };

// module.exports = projectData