
import axios from 'axios';
    import Litepicker from 'litepicker';

// import {fetch} from'node-fetch';
let UI_Inp = {}
new Litepicker({
    element: document.getElementById('datepicker'),
    singleMode: false,
    tooltipText: {
      one: 'night',
      other: 'nights'
    },
    tooltipNumber: (totalDays) => {
      return totalDays - 1;
    }
  })

async function handleSubmit(event) {
    // const form = document.getElementById('form');
    // form.addEventListener('submit', logSubmit, true);
    // let newUrl = {}
    // log.textContent = 
    // console.log(`Form Submitted! Time stamp: ${event.timeStamp}`);
    event.preventDefault()
    // let formText = document.getElementById("url").value;
    let formDate= document.getElementById("date").value;
    console.log("formDate =>", formDate);

    let formCity= document.getElementById("city").value;
    console.log("formCity=>", formCity);
    alert(UI_Inp);
    // you need to send all to the server, in one, or seperate objects !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // CreateNURL(formText);
    // console.log("newUrl is !!!!!!!!!!!!!==>", newUrl);
    // UI_Inp["newUrl"]=newUrl;
    UI_Inp["formCity"]=formCity;
    UI_Inp["formDate"]=formDate;
    console.log(UI_Inp);
    Client.postData("/UI_Inp", {UI_Inp})

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
        console.log("imgURL!!!!!!!! ==>", imgURL);
        document.getElementById("imgHolder").innerHTML = `<img id="mainImg" src="${imgURL}"></img>`
        // console.log("agreement : "+ response.agreement +"  subjectivity : "+ response.subjectivity+"  confidence : "+response.confidence+"  irony : "+response.irony);
        // document.getElementById('results').innerHTML = "agreement : "+ response.agreement +"  subjectivity : "+ response.subjectivity+"  confidence : "+response.confidence+"  irony : "+response.irony 
        // return response
    }catch(error){
        console.log("error", error);
    }
}


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

export { handleSubmit, }
