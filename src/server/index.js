var path = require('path');
require('dotenv').config()

// importing function and object from the API call function
const mockApi = require("./mockAPI");
const apiCall = mockApi.apiCall;
let inputBox = mockApi.inputBox;

// importing app instance from app.js
const app = require("./app.js");

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

// when we get the input from the Client tha apiCall function is activated
app.post("/UI_Inp", apiCall)

app.get("/results", function(req,res){
  console.log("inputBox =>", inputBox);
  res.status(200).send(inputBox);
});