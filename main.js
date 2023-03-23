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
const allSliders = document.querySelectorAll('#app .carousel')

const checkType = (carouselClass, newSlider, slider) => {
  carouselClass.forEach((elementClass) => {
    if (elementClass.startsWith('slider__type')) {
      SliderElement.type = elementClass
      slider.appendChild(newSlider)
    }
  })
}

allSliders.forEach((slider) => {
  if (slider.classList.contains('slider__type--full-js')) {
    setSlider()
  } else {
    const newSlider = new SliderElement()
    const carouselClass = Object.values(slider.classList)

    checkType(carouselClass, newSlider, slider)
  }
})
