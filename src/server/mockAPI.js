const axios = require('axios').default;
require('dotenv').config()
const fetch = require('node-fetch');
let inputBox = {}

async function apiCall(req, res){
    console.log("url.req.bodyis: ");
    console.log(req.body);
    const baseUrl = "https://api.meaningcloud.com/sentiment-2.1?key=";
    console.log(baseUrl);
    const apiKey = process.env.apiKey;
    console.log("apiKey =>", apiKey);
    const ofType = "&of=json&url=";
    const lang = "&lang=en";
    let nUrl = req.body.data.newUrl;
    console.log("url =>", nUrl);
    const requestOptions=  {
      method: 'POST',
      redirect: 'follow'
    };
    let url = (baseUrl+apiKey+ofType+nUrl+lang);
    console.log("url =>", url);
        let options = {
            method: 'GET',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        };
const response = await axios(options, requestOptions);
// let responseOK = response && response.status === 200 && response.statusText === 'OK';
// if (responseOK) {
    console.log("response is =>", response);
    let data = await response.data;
    
    // console.log("data is =>", data);
    inputBox["agreement"]=data.agreement;
    inputBox["subjectivity"]=data.subjectivity;
    inputBox["confidence"]=data.confidence;
    inputBox["irony"]=data.irony;
    console.log(inputBox);
    return inputBox
    // do something with data
}
    // }
//     const responce = async (baseUrl, apiKey, ofType, url, lang, requestOptions) =>{
//       await fetch(baseUrl+apiKey+ofType+url+lang, requestOptions)
//           .then(responce => {
//               return responce.json();})
//           .then(responce =>{
//               console.log("link is =>", baseUrl+apiKey+ofType+url+lang)
//               console.log("responce is: ");
//               console.log(responce);
//               // let inputBox={
//               //   agreement:responce.agreement,
//               //   subjectivity: responce.subjectivity,
//               //   confidence: responce.confidence,
//               //   irony: responce.irony
//               // }
//               inputBox["agreement"]=responce.agreement;
//               inputBox["subjectivity"]=responce.subjectivity;
//               inputBox["confidence"]=responce.confidence;
//               inputBox["irony"]=responce.irony;
//               console.log(inputBox);
//               return inputBox
//           })  
//   }
// }
// module.exports = {
//     method: function() {},
//     otherMethod: function() {},
// };
  module.exports = {
    method:apiCall,
    otherMethod: inputBox,
    /*otherOtherMethod: baseUrl*/}
// module.exports = apiCall