async function getPhotographers(){
     
     const photographerJson = await getphotographersServices();
     return (photographerJson)
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
    
