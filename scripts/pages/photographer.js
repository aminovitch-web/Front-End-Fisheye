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
    console.log(error);
    return null;
  }
};

const getMediaByPhotographer = async (id) => {
    try{
      const photographersJson = await getAllDataService();
      const medias = photographersJson.media;

      const mediasData = medias.find((m) => m.photographerId === parseInt(id));

      if(mediasData){
        console.log("media photograph:", mediasData);
        return mediasData;
      } else{
        console.log("photographer not found", id);
        return null;
      }
    }catch(error) {
      console.log( error);
      return null;
    }
}

const displayPhotographHeaderData = async (photographerInformation) => {
  let photographerCardHeader = document.querySelector(".photograph-header");
  const photographerArray = Array.isArray(photographerInformation)
    ? photographerInformation
    : Object.values(photographerInformation);

  photographerArray.forEach((photographerInfo) => {
    const photographerModel = photographerFactory(photographerInfo);
    const photographerCardHeaderElement = photographerModel.getPhotographerCardHeader(photographerInfo);
    photographerCardHeader.appendChild(photographerCardHeaderElement);
  });
}




const displayMedia = async (mediaPhotographer) => {
  let mediaSection = document.querySelector(".medias");
  const photographerArray = Array.isArray(mediaPhotographer)
    ? mediaPhotographer
    : Object.values(mediaPhotographer);

  photographerArray.forEach((mediaPhotographer) => {
    const photographerModel = mediaFactory(mediaPhotographer);
    const photographerMedia = photographerModel.getMediaDom();
    mediaSection.appendChild(photographerMedia);
  });
}

const getTotalLikesCard = async(id) => {
    try{
    const photographersJson = await getAllDataService();
    const medias = photographersJson.media;

    const totalLikes = medias.filter(media => media.photographerId === id).reduce((acc,media) => acc+media.likes,0);
   return totalLikes;

    }catch(error){
      console.log(error)
    }
}


const init = async () => {
 try{

  const photographerInformation = await getPhotographerById(id);
  displayPhotographHeaderData(photographerInformation);
  console.log(photographerInformation);

 } catch (error) {
   console.error("Erreur lors de l'initialisation : ", error);
 }


}

