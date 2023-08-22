const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get("id");


const getPhotographerById = async (id) => {
    try {
        const photographerJson = await getAllDataService();
        const photographers = photographerJson.photographers;

        const photographer = photographers.find((p) => p.id === parseInt(id));

        if (photographer) {
            return photographer;
        } else {
            console.log("Photographer not found with ID:", id);
            window.location.href = "index.html";
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getMediaByPhotographer = async (id) => {
    try {
        const photographersJson = await getAllDataService();
        const medias = photographersJson.media;

        const mediasData = medias.filter(
            (m) => m.photographerId === parseInt(id)
        );

        if (mediasData.length > 0) {
            console.log("media photograph: :", mediasData);
            return mediasData;
        } else {
            console.log("No media found for photographer", id);
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const displayPhotographHeaderData = async (photographerInformation) => {
    const photographerCardHeader = document.querySelector(".photograph-header");
    const photographerModel = photographersFactory(photographerInformation);
    const photographerCardHeaderElement =
        photographerModel.getPhotographerCardHeader(photographerCardHeader);

    if (photographerCardHeader) {
        photographerCardHeader.appendChild(photographerCardHeaderElement);

        console.log(photographerCardHeader);
    } else {
        console.log(
            "L'élément photograph-header n'a pas été trouvé dans le DOM."
        );
    }
};

const filterMedia = (media, filter) => {
    
    switch (filter) {
        case "Title":
            return media.sort(
                (a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
            );
        case "Popular":
            return media.sort((a, b) => b.likes - a.likes);
        default:
            return media;
    }
};





const displayMedia = async (mediaPhotographer, filter) => {
    try {
        const mediaSection = document.querySelector(".medias");

        if (!mediaSection) {
            console.log("La section .medias n'a pas été trouvée dans le DOM.");
            return;
        }
        const filteredOptions = filterMedia([...mediaPhotographer], filter);

        mediaSection.innerHTML = "";

        const optionsMedia = Array.isArray(filteredOptions)
            ? filteredOptions
            : Object.values(filteredOptions);
            console.log(filteredOptions);
            console.log(optionsMedia);
        optionsMedia.forEach((mediaData) => {
            const mediaModel = mediaFactory(mediaData);
            const mediaDom = mediaModel.getMediaDom();
            mediaSection.appendChild(mediaDom);
            
        });
    } catch (error) {
        console.log("Erreur lors de l'affichage des médias :", error);
    }
};



const openLightBox = (mediaData,mediaType) => {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    lightbox.id = "lightbox";
  
    const closeButton = document.createElement("span");
    closeButton.classList.add("close-button");
    closeButton.id = "closeButton";
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  
    const lightboxContent = document.createElement("div");
    lightboxContent.classList.add("lightbox-content");
  
    if (mediaType === "image") {
      const lightboxImage = document.createElement("img");
      lightboxImage.src = mediaData.src;
      lightboxImage.alt = "Lightbox Image";
      lightboxImage.classList.add("lightbox-image");
      lightboxContent.appendChild(lightboxImage);
    } else if (mediaType === "video") {
      const lightboxVideo = document.createElement("video");
      lightboxVideo.src = mediaData;
      lightboxVideo.controls = true;
      lightboxVideo.classList.add("lightbox-video");
      lightboxContent.appendChild(lightboxVideo);
    }

    const prevButton = document.createElement("button");
    prevButton.classList.add("nav-button", "prev-button");
    prevButton.id = "prevButton";
    prevButton.innerHTML = "&#8249;";
    prevButton.addEventListener("click", () => {
       
    });

    const nextButton = document.createElement("button");
    nextButton.classList.add("nav-button", "next-button");
    nextButton.id = "nextButton";
    nextButton.innerHTML = "&#8250;";
    nextButton.addEventListener("click", () => {
       
    });
    lightbox.appendChild(closeButton);
    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(prevButton);
    lightbox.appendChild(nextButton);
    const lightBoxContainer = document.querySelector(".lightBoxContainer");
    lightBoxContainer.appendChild(lightbox);
    lightbox.style.display = "block";
  };


const getTotalLikesCard = async (id) => {
    try {
        const photographersJson = await getAllDataService();
        const medias = photographersJson.media;

        const totalLikes = medias
            .filter((media) => media.photographerId === id)
            .reduce((acc, media) => acc + media.likes, 0);
        return totalLikes;
    } catch (error) {
        console.log(error);
    }
};

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
    try {
        const photographerInformation = await getPhotographerById(id);
        displayPhotographHeaderData(photographerInformation);
        const mediaPhotographer = await getMediaByPhotographer(id);
        
        const dropDown = document.querySelector(".dropdownsSelect");
        dropDown.addEventListener("change", (event) => {
            const selectedOption = event.target.value;
            console.log(selectedOption);
            displayMedia(mediaPhotographer, selectedOption);
            displayPhotographerCard(parseInt(id));
        });
        displayMedia(mediaPhotographer, "Popular");
        displayPhotographerCard(parseInt(id));
        console.log(photographerInformation);
    } catch (error) {
        console.error("Erreur lors de l'initialisation : ", error);
    }
};

init();
