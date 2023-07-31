const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get("id");
const filterButton = document.getElementsByClassName("filterButton");


const getPhotographerById = async (id) => {
  try {
    const photographerJson = await getAllDataServices();
    const photographer = photographerJson.find((photographer) => photographer.id === id);
    return photographer;
  } catch (error) {
    console.log("erreur récupération de photographe:", error);
    return null;
  }
};

const displayPhotographerProfil = async (photographer) => {
  const photographHeader = document.querySelector(".photograph-header");

  const photographerArray = Array.isArray(photographer)
    ? photographer
    : Object.values(photographer);

  photographerArray.forEach((photographer) => {
    const photographerModel = photographersFactory(photographer);
    const profileCardDOM = photographerModel.getProfilePhotographerDOM();
    photographHeader.appendChild(profileCardDOM);
  });
};

const filterMedia = async () => {
  try {
    const filterButton = document.querySelector(".filterButton"); // Sélectionner l'élément avec la classe "filterButton"

    filterButton.addEventListener("input", function() {
      const selectedFilter = filterButton.value;

      switch (selectedFilter) {
        case "popular":
          console.log("filtrer par populaire");
          
          break;
        case "title":
          console.log("filtrer par titre");
          break;
        default:
          console.log("aucun tri selectionné");
          break;
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des médias :', error);
    return null;
  }
};



const init = async () => {
  try {
    const photographer = await getPhotographerById(id);
    displayPhotographerProfil(photographer);
    console.log(photographer);
  } catch (error) {
    console.error("erreur lors de l'initialisation :", error);
  }
};

init();
