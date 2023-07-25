const getPhotographers = async () => {

  const photographersJson = await getAllDataService();
  return (photographersJson);
 

}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerCard = photographersFactory(photographer);
    photographersSection.insertAdjacentHTML("beforeend", photographerCard);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();