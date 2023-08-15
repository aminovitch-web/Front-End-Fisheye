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
  const photographerCardHeader = document.querySelector(".photograph-header");
  const photographerModel = photographersFactory(photographerInformation);
  const photographerCardHeaderElement = photographerModel.getPhotographerCardHeader(photographerCardHeader);
  
  if (photographerCardHeader) {
    photographerCardHeader.appendChild(photographerCardHeaderElement);
  } else {
    console.log("L'élément photograph-header n'a pas été trouvé dans le DOM.");
  }
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

const getPriceById = async (id) => {
  try {
    const photographerJson = await getAllDataService();
    const photographers = photographerJson.photographers;

    const photographer = photographers.find((p) => p.id === parseInt(id));

    if (photographer) {
      return photographer.price;
    } else {
      console.log("Error: Photographer not found");
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const displayPhotographerCard = async (id) => {
  try {
    const totalLikes = await getTotalLikesCard(id);
    const photographerPrice = await getPriceById(id);

    const photographerCard = document.createElement("section");
    photographerCard.classList.add("card-informations");
    photographerCard.setAttribute("aria-label", "total like et prix");

    const likesSpan = document.createElement("span");
    likesSpan.textContent = `${totalLikes} ♥`;

    const priceSpan = document.createElement("span");
    priceSpan.textContent = `${photographerPrice}€ / jour`;

    photographerCard.appendChild(likesSpan);
    photographerCard.appendChild(priceSpan);

    const cardSection = document.querySelector(".card"); 
    cardSection.appendChild(photographerCard);

  } catch (error) {
    console.log(error);
  }
};


const init = async () => {
 try{

  const photographerInformation = await getPhotographerById(id);
  displayPhotographHeaderData(photographerInformation);
  const mediaPhotographer = await getMediaByPhotographer(id);
  displayMedia(mediaPhotographer);
  displayPhotographerCard(parseInt(id));
  console.log(photographerInformation);

 } catch (error) {
   console.error("Erreur lors de l'initialisation : ", error);
 }


}

init();



