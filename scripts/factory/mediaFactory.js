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
      articleTag.appendChild(imgTag);
    } else if (mediaType === "video") {
      const videoTag = document.createElement("video");
      videoTag.setAttribute("src","assets/media/"+video);
      videoTag.setAttribute("controls","");
      articleTag.appendChild(videoTag);
    }

    const divTag = document.createElement("div");

    const titleTag = document.createElement("span");
    titleTag.textContent = title;
    divTag.appendChild(titleTag);

    const buttonTag = document.createElement("button");
    buttonTag.classList.add("like");
    buttonTag.setAttribute("aria-label", "bouton pour aimer");
    buttonTag.textContent = `${likes} ♥`;
    divTag.appendChild(buttonTag);

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