const axios = require('axios').default;
require('dotenv').config()
// main object to extract the information back to the Client
let inputBox = {}

// main function that is activated when and by the information send by the Client (from the server file)
async function apiCall(req, res){
    // declaring the particular information we are going to us from those we just got back from the Client
    let cityName = req.body.data.UI_Inp.formCity;
    let countryCode = req.body.data.UI_Inp.formCountry;
    let newDateStart = req.body.data.UI_Inp.newDateStart;
    let newDateEnd = req.body.data.UI_Inp.newDateEnd;
    let lastYearDateStart = req.body.data.UI_Inp.lastYearDateStart;
    let lastYearDateEnd = req.body.data.UI_Inp.lastYearDateEnd;
    let formDaysLeft = req.body.data.UI_Inp.formDaysLeft;
    // declaring variables we are going to use to the first API call
    const baseUrl = "http://api.geonames.org/postalCodeSearch?"; 
    const placename = `&placename=${cityName}`;
    const country = `&country=${countryCode}`;
    const maxRows = "&maxRows=10";
    // works as key for this API
    const username = process.env.geoUserN;
    // forming the main axios URL
    const URL = (baseUrl+placename+country+maxRows+username);
    let url = encodeURI(URL);
    // axios options
        let options = {
            method: 'GET',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        };
const response = await axios(options);
    try{
    let data = await response.data;
    // puting lat and lng into the 
    inputBox["latitude"]=data.postalCodes[0].lat;
    inputBox["longitude"]=data.postalCodes[0].lng;
    // the following statements desides which of the two different prediction call is going to be used hist(ory) and forec(ast)
    if(formDaysLeft > 16){
        weatherbitHist(inputBox, cityName, lastYearDateStart, lastYearDateEnd, countryCode, formDaysLeft);
    }else{
        weatherbitForec(inputBox, cityName, newDateStart, newDateEnd, countryCode, formDaysLeft);
    }
}catch (error) {
    console.error(error);
  }
    }
    // second API call option 1
async function weatherbitHist(inputBox, cityName, lastYearDateStart, lastYearDateEnd, countryCode, formDaysLeft) { 
    let inputLat= inputBox.latitude;
    let inputLong= inputBox.longitude;
    const baseUrl = "https://api.weatherbit.io/v2.0/history/daily?";
    const key = process.env.weatherbKey;
    let lat = `&lat=${inputLat}`;
    let long = `&lon=${inputLong}`;
    let start_date = `&start_date=${lastYearDateStart}`;
    let end_date =  `&start_date=${lastYearDateEnd}`;
    // final url 
    const histUrl = (baseUrl+lat+long+start_date+end_date+key);
    let options2 = {
        method: 'GET',
        url: histUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    const res = await axios(options2);
    try{
    let bitData = await res.data;
    inputBox["min_temp"]= bitData.data[0].min_temp;
    inputBox["max_temp"]= bitData.data[0].max_temp;
    inputBox["snow"]= bitData.data[0].snow;
    inputBox["clouds"]= bitData.data[0].clouds;
    inputBox["formDaysLeft"]=formDaysLeft;
    // the next two function are called with arguments from the info used up to now
    pixabay(cityName);
    restcountries(countryCode)

} catch (error) {
    console.error(error);
  }
}
 // second API call oprion 2
async function weatherbitForec(inputBox, cityName, newDateStart, newDateEnd, countryCode, formDaysLeft) {
    let inputLat= inputBox.latitude;
    let inputLong= inputBox.longitude;
    const baseUrl = "https://api.weatherbit.io/v2.0/forecast/daily?";
    const key = process.env.weatherbKey;
    let lat = `&lat=${inputLat}`;
    let long = `&lon=${inputLong}`;
    let start_date = `&start_date=${newDateStart}`;
    let end_date = `&start_date=${newDateEnd}`;
    // final url
    const forcastUrl = (baseUrl+lat+long+start_date+end_date+key);
    let options2 = {
        method: 'GET',
        url: forcastUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    // axios call
    const res = await axios(options2);

    try{
    let bitData = await res.data;
    inputBox["min_temp"]= bitData.data[0].min_temp;
    inputBox["max_temp"]= bitData.data[0].max_temp;
    inputBox["snow"]= bitData.data[0].snow;
    inputBox["clouds"]= bitData.data[0].clouds;
    inputBox["formDaysLeft"]=formDaysLeft;
    // the next two function are called with arguments from the info used up to now
    pixabay(cityName);
    restcountries(countryCode)

} catch (error) {
    console.error(error);
  }
}

// 3rd API call
async function pixabay(cityName){
    let CityName= cityName;
    console.log("Pixabay CityName=>", CityName)
    const baseUrl = "https://pixabay.com/api/?";
    const key = process.env.pixabayKey;  
    let search = `&q=${CityName}+city`;
    const image_type = "&image_type=photo";
    // final url
    const url = (baseUrl+key+search+image_type);
    console.log("pixabayUrl=>", url);

    let options3 = {
        method: 'GET',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
// axios call 
const resp = await axios(options3);
    try{
    let pixabayData = await resp.data;
    let webformatURL = pixabayData.hits[0].webformatURL
    console.log("pixabayData.hits[0]",pixabayData.hits[0]);
    inputBox["webformatURL"]= webformatURL;
    return webformatURL;
} catch (error) {
    console.error(error);
  }
}

// 4th API call to add the final bit of information
async function restcountries(countryCode) {
    let CountryCode= countryCode;
    console.log("Restcountries CountryCode=>", CountryCode)
    const baseUrl = "https://restcountries.eu/rest/v2/name/";   
    let country = `${CountryCode}`
    // final url
    const restUrl = (baseUrl+country);
    console.log("restUrl=>",restUrl);

    let options3 = {
        method: 'GET',
        url: restUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    const respo = await axios(options3);
    try{
    let restcountriesData = await respo.data;
    // all the information taken is put in the exporting object
    inputBox["OfficialName"]= restcountriesData[0].name;
    inputBox["callingCodes"]= restcountriesData[0].callingCodes;
    inputBox["capital"]= restcountriesData[0].capital;
    inputBox["region"]= restcountriesData[0].region;
    inputBox["subregion"]= restcountriesData[0].subregion;
    inputBox["population"]= restcountriesData[0].population;
    inputBox["area"]= restcountriesData[0].area;
    inputBox["currencies"]= restcountriesData[0].currencies.name;

} catch (error) {
    console.error(error);
  }
};

// exporting modules from there here the information and the object to be extracted is going to go back to the server
  module.exports = {
    method:apiCall,
    otherMethod: inputBox,
    otherOtherMethod: pixabay}
