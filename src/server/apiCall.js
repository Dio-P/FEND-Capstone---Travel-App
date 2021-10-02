const axios = require('axios').default;
require('dotenv').config()
const app = require("./app.js");
// main object to extract the information back to the Client + global declarations
let inputBox = {};
let cityName = "";
let countryCode = "";
let newDateStart = "";
let newDateEnd = "";
let lastYearDateStart = "";
let lastYearDateEnd = "";
let formDaysLeft = "";

// main function that is activated when and by the information send by the Client (from the server file)
async function apiCall(req, res){
    //the main object that is used globaly empties after restarting the function 
    inputBox = {};
    // declaring the particular information we are going to us from those we just got back from the Client
    cityName = req.body.data.UI_Inp.formCity;
    countryCode = req.body.data.UI_Inp.formCountry;
    newDateStart = req.body.data.UI_Inp.newDateStart;
    newDateEnd = req.body.data.UI_Inp.newDateEnd;
    lastYearDateStart = req.body.data.UI_Inp.lastYearDateStart;
    lastYearDateEnd = req.body.data.UI_Inp.lastYearDateEnd;
    formDaysLeft = req.body.data.UI_Inp.formDaysLeft;
    // declaring variables we are going to use to the first API call
    const baseUrlGeo = "http://api.geonames.org/postalCodeSearch?"; 
    const placename = `&placename=${cityName}`;
    const country = `&country=${countryCode}`;
    const maxRows = "&maxRows=10";
    // works as key for this API
    const username = process.env.geoUserN;
    // forming the main axios URL
    const URL = (baseUrlGeo+placename+country+maxRows+username);
    let url = encodeURI(URL);
    // axios options for first call
        let options = {
            method: 'GET',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        };
    app.get("/results", async(req,res) =>{

        const response = await axios(options);
        try{
        let data = await response.data;
        // puting lat and lng into the latitude, longitude
        let inputLat =data.postalCodes[0].lat;
        inputBox["latitude"]=data.postalCodes[0].lat;
        inputBox["longitude"]=data.postalCodes[0].lng;
        /////////////////////////////////////////////////////---------------------SEcond Call--------------------------------------//////////////////////////////////////////
        // the following statements desides which of the two different prediction call is going to be used hist(ory) and forec(ast)
        if(formDaysLeft > 16){
            // second API call option 1
                    let inputLat= inputBox.latitude;
                    let inputLong= inputBox.longitude;
                    const baseUrlWeathHist = "https://api.weatherbit.io/v2.0/history/daily?";
                    const WeathHistkey = process.env.weatherbKey;
                    let lat = `&lat=${inputLat}`;
                    let long = `&lon=${inputLong}`;
                    let start_date = `&start_date=${lastYearDateStart}`;
                    let end_date =  `&end_date=${lastYearDateEnd}`;
                    // final url 
                    const histUrl = (baseUrlWeathHist+lat+long+start_date+end_date+WeathHistkey);
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
                    // pixabay(cityName);
                    // restcountries(countryCode) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                    } catch (error) {
                        console.error(error);
                    }
        /////////////////////////////////////////////////////---------------------Third Call--------------------------------------//////////////////////////////////////////

                }else{
                    // second API call oprion 2
                    let inputLat= inputBox.latitude;
                    let inputLong= inputBox.longitude;
                    const baseUrlWeathForc = "https://api.weatherbit.io/v2.0/forecast/daily?";
                    const WeathForckey = process.env.weatherbKey;
                    let lat = `&lat=${inputLat}`;
                    let long = `&lon=${inputLong}`;
                    let start_date = `&start_date=${newDateStart}`;
                    let end_date = `&start_date=${newDateEnd}`;
                    // final url
                    const forcastUrl = (baseUrlWeathForc+lat+long+start_date+end_date+WeathForckey);
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
                    // pixabay(cityName);
                    // restcountries(countryCode) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                    } catch (error) {
                        console.error(error);
                    }
         /////////////////////////////////////////////////////---------------------Fourth Call--------------------------------------//////////////////////////////////////////
                   
                    const baseUrlPixa = "https://pixabay.com/api/?";
                    const Pixakey = process.env.pixabayKey;  
                    let search = `&q=${cityName}+city`;
                    const image_type = "&image_type=photo";
                    // final url
                    const url = (baseUrlPixa+Pixakey+search+image_type);
                
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
                    inputBox["webformatURL"]= webformatURL;
                    // return webformatURL;
                    } catch (error) {
                        console.error(error);
                    }
                }
        /////////////////////////////////////////////////////---------------------Fifth Call--------------------------------------//////////////////////////////////////////

                let CountryCode= countryCode;
                const baseUrlREST = "https://restcountries.com/v3/alpha/";
                let country = `${CountryCode}`
                // final url
                const restUrl = (baseUrlREST+country);
            
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
                inputBox["OfficialName"]= restcountriesData[0].name.official;
                inputBox["capital"]= restcountriesData[0].capital[0];
                console.log("inputBox=>", inputBox)
                inputBox["region"]= restcountriesData[0].region;
                inputBox["subregion"]= restcountriesData[0].subregion;
                inputBox["area"]= restcountriesData[0].area;
                inputBox["currencies"]= restcountriesData[0].currencies;
                inputBox["flagLink"]= restcountriesData[0].flags[0];
                console.log("inputBoxFinal 1=>", inputBox)
        
            } catch (error) {
                console.error(error);
            }
        /////////////////////////////////////////////////////---------------------SENDING--------------------------------------//////////////////////////////////////////

        console.log("about to sent=>", inputBox)
        res.status(200).send(inputBox);
        
        }catch (error) {
            console.error(error);
        }

})};
    
 



// exporting modules from there here the information and the object to be extracted is going to go back to the server
  module.exports = {
    apiCall,
    }
