const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get("id");
const filterButton = document.getElementsByClassName("filterButton");


const getPhotographerById = async (id) => {
  try {
    const photographerJson = await getAllDataService();
    const photographers = photographerJson.photographers;
    
    
    const photographer = photographers.find((p) => p.id === parseInt(id));
    
    if (photographer) {
     
      console.log("Photographer information:", photographer);
      
      return photographer;
    } else {
      console.log("Photographer not found with ID:", id);
      return null;
    }
  } catch (error) {
    console.log("Error while retrieving photographer:", error);
    return null;
  }
};


getPhotographerById(id);
