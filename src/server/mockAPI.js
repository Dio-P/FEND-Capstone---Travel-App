const axios = require('axios').default;
require('dotenv').config()
// const fetch = require('node-fetch');
let inputBox = {}

async function apiCall(req, res){
    // console.log("url.req.bodyis: ");
    // console.log(req.body);
    const baseUrl = "http://api.geonames.org/postalCodeSearch?" 
    console.log(baseUrl);
    const postalcode= "postalcode=G11 6rh"
    const placename = "&placename=Glasgow";
    // const apiKey = process.env.apiKey;
    // console.log("apiKey =>", apiKey);
    const country = "&country=GB"
    const maxRows = "&maxRows=10";
    // let nUrl = req.body.data.newUrl;
    // console.log("url =>", nUrl);
    const username = "&username=dio_papa";
    const URL = (baseUrl+postalcode+placename+country+maxRows+username);
    console.log("URl =>", URL);
    let url = encodeURI(URL);
    console.log("url =>", url);
        let options = {
            method: 'GET',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        };
    
const response = await axios(options);
// let responseOK = response && response.status === 200 && response.statusText === 'OK';
// if (responseOK) {
    console.log("response is =>", response);
    let data = await response.data;
    
    console.log("data is =>", data);
    inputBox["data"]= data.postalCodes
    inputBox["latitude"]=data.postalCodes[0].lat;
    inputBox["longitude"]=data.postalCodes[0].lng;
    inputBox["country"]=data.postalCodes[0].countryCode;
    // inputBox["irony"]=data.postalCodes.irony;
    console.log(inputBox);
    return inputBox
    // do something with data
}
    
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
