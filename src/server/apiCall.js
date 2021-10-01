const axios = require('axios').default;
require('dotenv').config()
const app = require("./app.js");
// main object to extract the information back to the Client


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
    console.log("formDaysLeft=>", formDaysLeft)
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
    // axios options
        let options = {
            method: 'GET',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        };
        /////////////
        console.log("about to go to app get")
    app.get("/results", async(req,res) =>{
        console.log("options=>", options)//////////////////////////////////////////////////
        console.log("inside app get")
    
        /////////////////
    const response = await axios(options);
        try{
        let data = await response.data;
        // puting lat and lng into the latitude, longitude
        let inputLat =data.postalCodes[0].lat;
        console.log("inputLat =>", inputLat);//////////////////////////////////////
        let inputBox= Object.create({})
        inputBox["latitude"]=data.postalCodes[0].lat;
        let inputLong =data.postalCodes[0].lng;
        console.log("inputLong =>", inputLong);///////////////////////////////////
        inputBox["longitude"]=data.postalCodes[0].lng;
        // the following statements desides which of the two different prediction call is going to be used hist(ory) and forec(ast)
        if(formDaysLeft > 16){
            console.log("inside if 1");////////////////////////////////////
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // second API call option 1
                    // let inputLat= inputBox.latitude;
                    // let inputLong= inputBox.longitude;
                    const baseUrlWeathHist = "https://api.weatherbit.io/v2.0/history/daily?";
                    const WeathHistkey = process.env.weatherbKey;
                    let lat = `&lat=${inputLat}`;
                    let long = `&lon=${inputLong}`;
                    let start_date = `&start_date=${lastYearDateStart}`;
                    let end_date =  `&end_date=${lastYearDateEnd}`;
                    // final url 
                    const histUrl = (baseUrlWeathHist+lat+long+start_date+end_date+WeathHistkey);
                    console.log("histUrl=>", histUrl); /////////////////////////////////////////////////////////////////////////////
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
                }else{
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    // second API call oprion 2
                    console.log("inside if 2");///////////////////////////////////////////////////////
                    // let inputLat= inputBox.latitude;
                    // let inputLong= inputBox.longitude;
                    const baseUrlWeathForc = "https://api.weatherbit.io/v2.0/forecast/daily?";
                    const WeathForckey = process.env.weatherbKey;
                    let lat = `&lat=${inputLat}`;
                    console.log("lat =>", lat);///////////////
                    let long = `&lon=${inputLong}`;
                    console.log("long =>", long);///////////////
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
                        console.log("options2=>", options2);//////////////////////////////////////
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
                    
                    let CityName= cityName;
                    const baseUrlPixa = "https://pixabay.com/api/?";
                    const Pixakey = process.env.pixabayKey;  
                    let search = `&q=${CityName}+city`;
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
                    console.log("webformatURL=>", webformatURL);////////////////////////////////////
                    // return webformatURL;
                    } catch (error) {
                        console.error(error);
                    }
                }
///////////////////////////////////^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^????????????????????????????????????
                let CountryCode= countryCode;
                console.log("CountryCode=>", CountryCode);//////////////////////////////////
                const baseUrlREST = "https://restcountries.com/v3/alpha/";
                let country = `${CountryCode}`
                // final url
                const restUrl = (baseUrlREST+country);
                console.log("restUrl =>", restUrl)
            
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
                console.log("restcountriesData=>", restcountriesData); //////////////////////////////////////////////////////////
                // all the information taken is put in the exporting object
                inputBox["OfficialName"]= restcountriesData[0].name.official;
                // inputBox["callingCodes"]= restcountriesData.callingCodes;
                inputBox["capital"]= restcountriesData[0].capital[0];
                console.log("inputBox=>", inputBox)
                inputBox["region"]= restcountriesData[0].region;
                inputBox["subregion"]= restcountriesData[0].subregion;
                // inputBox["population"]= restcountriesData[0].population;
                inputBox["area"]= restcountriesData[0].area;
                inputBox["currencies"]= restcountriesData[0].currencies;
                inputBox["flagLink"]= restcountriesData[0].flags[0];
                console.log("inputBoxFinal 1=>", inputBox)
                  ///////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!/////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log("inputBox Final 2 =>", inputBox);
        
            } catch (error) {
                console.error(error);
            }
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
