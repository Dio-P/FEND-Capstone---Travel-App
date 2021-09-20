
import axios from 'axios';
    import Litepicker from 'litepicker';

// import {fetch} from'node-fetch';
let UI_Inp = {}
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
//  console.log(endDate)
async function handleSubmit(event) {
    // const form = document.getElementById('form');
    // form.addEventListener('submit', logSubmit, true);
    // let newUrl = {}
    // log.textContent = 
    // console.log(`Form Submitted! Time stamp: ${event.timeStamp}`);
    event.preventDefault()
    // let formText = document.getElementById("url").value;
    // let formDate= document.getElementById("date").value;
    let formDate= document.getElementById('datepicker').value
    let date = formDate.split("-");
    console.log("formDate =>", formDate);
    console.log("date =>", date);
    let numDateYear = parseInt(date[0]);
    let numDateMonth = parseInt(date[1]);
    let numDateDay = parseInt(date[2]);
    console.log(" numDateYear =>", numDateYear)
    console.log(" numDateMonth =>", numDateMonth)
    console.log(" numDateDay =>", numDateDay)
    let newDateStart = `${numDateYear}-${numDateMonth}-${numDateDay}`
    let newDateEnd = `${numDateYear}-${numDateMonth}-${numDateDay+1}`
    let lastYearDateStart = `${numDateYear-1}-${numDateMonth}-${numDateDay}` //.toString();
    let lastYearDateEnd = `${numDateYear-1}-${numDateMonth}-${numDateDay+1}`
    console.log("newDateStart=>", newDateStart);
    console.log("newDateEnd=>", newDateEnd);
    console.log("lastYearDateStart=>", lastYearDateStart);
    console.log("lastYearDateEnd=>", lastYearDateEnd);

    


    // let date = formDate.split(' ');
    // console.log(date);
    // let startingDate = date[0];
    // console.log("startingDate =>", startingDate);
    // let endData = date[2];
    // console.log("endData =>", endData);

    let formCity= document.getElementById("city").value;
    console.log("formCity=>", formCity);
    let formCountry= document.getElementById("country").value;
    console.log("formCountry=>", formCountry);

    const countDownDate = new Date(formDate).getTime(); // input from the UI. but in what form

    // Run myfunc every second
    const myfunc = setTimeout(function() {

    const now = new Date().getTime();
  
    // console.log("now =>", now);
    // console.log("new Date().toString() =>", new Date().toString());

    var timeleft = countDownDate - now;
        
    // Calculating the days, hours, minutes and seconds left
    let formDaysLeft = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    // var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    // var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        
    // Result is output to the specific element
    document.getElementById("days").innerHTML = formDaysLeft + " days remaining until your trip"
    // document.getElementById("hours").innerHTML = hours + "h " 
    // document.getElementById("mins").innerHTML = minutes + "m " 
    // document.getElementById("secs").innerHTML = seconds + "s " 
        
    // Display the message when countdown is over
    // if (timeleft < 0) {
    //     clearInterval(myfunc);
    //     document.getElementById("days").innerHTML = ""
    //     document.getElementById("hours").innerHTML = "" 
    //     document.getElementById("mins").innerHTML = ""
    //     document.getElementById("secs").innerHTML = ""
    //     document.getElementById("end").innerHTML = "TIME UP!!";
    // }
    UI_Inp["formDaysLeft"]=formDaysLeft;
    UI_Inp["formCity"]=formCity;
    UI_Inp["formCountry"]=formCountry;
    UI_Inp["newDateStart"]=newDateStart;
    UI_Inp["newDateEnd"]=newDateEnd;
    UI_Inp["lastYearDateStart"]=lastYearDateStart;
    UI_Inp["lastYearDateEnd"]=lastYearDateEnd;
    Client.postData("/UI_Inp", {UI_Inp});
    console.log("UI_Inp =>", UI_Inp);
    // alert(UI_Inp);
    clearInterval()
    
    return (UI_Inp);
    }, 0)
    
    
      
  
    
    
    // you need to send all to the server, in one, or seperate objects !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // CreateNURL(formText);
    // console.log("newUrl is !!!!!!!!!!!!!==>", newUrl);
    // UI_Inp["newUrl"]=newUrl;
    
    // UI_Inp["endData"]=endData;
    

// function CreateNURL(formText){
//     let url = new URL(formText)
//     console.log("new UI_Inp: ");
//     console.log(UI_Inp);
//     alert(UI_Inp);
//     newUrl = url
//     return url
// }

const respons= await axios.get('http://localhost:3000/results')
    try {
        // let response = await respons.json()
        console.log("respons =>",respons);
        let ClInputBox = await respons.data;
        console.log("ClInputBox!!!!!!!! ==>", ClInputBox);
        let imgURL = ClInputBox.webformatURL;
        let min_temp = ClInputBox.min_temp;
        let max_temp = ClInputBox.max_temp;
        // countries info declarations

        //adding dots
        let population = ClInputBox.population;
        let area = ClInputBox.area;
                    //this is what I am working now !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // let DotPopulation = population.split('');
        // console.log(DotPopulation);
        // let DotArea = area.split('');
        // console.log(DotArea);

        let OfficialName = ClInputBox.OfficialName;
        let callingCodes = ClInputBox.callingCodes;
        let capital = ClInputBox.capital;
        let region = ClInputBox.region;
        let subregion = ClInputBox.subregion;
        //Updating the U.I. elements
        console.log("imgURL!!!!!!!! ==>", imgURL);
        document.getElementById("imgHolder").innerHTML = `<img id="mainImg" src="${imgURL}"></img>`
        document.getElementById("prognosis").innerHTML = `the minimum temperature will be ${min_temp} <br> the maximum temperature will be ${max_temp}`
        document.getElementById("results").innerHTML = `Official Name = ${OfficialName} <br> Calling Code = ${callingCodes} <br> Capital City = ${capital} <br> Region = ${region} <br> Subregion = ${subregion} <br> Population = ${population} millions <br> Area = ${area} square meters`
        // console.log("agreement : "+ response.agreement +"  subjectivity : "+ response.subjectivity+"  confidence : "+response.confidence+"  irony : "+response.irony);
        // document.getElementById('results').innerHTML = "agreement : "+ response.agreement +"  subjectivity : "+ response.subjectivity+"  confidence : "+response.confidence+"  irony : "+response.irony 
        // return response min_temp":12.8,"max_temp"
    }catch(error){
        console.log("error", error);
    }
}
//  // let d = new Date();
//   // let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
//   // let countDownDate = new Date("Sep 5, 2018").getTime();
// let countDown = setInterval(function() { 










//   // let distance = countDownDate - now;      
//   // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
// }

// const respons= await fetch('http://localhost:3000/results')
//     try {
//         let response = await respons.json()
//         console.log("res for results is!!!!!!!! ==>", response);
//         console.log("agreement : "+ response.agreement +"  subjectivity : "+ response.subjectivity+"  confidence : "+response.confidence+"  irony : "+response.irony);
//         document.getElementById('results').innerHTML = "agreement : "+ response.agreement +"  subjectivity : "+ response.subjectivity+"  confidence : "+response.confidence+"  irony : "+response.irony 
//         return response
//     }catch(error){
//         console.log("error", error);
//     }
// }

export { handleSubmit }
