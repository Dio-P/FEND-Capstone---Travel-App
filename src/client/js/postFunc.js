const axios = require('axios').default;

async function postData( url = " ", data = {}){
  try {
    const response = await axios.post(url, {data})
    console.log(response); 
    return response; 
  } catch (error) {
    console.error(error);
  }
}
  export {postData}
