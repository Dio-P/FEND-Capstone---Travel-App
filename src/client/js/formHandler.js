
import axios from 'axios';
import Litepicker from 'litepicker';

let UI_Inp = {}
// creating new Litepicker to be used to get the date
new Litepicker({
    element: document.getElementById('datepicker'),
    singleMode: true,
    tooltipText: {
      one: 'night',
      other: 'nights'
    },
    tooltipNumber: (totalDays) => {
      return totalDays - 1;
    }
  })

// //To be activated later on !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//   //google autofill
//   function initialize() {
// //to show only cities
//     var options = {
//       types: ['(cities)']
//      };
//     var input = document.getElementById('city');
//     new google.maps.places.Autocomplete(input);
//   }
//   google.maps.event.addDomListener(window, 'load', initialize);

// our main function, trigered by the form submit
async function handleSubmit(event) {
    
    event.preventDefault()
    document.getElementById("country").classList.remove('error');
    // Get date
    let formDate= document.getElementById('datepicker').value
    // turn the date into something that you can use flexibly
    // Seperate the data to get an aray of strings that have one number in
    let date = formDate.split("-");
    console.log("formDate =>", formDate);
    console.log("date =>", date);
    // seperate the data into day month and year
    let numDateYear = parseInt(date[0]);
    let numDateMonth = parseInt(date[1]);
    let numDateDay = parseInt(date[2]);
    console.log(" numDateYear =>", numDateYear)
    console.log(" numDateMonth =>", numDateMonth)
    console.log(" numDateDay =>", numDateDay)
    // use this to create the new start and end date to use the to the API call
    let newDateStart = `${numDateYear}-${numDateMonth}-${numDateDay}`
    let newDateEnd = `${numDateYear}-${numDateMonth}-${numDateDay+1}`
    let lastYearDateStart = `${numDateYear-1}-${numDateMonth}-${numDateDay}` //.toString();
    let lastYearDateEnd = `${numDateYear-1}-${numDateMonth}-${numDateDay+1}`
    console.log("newDateStart=>", newDateStart);
    console.log("newDateEnd=>", newDateEnd);
    console.log("lastYearDateStart=>", lastYearDateStart);
    console.log("lastYearDateEnd=>", lastYearDateEnd);
    // get the city and the country from the form
    let formCityBoth= document.getElementById("city").value.split(",");
    console.log("formCityBoth", formCityBoth)
    // isolate only the city from the city/country that is produced when using google autofill
    let formCity = formCityBoth[0];
    console.log("formCity=>", formCity);
    // let formCountry leads to and error handling function at the end of this file
    let formCountry= getCountry();
    console.log("formCountry=>", formCountry);
    //////////////////////////////////////////////////////////////////////////////////////////

    // create a new Date to have against now
    const countDownDate = new Date(formDate).getTime();
    // get the days remaining from now to the chosen date
    const myfunc = setTimeout(function() {
      // get the date now
    const now = new Date().getTime();
      // calculate days remaining
    var timeleft = countDownDate - now;
    let formDaysLeft = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    document.getElementById("days").innerHTML = "There are " + formDaysLeft + " days remaining until your trip."
    // Put everything on the UI_Inp object to send them to the server 
    UI_Inp["formDaysLeft"]=formDaysLeft;
    UI_Inp["formCity"]=formCity;
    UI_Inp["formCountry"]=formCountry;
    UI_Inp["newDateStart"]=newDateStart;
    UI_Inp["newDateEnd"]=newDateEnd;
    UI_Inp["lastYearDateStart"]=lastYearDateStart;
    UI_Inp["lastYearDateEnd"]=lastYearDateEnd;
    // post the object to the server
    Client.postData("/UI_Inp", {UI_Inp});
    console.log("UI_Inp =>", UI_Inp);
    // clearInterval()
    return (UI_Inp);
    }, 0)


    // this is the second part. From here on we do with the information that has allready been processed by the server to update the U.I.
    // async axios call to the server 
const respons= await axios.get('http://localhost:3000/results')
.then(async function(respons){
  let ClInputBox = await respons.data;
  console.log("ClInputBox!!!!!!!! ==>", ClInputBox);
  return ClInputBox})
  .then(ClInputBox=>{
    try {
        // console.log("respons =>",respons);
        // let ClInputBox = await respons.data;
        // console.log("ClInputBox!!!!!!!! ==>", ClInputBox);
        // from our data we are declaring those that we need to update the first box of our U.I. with the min and max temperature
        let imgURL = ClInputBox.webformatURL;
        let min_temp = ClInputBox.min_temp;
        let max_temp = ClInputBox.max_temp;
        // adding some dots to the population and area values to seem more natural to the eye
        let area = ClInputBox.area.toLocaleString() + "";
        // declaring the second set of info we need for the second box with the information about the country
        let OfficialName = ClInputBox.OfficialName;
        let callingCodes = ClInputBox.callingCodes;
        let capital = ClInputBox.capital;
        let region = ClInputBox.region;
        let subregion = ClInputBox.subregion;
        let formDaysLeft = ClInputBox.formDaysLeft
        let flagLink = ClInputBox.flagLink ///////////////////////////////////////////////
        // updating the U.I.

        // inputBox["OfficialName"]= restcountriesData[0].name.official;
        // // inputBox["callingCodes"]= restcountriesData.callingCodes;
        // inputBox["capital"]= restcountriesData[0].capital[0];
        // console.log("inputBox=>", inputBox)
        // inputBox["region"]= restcountriesData[0].region;
        // inputBox["subregion"]= restcountriesData[0].subregion;
        // // inputBox["population"]= restcountriesData[0].population;
        // inputBox["area"]= restcountriesData[0].area;
        // inputBox["currencies"]= restcountriesData[0].currencies;
        // inputBox["flagLink"]= restcountriesData[0].flags[0];
        // console.log("inputBox=>", inputBox)
    


        console.log("imgURL!!!!!!!! ==>", imgURL);
        document.getElementById("imgHolder").innerHTML = `<img id="mainImg" src="${imgURL}"></img>`;
        document.getElementById("flagImgHolder").innerHTML = `<img id="flagImg" src="${flagLink}"></img>`;
        document.getElementById("results").innerHTML = `-Official Name : ${OfficialName} <br> -Capital City : ${capital} <br> -Region : ${region} <br> -Subregion : ${subregion} <br> -Area : ${area} km²`
        document.getElementById("pixabayLogoBox").innerHTML = `<img id="pixabayLogoImg" src="https://pixabay.com/static/img/public/leaderboard_a.png" alt="Pixabay">`
        // If we have used the historic prediction U.I. we add one more line to the box
        if(formDaysLeft> 16){
          document.getElementById("prognosis").innerHTML = `A typical weather for then is: <br> Min: ${min_temp} <br> Max: ${max_temp}`
        }else{
          document.getElementById("prognosis").innerHTML = `Min. Temperature : ${min_temp} <br> Max. Temperature : ${max_temp}`
        }
    }catch(error){
        console.log("error", error);
    }
})
};
// error handling function in the case that the country box has under or more the three digits
function getCountry(){
  let formTheCountry= document.getElementById("country").value + "";

  console.log("function working")
  console.log("formTheCountry=>", formTheCountry.length);
  if(formTheCountry.length >2){
    document.getElementById("country").classList.add('error');
    alert("Error! Country value needs to be only two letters");
    throw new Error("Error! Country value needs to be only two letters");
  }else if(formTheCountry.length <2){
    document.getElementById("country").classList.add('error');
    alert("Error! Country value needs to be atleast two letters");
    throw new Error("Error! Country value needs to be atleast two letters");
  }else{
    return formTheCountry
  }
}

// exporting our main function.
export { handleSubmit }
