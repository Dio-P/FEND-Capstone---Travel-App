// projectData = {}


var path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const mockApi = require("./mockAPI");
require('dotenv').config()
const apiCall = mockApi.method;
let inputBox = mockApi.otherMethod;

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

// app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
// })


// app.get("/all", function (req, res) {
//   res.send(projectData);
// })


// app.post('/test', test);

// function test(req, res){
//   console.log("test req.bodyis: ");
//   console.log(req.body);
//   projectData["newResults"]= req.body.data;
//   console.log("projectData after test(results) is:")
//   console.log(projectData)
//   res.send("hello Theo");

// }


app.post("/url", apiCall)
// url(req.body) is sent by the client after the form is submited, is resiaved here, and used for the call to happen
// function apiCall(req, res){
//   console.log("url.req.bodyis: ");
//   console.log(req.body);
//   const baseUrl = "https://api.meaningcloud.com/sentiment-2.1?key=";
//   const apiKey = "3efc4576a3ecb52cacc8f300e57651b0";
//   const ofType = "&of=json&url=";
//   const lang = "&lang=en";
//   let url = req.body.data.newUrl;
//   const requestOptions=  {
//     method: 'POST',
//     redirect: 'follow'
// };
//   const responce = async (baseUrl, apiKey, ofType, url, lang, requestOptions) =>{
//     await fetch(baseUrl+apiKey+ofType+url+lang, requestOptions)
//         .then(responce => {
//             return responce.json();})
//         .then(responce =>{
//             console.log("link is =>", baseUrl+apiKey+ofType+url+lang)
//             console.log("responce is: ");
//             console.log(responce);
//             // let inputBox={
//             //   agreement:responce.agreement,
//             //   subjectivity: responce.subjectivity,
//             //   confidence: responce.confidence,
//             //   irony: responce.irony
//             // }
//             inputBox["agreement"]=responce.agreement;
//             inputBox["subjectivity"]=responce.subjectivity;
//             inputBox["confidence"]=responce.confidence;
//             inputBox["irony"]=responce.irony;
//             console.log(inputBox);
//             return inputBox
//         })  
// }
// the function belowe is loading only the second time and not the first!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get("/results", function(req,res){
  console.log("inputBox =>", inputBox);
  res.send(inputBox);
});


// module.exports = projectData