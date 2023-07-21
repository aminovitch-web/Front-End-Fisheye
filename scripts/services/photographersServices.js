async function getAllData(){
 
const URL = "../../data/photographers.json";

const response = fetch(URL);

if(response.ok){
     
     return (await response).json();
}else{
     
    console.error(response.status);
}
      
}