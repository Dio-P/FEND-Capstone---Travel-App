// Setup empty JS object to act as endpoint for all routes
projectData = {}



// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
const port = 3000;

/* Middleware*/
const fetch = require("node-fetch");
const bodyParser = require("body-parser")

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));


// Setup Server
app.listen(port, listening);
 function listening(){
    console.log("server");
    console.log(`running on localhost: ${port}`);
};


/*creating the /all where all the exchange of information will be happening*/
app.get("/all", function (req, res) {
    res.send(projectData);
})


/*this sends the html back to the /*/
app.get("/", function (req, res) {
  res.sendFile(__dirname+"/website/indexTest2.html");
})


/*this pushes all the useful info to the endpoint*/
app.post("/addWeather", addWeather);

/*let data = [];*/

function addWeather (req,res){
    let data = req.body;

    projectData["temp"]= data.temp;
    projectData["feelings"]= data.feelings;
    projectData["date"]= data.date


};



