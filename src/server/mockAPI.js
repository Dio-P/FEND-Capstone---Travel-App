// const Fs = require('fs')  
const axios = require('axios').default;
require('dotenv').config()
// const fetch = require('node-fetch');
// const Path = require('path') 
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
    const username = process.env.geoUserN; // "&username=dio_papa";
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
    try{
    console.log("response is =>", response);
    let data = await response.data;
    
    console.log("data is =>", data);
    inputBox["data"]= data.postalCodes
    inputBox["latitude"]=data.postalCodes[0].lat;
    inputBox["longitude"]=data.postalCodes[0].lng;
    inputBox["country"]=data.postalCodes[0].countryCode;
    // inputBox["irony"]=data.postalCodes.irony;
    console.log("inputBox =>", inputBox);
    weatherbit(inputBox);
    pixabay()
    // return inputBox;
}catch (error) {
    console.error(error);
  }
    }
async function weatherbit(inputBox) { //not called yet
    let inputLat= inputBox.latitude;
    let inputLong= inputBox.longitude;
    const baseUrl = "https://api.weatherbit.io/v2.0/history/daily?";
    const key = process.env.weatherbKey; //"&key=8bd27fa25c054293935d109ab993c167";
    let lat = `&lat=${inputLat}`; // "&lat=38.123"// This needs to be updated by the previous function
    let long = `&lon=${inputLong}`; // "&lon=-78.543" // This needs to be updated by the previous function
    let start_date = "&start_date=2021-09-11"; // This needs to be given by the form  
    let end_date = "&end_date=2021-09-12"; // This needs to be given by the form
    const url = (baseUrl+lat+long+start_date+end_date+key);
    console.log(url);
    let options2 = {
        method: 'GET',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    // return inputBox
// 
    const res = await axios(options2);
    try{
    let bitData = await res.data;
    console.log("bitData is =>", bitData);
    inputBox["bitData"]= bitData;
    console.log("inputBox =>", inputBox);
    let bitWeatherData = inputBox.bitData.data
    console.log("bitWeatherData =>", bitWeatherData)

    // let min_temp = bitWeatherData.min_temp;
    // let max_temp = bitWeatherData.max_temp;
    // let snow /*(if >0)*/ = bitWeatherData.snow;
    // let clouds = bitWeatherData.clouds;
    inputBox["min_temp"]= bitData.data[0].min_temp;
    inputBox["max_temp"]= bitData.data[0].max_temp;
    inputBox["snow"]= bitData.data[0].snow;
    inputBox["clouds"]= bitData.data[0].clouds;
    console.log("inputBox =>", inputBox);
    

} catch (error) {
    console.error(error);
  }
}

async function pixabay(req,res){
    let cityName= "Glasgow"; //how is it going to get the name from the client? Get or mod exp from server?
    // console.log("baixabay runs")
    const baseUrl = "https://pixabay.com/api/?";
    const key = process.env.pixabayKey; //"key=23402174-d80a0bf663b43f42c0300decb";   
    let searcn = `&q=${cityName}+city`;  //"&p=Glasgow";
    const image_type = "&image_type=photo";
    // const editors_choice = "&editors_choice=true";
    let data = req.body;
    console.log(data);
    console.log("data.formDate =>", data.data.UI_Inp.formDate);
    console.log("data.formCity =>", data.data.UI_Inp.formCity);
    const url = (baseUrl+key+searcn+/*editors_choice+*/image_type);
    console.log("pixabayUrl=>", url);

    let options3 = {
        method: 'GET',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    
const resp = await axios(options3);
    try{
    let pixabayData = await resp.data;
    // console.log("pixabayData is =>", pixabayData);
    // inputBox["pixabayData"]= pixabayData;
    console.log("inputBox =>", inputBox);
    let newCityPhoto = pixabayData.hits[0];
    console.log("newCityPhoto =>", newCityPhoto);
    let webformatURL = pixabayData.hits[0].webformatURL
    console.log("webformatURL =>", webformatURL);
    inputBox["webformatURL"]= webformatURL;
    return webformatURL;
    // let newPhotoUrl = new URL(webformatURL);
    // console.log("newPhotoUrl =>", newPhotoUrl);
    

    // let options4 = {
    //     method: 'GET',
    //     responseType: 'stream',
    //     url: webformatURL,
    //     // ...............................................
    //     // headers: {
    //     //     'Accept': 'application/json',
    //     //     'Content-Type': 'application/json;charset=UTF-8'
    // }
    // const path = Path.resolve(__dirname, 'Images', 'code.jpg')
    // const writer = Fs.createWriteStream(path)
    
    // let newPhoto = await axios(options4);
    
    // console.log("newPhoto =>", newPhoto);
    // let newPhotoData = await newPhoto.data;
    // console.log("newPhotoData =>", newPhotoData);
    // newPhotoData.pipe(writer)
    // ........................................................
    // writer.on('finish', resolve)
    // let bitWeatherData = inputBox.bitData.data
    // console.log("bitWeatherData =>", bitWeatherData)

    // let min_temp = bitWeatherData.min_temp;
    // let max_temp = bitWeatherData.max_temp;
    // let snow /*(if >0)*/ = bitWeatherData.snow;
    // let clouds = bitWeatherData.clouds;
    // inputBox["min_temp"]= bitData.data[0].min_temp;
    // inputBox["max_temp"]= bitData.data[0].max_temp;
    // inputBox["snow"]= bitData.data[0].snow;
    // inputBox["clouds"]= bitData.data[0].clouds;
    // console.log("inputBox =>", inputBox);
    

} catch (error) {
    console.error(error);
  }
}

    // ...........................................
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
    otherOtherMethod: pixabay}
