import { initializeForm } from '../utils/contactForm.js'
const photographersFactory = (data) => {
  const { name, id, city, country, tagline, price, portrait } = data
  const picture = `assets/photographers/${portrait}`

  function getIndexPhotographerDOM () {
    const article = document.createElement('article')
    article.classList.add('card')

    const photographerLinkElement = document.createElement('a')
    photographerLinkElement.classList.add('card__link')
    photographerLinkElement.setAttribute('href', `photographer.html?id=${id}`)
    photographerLinkElement.setAttribute('aria-label', `Lien vers le portfolio de ${name}`)

    const photographerImgElement = document.createElement('img')
    photographerImgElement.classList.add('card__img')
    photographerImgElement.setAttribute('src', picture)
    photographerImgElement.setAttribute('alt', `Photo de ${name}`)

    const infoElement = document.createElement('div')
    infoElement.classList.add('info')

    const photographerNameElement = document.createElement('h2')
    photographerNameElement.classList.add('card__photographeName')
    photographerNameElement.textContent = name

    const cityElement = document.createElement('p')
    cityElement.classList.add('card__city')
    cityElement.textContent = city + ', ' + country

    const tagLineElement = document.createElement('p')
    tagLineElement.classList.add('card__tagline')
    tagLineElement.textContent = tagline

    const priceElement = document.createElement('p')
    priceElement.classList.add('card__price')
    priceElement.textContent = price + ' €'

    photographerLinkElement.appendChild(photographerImgElement)

    infoElement.appendChild(photographerNameElement)
    infoElement.appendChild(cityElement)
    infoElement.appendChild(tagLineElement)
    infoElement.appendChild(priceElement)

    article.appendChild(photographerLinkElement)
    article.appendChild(infoElement)

    return article
  }

  function getPhotographerCardHeader (photographerCardHeader) {
    const photographInfos = document.createElement('div')
    photographInfos.classList.add('photograph__infos')
    const photographName = document.createElement('h2')
    photographName.setAttribute('aria-label', ` Nom du photographe ${name}`)
    photographName.setAttribute('tabIndex', '0')
    photographName.textContent = name
    const photographCity = document.createElement('span')
    photographCity.setAttribute('aria-label', ` ville ${city} pays ${country}`)
    photographCity.setAttribute('tabIndex', '0')
    photographCity.textContent = city + ',' + country
    const photographTagLine = document.createElement('p')
    photographTagLine.setAttribute('aria-label', ` texte de présentation ${tagline}`)
    photographTagLine.setAttribute('tabIndex', '0')
    photographTagLine.textContent = tagline

    const contactButton = document.createElement('button')
    contactButton.classList.add('contact_button')
    contactButton.id = 'contact_button'
    const msgButton = document.createTextNode('contactez moi')
    contactButton.setAttribute('aria-label', ` contactez ${name}`)
    contactButton.setAttribute('tabIndex', '0')
    contactButton.appendChild(msgButton)
    initializeForm(contactButton, name)
    const photographPortrait = document.createElement('div')
    photographPortrait.classList.add('photograph__pictures')

    const photographImg = document.createElement('img')
    photographImg.setAttribute('src', picture)
    photographImg.setAttribute('alt', 'Photo du photographe' + name)

    if (photographerCardHeader) {
      photographInfos.appendChild(photographName)
      photographInfos.appendChild(photographCity)
      photographInfos.appendChild(photographTagLine)

      photographPortrait.appendChild(photographImg)

      photographerCardHeader.appendChild(photographInfos)
      photographerCardHeader.appendChild(contactButton)
      photographerCardHeader.appendChild(photographPortrait)
    } else {
      console.log('erreur')
    }

    return photographerCardHeader
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
    getPhotographerCardHeader
  }
}
export { photographersFactory }
