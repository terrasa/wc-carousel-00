import { getRandomImages } from '../services/getRandomImages'
import carousel from '../css/carousel.css?inline' assert { type: 'css'}
import carouselItems from '../css/carouselItems.css?inline' assert { type: 'css'}
import { carouselWc } from './carouselWc';
import EuropeanCountries from '../maps/europe/EuropeanCountries.json'

const { ...countries } = EuropeanCountries
const templateData = document.querySelector('template.slide__data')

export class SliderElement extends HTMLElement {
  maxSlide = null
  
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  // reload() {
  //   window.addEventListener('resize',)
  // }
  
  async setImages () {
    const container = document.createElement('div')
    container.classList.add('slider__container')
    container.innerHTML=`<div class='slider ${SliderElement.type}'></div>`

    if(SliderElement.type === 'items') {
      const countriesKeys = Object.keys(countries)
      countriesKeys.forEach(async (key) => {
        const imageUrl = `../../maps/europe/${key}.svg`
        const imageAlt = countries[key]
        const slideItem = document.createElement('div')
        slideItem.classList.add('slider__slide')
        slideItem.innerHTML = `<img src=${imageUrl} alt=${imageAlt} />` 
        container.querySelector('.slider').appendChild(slideItem)

      })
      return container
    }

    if(SliderElement.type === 'items-svg') {
      const countriesKeys = Object.keys(countries)
      countriesKeys.forEach(async (key) => {
        const imageAlt = countries[key]
        const slideItem = document.createElement('a')
        slideItem.setAttribute('href', '#0')
        slideItem.classList.add('slider__slide')
        slideItem.innerHTML = `${countries[key].svg}`
        container.querySelector('.slider').appendChild(slideItem)

      })
      return container
    }

    if(SliderElement.type === 'items-data') {
      const countriesKeys = Object.keys(countries)
      countriesKeys.forEach(async (key) => {
        const imageAlt = countries[key]
        const slideItem = document.createElement('a')
        slideItem.setAttribute('href', '#0')
        slideItem.classList.add('slider__slide')
        const htmlData = templateData.content.cloneNode((true))
        slideItem.appendChild(htmlData)
        const icon = slideItem.querySelector('.slide__icon')
        icon.innerHTML = `${countries[key].svg}`
        const info = slideItem.querySelector('.slide__info')
        info.innerHTML = `<h4>${countries[key].name}</h4>
                          <div>
                            <h6>Ranking:</h6>                  
                            <p>${countries[key].ranking}</p>
                          </div>
                          <div>
                            <h6>CO<sub>2</sub></h6> 
                            <p>${countries[key].CO2}<sub>Kt/año</sub></p>
                          </div>`
        container.querySelector('.slider').appendChild(slideItem)

      })
      return container
    }

    if(SliderElement.type==='full') {
      const images = await getRandomImages()
      await images.forEach(async (image) => {
        const imageUrl = await image.urls.regular
        const imageAlt = image.alt_description
        const slideItem = document.createElement('div')
        slideItem.classList.add('slider__slide')
        slideItem.innerHTML = `<img src=${imageUrl} alt=${imageAlt} />`
        container.querySelector('.slider').appendChild(slideItem)
      })
      return container
    }
  }

  async render () {
    console.log('render wc')
    const sliderContainer = await this.setImages()
    const sliderBtn = `
      <button class='slider__btn slider__btn--prev' type="button">&lt;</button>
      <button class='slider__btn slider__btn--next' type="button">&gt;</button>
    `
    this.shadowRoot.appendChild(sliderContainer)
    sliderContainer.insertAdjacentHTML('beforeend', sliderBtn)
  }

  async connectedCallback() {
    console.log('connected ya');

    const styles = SliderElement.type === 'full'
      ? carousel
      : SliderElement.type === 'items' || SliderElement.type === 'items-svg' || SliderElement.type === 'items-data'
        ? carouselItems
        : ''

    let sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);
    this.shadowRoot.adoptedStyleSheets.push(sheet)
    // this.shadowRoot.adoptedStyleSheets = [sheet]
    // this.shadowRoot.adoptedStyleSheets = [...document.adoptedStyleSheets, styles]

    await this.render()
    
    const sliderRoot = this.shadowRoot
    carouselWc(sliderRoot)
  }

  static get observedAttributes() {
    return ["images"];
  }

  attributeChangedCallback(name, old, now) {
    console.log(`El atributo ${name} ha sido modificado de ${old} a ${now}.`);
  }
}


customElements.define('slider-element', SliderElement)
