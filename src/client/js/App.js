// /* Global Variables */
// let baseURL = "https://api.openweathermap.org/data/2.5/weather?";
// /* for my result to be displayed in metric values */
// let unitType= "&units=metric";
// const apiKey = "&appid=929e58a6f009e6103b21f1671763aac4";
// let weatherDataBox= [];
// // Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// /* the event listener that starts it all */
// document.getElementById("generate").addEventListener("click", giveNewEntry, true);

// /*function triggered by pressing the button. This combines all the .then statements*/
// function giveNewEntry(e){
//     const newFeelings = document.getElementById("feelings").value;
//     let newZip = document.getElementById("zip").value;
//     let newCC = document.getElementById("countryCode").value;
//     let zipCode= "zip="+ newZip +",";
//     let countryCode= newCC;
//     getWeather(baseURL, zipCode, countryCode, unitType, apiKey, newDate)
//     .then(function(newTemp){
//       postData("/addWeather", {temp: newTemp, date: newDate, feelings: newFeelings})
//     })
//     .then(function(){
//       clearUI()
//     })
//     .then(function(){
//       updateUI()
//     })
// };


// /*fetch to be getting the weather. / Returning newTemp to be used later*/
// const getWeather = async (baseURL, zipCode, countryCode, unitType, apiKey)=>{
//     const res = await fetch(baseURL+zipCode+countryCode+unitType+apiKey)
//     try {
//         const weatherData = await res.json();
//         let newTemp= weatherData.main.temp;
//         return newTemp
//     }catch(error){
//         console.log("error", error);
//     }
// } 


// /*for sending the data to the server*/
// const postData = async ( url = " ", data = {})=>{
//       const response = await fetch(url, {
//       method: "POST", 
//       credentials: "same-origin",
//       headers: {
//           "Content-Type": "application/json",
//       },       
//       body: JSON.stringify(data), 
//     });

//       try {
//         const newData = await response.json();
//         return newData;
//       }catch(error) {
//       console.log("error", error);
//     }
// }


// /*clearing all the UI elements from previous entries*/
// function clearUI(){
//     document.getElementById("date").innerHTML = "";
//     document.getElementById("temp").innerHTML = "";
//     document.getElementById("content").innerHTML = "";
// }


// /*updating all the UI*/
// const updateUI= async()=>{
//     const allData = await fetch("/all")
//     try{
//       const allDataNew = await allData.json();
//       document.getElementById("date").innerHTML = "Date: "+allDataNew.date;
//       document.getElementById("temp").innerHTML = "Temerature: " +allDataNew.temp;
//       document.getElementById("content").innerHTML = "My feelings: " +allDataNew.feelings;
//     }catch(error){
//       console.log("error", error);
//     }
// }