import EuropeanCountries from '../../maps/europe/EuropeanCountries.json'

const { ...countries } = EuropeanCountries
export function Europe () {
  const countriesKeys = Object.keys(countries)
  console.log('ficheros', countriesKeys, Object.values(countries))

  countriesKeys.forEach(async (key) => {
    const imageUrl = `../../maps/europe/${key}.svg`
    const imageAlt = countries[key]
    console.log(`<img src=${imageUrl} alt=${imageAlt} />`)
    // slideItem.innerHTML = `<img src=${imageUrl} alt=${imageAlt} />`
  })

  // document.querySelector('#app').appendChild(map)
}

// export class EuropeanCountryMaps extends HTMLElement {
//   id = null

//   constructor () {
//     super()
//   }

//   connectedCallback() {

//   }
// }
