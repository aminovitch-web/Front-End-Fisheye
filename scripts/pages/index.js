const getPhotographers = async () => {
  try {
    const photographersJson = await getAllDataService();
    return photographersJson;
  } catch (error) {
    console.error("Erreur lors de la récupération des photographes :", error);
 
  }
};

const displayData = async (photographers) => {
  const photographersSection = document.querySelector(".photographer_section");

  const photographerArray = Array.isArray(photographers)
    ? photographers
    : Object.values(photographers);

  photographerArray.forEach((photographer) => {
    const photographerModel = photographersFactory(photographer);
    const userCardDOM = photographerModel.getIndexPhotographerDOM();
    photographersSection.appendChild(userCardDOM);
  });
};


const init = async () => {
  try {
    
    const {photographers} = await getPhotographers();
    displayData(photographers)
    console.log(photographers);

  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error);
  }
};

init();
