import { getAllDataService } from '../services/photographersServices.js'
import { photographersFactory } from '../factory/photographersFactory.js'
import { mediaFactory } from '../factory/mediaFactory.js'

const url = new URL(window.location.href)
const params = new URLSearchParams(url.search)
const id = params.get('id')
const mediaArray = []

const getPhotographerById = async (id) => {
  try {
    const photographerJson = await getAllDataService()
    const photographers = photographerJson.photographers

    const photographer = photographers.find((p) => p.id === parseInt(id))

    if (photographer) {
      return photographer
    } else {
      console.log('Photographer not found with ID:', id)
      window.location.href = 'index.html'
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

const getMediaByPhotographer = async (id) => {
  try {
    const photographersJson = await getAllDataService()
    const medias = photographersJson.media

    const mediasData = medias.filter(
      (m) => m.photographerId === parseInt(id)
    )

    if (mediasData.length > 0) {
      return mediasData
    } else {
      console.log('No media found for photographer', id)
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

const displayPhotographHeaderData = async (photographerInformation) => {
  try {
    const photographerCardHeader =
            document.querySelector('.photograph-header')
    const photographerModel = photographersFactory(photographerInformation)
    const photographerCardHeaderElement =
            photographerModel.getPhotographerCardHeader(photographerCardHeader)

    if (photographerCardHeader && photographerCardHeaderElement) {
      if (
        !photographerCardHeader.contains(photographerCardHeaderElement)
      ) {
        photographerCardHeader.appendChild(
          photographerCardHeaderElement
        )
      }
    } else {
      console.log(
        "L'élément photograph-header n'a pas été trouvé dans le DOM."
      )
    }
  } catch (error) {
    console.log(error)
  }
}

const filterMedia = (media, filter) => {
  switch (filter) {
    case 'Title':
      return media.sort((a, b) =>
        a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
      )
    case 'Popular':
      return media.sort((a, b) => b.likes - a.likes)
    case 'Date':
      return media.sort((a, b) => new Date(b.date) - new Date(a.date))
    default:
      return media
  }
}

const displayMedia = async (mediaPhotographer, filter) => {
  try {
    const mediaSection = document.querySelector('.medias')

    if (!mediaSection) {
      console.log("La section .medias n'a pas été trouvée dans le DOM.")
      return
    }

    const filteredOptions = filterMedia([...mediaPhotographer], filter)

    mediaArray.length = 0
    filteredOptions.forEach((mediaData) => {
      mediaArray.push(mediaData.id)
    })

    console.log('mediaArray after filter change:', mediaArray)

    mediaSection.innerHTML = ''

    const optionsMedia = Array.isArray(filteredOptions)
      ? filteredOptions
      : Object.values(filteredOptions)

    optionsMedia.forEach((mediaData) => {
      const mediaModel = mediaFactory(mediaData)
      const mediaDom = mediaModel.getMediaDom()
      mediaSection.appendChild(mediaDom)
    })
  } catch (error) {
    console.log("Erreur lors de l'affichage des médias :", error)
  }
}

const openLightBox = () => {
  const cards = document.querySelectorAll('.card')
  const lightbox = document.querySelector('.lightbox')
  const lightboxContent = lightbox.querySelector('.lightbox-content')
  const closeButton = document.querySelector('.close-button')
  const nextButton = document.querySelector('.next-button')
  const prevButton = document.querySelector('.prev-button')

  let currentIndex = 0
  let isLightboxOpen = false

  const cardClickHandler = (card) => {
    currentIndex = mediaArray.indexOf(parseInt(card.getAttribute('id')))

    const imgElement = card.querySelector('.media-img')
    const videoElement = card.querySelector('video')
    let mediaContent = ''
    const mediaTitle = card.querySelector('span')
    if (imgElement) {
      const imgSrc = imgElement.getAttribute('src')
      const title = mediaTitle.textContent
      mediaContent = `<img src="${imgSrc}" alt="Lightbox Image" class="lightbox-image">
                            <span class="lightboxTitle">${title}</span>`
    } else if (videoElement) {
      const videoSrc = videoElement.getAttribute('src')
      const title = mediaTitle.textContent
      mediaContent = `<video src="${videoSrc}" autoplay controls="true" class="lightbox-video"></video>
                            <span class="lightboxTitle">${title}</span>`
    }

    lightboxContent.innerHTML = mediaContent
    lightbox.style.display = 'block'
    isLightboxOpen = true

    cards.forEach((card) => {
      card.removeEventListener('click', cardClickHandler)
    })
  }

  const navigateLightBox = (event) => {
    if (isLightboxOpen) {
      if (event.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--
      } else if (
        event.key === 'ArrowRight' &&
                currentIndex < mediaArray.length - 1
      ) {
        currentIndex++
      }

      const card = cards[currentIndex]
      cardClickHandler(card)
    }
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      if (isLightboxOpen) {
        return
      }
      cardClickHandler(card)
    })

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        if (isLightboxOpen) {
          lightbox.style.display = 'none'
          isLightboxOpen = false
          return
        }
        if (!event.target.classList.contains('like-button')) {
          cardClickHandler(card)
        }
      }
    })
  })

  document.addEventListener('keydown', navigateLightBox)

  closeButton.addEventListener('click', () => {
    lightbox.style.display = 'none'
    isLightboxOpen = false

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        if (isLightboxOpen) {
          return
        }
        cardClickHandler(card)
      })
    })
  })

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % mediaArray.length
    const nextMediaId = mediaArray[currentIndex]
    const nextCard = document.getElementById(nextMediaId)
    cardClickHandler(nextCard)
  })

  prevButton.addEventListener('click', () => {
    currentIndex =
            (currentIndex - 1 + mediaArray.length) % mediaArray.length
    const prevMediaId = mediaArray[currentIndex]
    const prevCard = document.getElementById(prevMediaId)
    cardClickHandler(prevCard)
  })
}

