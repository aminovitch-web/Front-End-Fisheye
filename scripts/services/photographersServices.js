export async function getAllDataService () {
  const URL = 'data/photographers.json'

  try {
    const response = await fetch(URL)

    if (response.ok) {
      return response.json()
    } else {
      console.error('Erreur de réponse :', response.status)
      return []
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error)
    return false
  }
}
