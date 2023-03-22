const ACCESKEY = 'pUjkCSXSh-LvqY8sQ2NmoZlj6hAraID1UlkfeEGKAyU'
const URL = 'https://api.unsplash.com/'

const GETRANDOMIMAGES = '/photos/random'

export const getRandomImages = async () => {
  const response = await fetch(`${URL}${GETRANDOMIMAGES}?count=5&query=wanderlust&client_id=${ACCESKEY}`)

  if (!response.ok) {
    throw new Error(`Error al cargar datos ${response.status}`)
  }
  try {
    const data = await response.json()
    const [...images] = data
    console.log(images)
    return images
  } catch (err) {
    console.error(err.message)
  }
}

// https://api.unsplash.com/photos/random?count=5 █

// https://api.unsplash.com/search/photos?query=canada █
// https://api.unsplash.com/search/photos?query=wanderlust  minimal █
