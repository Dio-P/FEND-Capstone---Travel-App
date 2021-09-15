
import axios from 'axios';
// import {fetch} from'node-fetch';

async function handleSubmit(event) {
    let newUrl = {}
    event.preventDefault()
    let formText = document.getElementById('url').value;
    CreateNURL(formText);
    console.log("newUrl is !!!!!!!!!!!!!==>", newUrl);
    Client.postData("/url", {newUrl})

function CreateNURL(formText){
    let url = new URL(formText)
    console.log("new URL: ");
    console.log(url);
    alert(url);
    newUrl = url
    return url
}

const respons= await axios.get('http://localhost:3000/results')
    try {
        // let response = await respons.json()
        let response = await respons.data;
        console.log("res for results is!!!!!!!! ==>", response);
        console.log("agreement : "+ response.agreement +"  subjectivity : "+ response.subjectivity+"  confidence : "+response.confidence+"  irony : "+response.irony);
        document.getElementById('results').innerHTML = "agreement : "+ response.agreement +"  subjectivity : "+ response.subjectivity+"  confidence : "+response.confidence+"  irony : "+response.irony 
        return response
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
