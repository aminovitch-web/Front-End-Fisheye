function photographersFactory(data){

     //destructuration 

     const {id, city, country, tagline, price, name, portrait } = data;
   
     //assigner constante img  avec literaux de gabarit

     const picture = `assets/photographers/${portrait}`;

     // article photographe avec toute les infos

     var article =` <article class="photographer">
     <a href="./photographer.html?id=${id}" class="photographer__header" aria-label="${name}">
         <img class="photographer__img" src="${picture}" alt="${name}">
         <h2 class="photographer__name">${name}</h2>
     </a>
     <div class="photographer__content" role ="Text paragraph">
         <p class="photographer__location">${city}, ${country}</p>
         <p class="photographer__tagline">${tagline}</p>
         <p class="photographer__price">${price}€/jour</p>
     </div>
     <div>`;
 }
// page profil  
 function mediaFactory(data){

 }

 function getTotalLike(){


 }

 export { photographersFactory };