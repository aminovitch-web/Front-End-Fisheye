const photographersFactory = (data) => {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;
  
    function getIndexPhotographerDOM() {
      const article = document.createElement("article");
      article.classList.add("card");
    
      const photographerLinkElement = document.createElement("a");
      photographerLinkElement.classList.add("card__link");
      photographerLinkElement.setAttribute("href", `photographer.html?id=${id}`);
      photographerLinkElement.setAttribute("aria-label", `Lien vers le portfolio de ${name}`);
    
      const photographerImgElement = document.createElement("img");
      photographerImgElement.classList.add("card__img");
      photographerImgElement.setAttribute("src", picture);
      photographerImgElement.setAttribute("alt", `Photo de ${name}`);
    
      const infoElement = document.createElement("div");
      infoElement.classList.add("info");
    
      const photographerNameElement = document.createElement("h2");
      photographerNameElement.classList.add("card__photographeName");
      photographerNameElement.textContent = name;
    
      const cityElement = document.createElement("p");
      cityElement.classList.add("card__city");
      cityElement.textContent = city + ", " + country;
    
      const tagLineElement = document.createElement("p");
      tagLineElement.classList.add("card__tagline");
      tagLineElement.textContent = tagline;
    
      const priceElement = document.createElement("p");
      priceElement.classList.add("card__price");
      priceElement.textContent = price + " €";
    
      photographerLinkElement.appendChild(photographerImgElement);
    
      infoElement.appendChild(photographerNameElement);
      infoElement.appendChild(cityElement);
      infoElement.appendChild(tagLineElement);
      infoElement.appendChild(priceElement);
    
      article.appendChild(photographerLinkElement);
      article.appendChild(infoElement);
    
      return article;
    }
    
    
  
    return {
      name,
      id,
      city,
      country,
      tagline,
      price,
      portrait,
      getIndexPhotographerDOM,
    };
  };

  


