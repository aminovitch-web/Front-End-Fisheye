const photographersFactory = (data) => {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.classList.add("card");

        const img = document.createElement('img');
        img.setAttribute("src", picture);

        const photographeNameElement = document.createElement('h2');
        photographeNameElement.classList.add("card__photographeName");
        photographeNameElement.textContent = name;

        const cityElement = document.createElement('p');
        cityElement.classList.add("card__city");
        cityElement.textContent = city;

        const tagLineElement = document.createElement('p');
        tagLineElement.classList.add("card__tagline");
        tagLineElement.textContent = tagline;

        const priceElement = document.createElement('p');
        priceElement.classList.add("card__price");
        priceElement.textContent = price;

        // Ajout des éléments dans l'article
        article.appendChild(img);
        article.appendChild(photographeNameElement); // Utiliser photographeNameElement ici
        article.appendChild(cityElement);
        article.appendChild(tagLineElement);
        article.appendChild(priceElement);

        return article;
    }

    return { name, id, city, country, tagline, price, portrait, getUserCardDOM };
}

const photographersProfilFactory = (data) => {


    
}
