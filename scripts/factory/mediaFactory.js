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

    if (mediaType === "image") {
      const imgTag = document.createElement("img");
      imgTag.setAttribute("src", "assets/media/"+image); 
      imgTag.classList.add("media-img");
      articleTag.appendChild(imgTag);
      imgTag.addEventListener("click", () => {
        openLightBox(imgTag,mediaType);
      });
    } else if (mediaType === "video") {
      const videoTag = document.createElement("video");
      videoTag.setAttribute("src","assets/media/"+video);
      videoTag.setAttribute("controls","");
      articleTag.appendChild(videoTag);
      videoTag.addEventListener("click", () => {
       openLightBox(videoTag,mediaType);
      });
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

    buttonTag.addEventListener("click", () => {
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