const getTotalLikesCard = async (id) => {
  try {
    const photographersJson = await getAllDataService()
    const medias = photographersJson.media

    const totalLikes = medias
      .filter((media) => media.photographerId === id)
      .reduce((acc, media) => acc + media.likes, 0)
    return totalLikes
  } catch (error) {
    console.log(error)
  }
}

const getPriceById = async (id) => {
  try {
    const photographerJson = await getAllDataService()
    const photographers = photographerJson.photographers

    const photographer = photographers.find((p) => p.id === parseInt(id))

    if (photographer) {
      return photographer.price
    } else {
      console.log('Error: Photographer not found')
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

const displayPhotographerCard = async (id) => {
  try {
    const totalLikes = await getTotalLikesCard(id)
    const photographerPrice = await getPriceById(id)

    const photographerCard = document.createElement('section')
    photographerCard.classList.add('card-informations')
    photographerCard.setAttribute('aria-label', 'total like et prix')

    const likesSpan = document.createElement('span')
    likesSpan.classList.add('total-likes')
    likesSpan.textContent = `${totalLikes} ♥`

    const priceSpan = document.createElement('span')
    priceSpan.textContent = `${photographerPrice}€ / jour`

    photographerCard.appendChild(likesSpan)
    photographerCard.appendChild(priceSpan)

    const cardSection = document.querySelector('.card')
    cardSection.appendChild(photographerCard)

    photographerCard.addEventListener('click', (e) => {
      e.stopPropagation()
    })
  } catch (error) {
    console.log(error)
  }
}

const init = async () => {
  try {
    const photographerInformation = await getPhotographerById(id)
    displayPhotographHeaderData(photographerInformation)
    const mediaPhotographer = await getMediaByPhotographer(id)

    const dropDown = document.querySelector('.dropdownsSelect')
    dropDown.addEventListener('change', (event) => {
      const selectedOption = event.target.value
      console.log(selectedOption)
      displayMedia(mediaPhotographer, selectedOption)
      displayPhotographerCard(parseInt(id))
      openLightBox()
    })

    mediaPhotographer.forEach((mediaData) => {
      mediaArray.push(mediaData.id)
    })

    displayMedia(mediaPhotographer, 'Popular')
    displayPhotographerCard(parseInt(id))
    openLightBox()
  } catch (error) {
    console.error("Erreur lors de l'initialisation : ", error)
  }
}

init()
