import './src/css/styles.css'
import { setSlider } from './src/components/setSlider'
import { SliderElement } from './src/components/SliderElements.js'
import { Europe } from './src/components/maps/Europe'

document.querySelector('#app').innerHTML = `
  <div class="slider__type--full-js">
    <h2>Ejemplo Carrusel JS Fetch images api.unsplash!</h2>
    <div class='slider__container'>
      <button class='slider__btn slider__btn--prev' type="button"><</button>
      <button class='slider__btn slider__btn--next' type="button">></button>
    </div>
  </div>
  <div class="slider__type--full">
  <h2>Ejemplo Carrusel  Web Components Fetch images api.unsplash!</h2>
  </div>
  <div class="slider__type--items">
    <h2>Ejemplo Carrusel SVG como img</h2>
  </div>
  <div class="slider__type--items-svg">
    <h2>Ejemplo Carrusel SVG</h2>
  </div>
  <div class="slider__type--items-data">
    <h2>Ejemplo Carrusel DATA</h2>
  </div>
`
const isSlider = document.querySelectorAll('#app .slider__type--items, #app .slider__type--items-svg, #app .slider__type--items-data, #app .slider__type--full-js, #app .slider__type--full')

// setSlider()

isSlider.forEach(element => {
  if (element.classList.contains('slider__type--full-js')) {
    setSlider()
  }
  if (element.classList.contains('slider__type--full')) {
    const sliderAppA = new SliderElement()
    SliderElement.type = 'full'
    document.querySelector('#app .slider__type--full').appendChild(sliderAppA)
  }
  if (element.classList.contains('slider__type--items')) {
    const sliderApp = new SliderElement()
    SliderElement.type = 'items'
    document.querySelector('#app .slider__type--items').appendChild(sliderApp)
  }
  if (element.classList.contains('slider__type--items-svg')) {
    const sliderAppD = new SliderElement()
    SliderElement.type = 'items-svg'
    document.querySelector('#app .slider__type--items-svg').appendChild(sliderAppD)
  }
  if (element.classList.contains('slider__type--items-data')) {
    const sliderAppC = new SliderElement()
    SliderElement.type = 'items-data'
    document.querySelector('#app .slider__type--items-data').appendChild(sliderAppC)
  }
})
// const sliderApp = new SliderElement()

// Europe()
