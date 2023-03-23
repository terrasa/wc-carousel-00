import './src/css/styles.css'
import { setSlider } from './src/components/setSlider'
import { SliderElement } from './src/components/SliderElements.js'

document.querySelector('#app').innerHTML = `
  <div class="carousel slider__type--full-js">
    <h2>Ejemplo Carrusel JS Fetch images api.unsplash!</h2>
    <div class='slider__container'>
      <button class='slider__btn slider__btn--prev' type="button"><</button>
      <button class='slider__btn slider__btn--next' type="button">></button>
    </div>
  </div>
  <div class="carousel slider__type--full">
    <h2>Ejemplo Carrusel  Web Components Fetch images api.unsplash!</h2>
  </div>
  <div class="carousel slider__type--items">
    <h2>Ejemplo Carrusel SVG como img</h2>
  </div>
  <div class="carousel slider__type--items-svg">
    <h2>Ejemplo Carrusel SVG</h2>
  </div>
  <div class="carousel slider__type--items-data">
    <h2>Ejemplo Carrusel DATA</h2>
  </div>
`
const isSlider = document.querySelectorAll('#app .carousel')

isSlider.forEach(element => {
  if (element.classList.contains('slider__type--full-js')) {
    setSlider()
  }
  if (element.classList.contains('slider__type--full')) {
    // const sliderAppFull = new SliderElement()
    // SliderElement.type = 'full'
    // element.appendChild(sliderAppFull)
    const sliderApp = new SliderElement()
    SliderElement.type = 'full'
    element.appendChild(sliderApp)
  }
  if (element.classList.contains('slider__type--items')) {
    // const sliderAppItems = new SliderElement()
    // SliderElement.type = 'items'
    // element.appendChild(sliderAppItems)
    const sliderApp = new SliderElement()
    SliderElement.type = 'items'
    element.appendChild(sliderApp)
  }
  if (element.classList.contains('slider__type--items-svg')) {
    // const sliderAppItemsSVG = new SliderElement()
    // SliderElement.type = 'items-svg'
    // element.appendChild(sliderAppItemsSVG)
    const sliderApp = new SliderElement()
    SliderElement.type = 'items-svg'
    element.appendChild(sliderApp)
  }
  if (element.classList.contains('slider__type--items-data')) {
    // const sliderAppItemsData = new SliderElement()
    // SliderElement.type = 'items-data'
    // element.appendChild(sliderAppItemsData)
    const sliderApp = new SliderElement()
    SliderElement.type = 'items-data'
    element.appendChild(sliderApp)
  }
})
