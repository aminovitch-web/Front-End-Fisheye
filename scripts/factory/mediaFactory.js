const mediaFactory = (data) => {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  let mediaType;
  if (image) {
    mediaType = "image";
  } else if (video) {
    mediaType = "video";
  }



  function getMediaDom() {
    const articleTag = document.createElement("article");
    articleTag.classList.add("card");
    articleTag.setAttribute("id", id);
    if (mediaType === "image") {
      const imgTag = document.createElement("img");
      imgTag.setAttribute("src", "assets/media/" + image);
      imgTag.setAttribute("alt", "Photo " + title);
      imgTag.classList.add("media-img");
      imgTag.setAttribute("tabindex", "0"); 
      imgTag.setAttribute("aria-label", "Photo " + title); 
      articleTag.appendChild(imgTag);
    } else if (mediaType === "video") {
      const videoTag = document.createElement("video");
      videoTag.setAttribute("src", "assets/media/" + video);
      videoTag.setAttribute("control", "false");
      videoTag.setAttribute("tabindex", "0"); 
      videoTag.setAttribute("aria-label", "Vidéo " + title); 
      articleTag.appendChild(videoTag);
    }

    const divTag = document.createElement("div");

    const titleTag = document.createElement("span");
    titleTag.textContent = title;
    divTag.appendChild(titleTag);

    const buttonTag = document.createElement("button");
    buttonTag.classList.add("like");
    buttonTag.classList.add("like-button")
    buttonTag.setAttribute("aria-label", "bouton pour aimer");
    buttonTag.textContent = `${likes} ♥`;

    buttonTag.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleLike(buttonTag);
  });


    divTag.appendChild(buttonTag);
    
    
    const toggleLike = (likeButton) => {
      let likesSpan = document.querySelector(".total-likes");
      const isLiked = likeButton.classList.contains("liked");
      
      if (isLiked) {
        likeButton.classList.remove("liked");
        likeButton.textContent = `${parseInt(likeButton.textContent) - 1} ♥`;
        likesSpan.textContent = parseInt(likesSpan.textContent) - 1+" ♥";
      } else {
        likeButton.classList.add("liked");
        likeButton.textContent = `${parseInt(likeButton.textContent) + 1} ♥`;
        likesSpan.textContent = parseInt(likesSpan.textContent) + 1+" ♥";
      }
    };
    

    articleTag.appendChild(divTag);

    return articleTag;
    
    
  }

  return {
    id,
    photographerId,
    title,
    image,
    video,
    likes,
    date,
    price,
    getMediaDom,
  };
};