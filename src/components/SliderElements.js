import { getRandomImages } from '../services/getRandomImages'
import carousel from '../css/carousel.css?inline' assert { type: 'css'}
import carouselItems from '../css/carouselItems.css?inline' assert { type: 'css'}
import { carouselWc } from './carouselWc';
import EuropeanCountries from '../maps/europe/EuropeanCountries.json'

const { ...countries } = EuropeanCountries
const templateData = document.querySelector('template.slide__data')

export class SliderElement extends HTMLElement {

  // slider = sliderRoot.querySelector('.slider')

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.sliderRoot = this.shadowRoot
  }
  
  static get observedAttributes() {
    return ['container-width'];
  }
  
  attributeChangedCallback(name, old, now) {
    console.log('attributeChangedCallback - - - -');
    console.log(`El atributo ${name} ha sido modificado de ${old} a ${now}.`);
    console.log("Este componente tiene los atributos: ", this.getAttributeNames());
    if(name === 'container-width' && old !== now) {
      console.log('Si ha cambiado')
      carouselWc(this.sliderRoot)
    }
  }

  reload(sliderRoot) {
    const slider = sliderRoot.querySelector('.slider')
    const containerWidth = slider.offsetWidth
    this.setAttribute('container-width', containerWidth)
    console.log('containerWidth', containerWidth)
  }
  
  async setImages () {
    const container = document.createElement('div')
    container.classList.add('slider__container')
    container.innerHTML=`<div class='slider ${SliderElement.type}'></div>`

    if(SliderElement.type === 'slider__type--items') {
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

    if(SliderElement.type === 'slider__type--items-svg') {
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

    if(SliderElement.type === 'slider__type--items-data') {
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

    if(SliderElement.type==='slider__type--full') {
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

    const styles = SliderElement.type === 'slider__type--full'
      ? carousel
      : SliderElement.type === 'slider__type--items' || SliderElement.type === 'slider__type--items-svg' || SliderElement.type === 'slider__type--items-data'
        ? carouselItems
        : ''

    let sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);
    this.shadowRoot.adoptedStyleSheets.push(sheet)
    // this.shadowRoot.adoptedStyleSheets = [sheet]
    // this.shadowRoot.adoptedStyleSheets = [...document.adoptedStyleSheets, styles]

    await this.render()
    
    // const sliderRoot = this.shadowRoot 
    carouselWc(this.sliderRoot)

    let resizeTimeout
    window.addEventListener('resize', ()=> {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        this.reload(this.sliderRoot)
      }, 500)
    })
  }
}

customElements.define('slider-element', SliderElement)
