import { getRandomImages } from '../services/getRandomImages'
import { carouselA } from './carouselA'

export async function setSlider () {
  console.log('setSlider')
  const images = await getRandomImages()

  const isApp = document.querySelector('#app .slider__type--full-js .slider__container')
  const slider = document.createElement('div')
  slider.classList.add('slider')
  isApp.appendChild(slider)
  const isSliderItems = document.querySelector('.slider')

  await images.forEach(async (image) => {
    const imageUrl = await image.urls.regular
    const imageAlt = image.alt_description
    const slideItem = document.createElement('div')
    slideItem.classList.add('slider__slide')
    slideItem.innerHTML = `<img src=${imageUrl} alt=${imageAlt} />`

    isSliderItems.appendChild(slideItem)
  })

  carouselA()
}

// export class AppElement extends HTMLElement {

//   constructor() {
//     super();
//   }

// }

// customElements.define("app-element", AppElement);

// import { AppElement } from "./components/AppElement.js";

// const appElement = new AppElement();
// document.body.appendChild(appElement);

// class AppElement extends HTMLElement {

//   static get observedAttributes() {
//     return ["value", "is-enabled"];
//   }

//   attributeChangedCallback(name, old, now) {
//     console.log(`El atributo ${name} ha sido modificado de ${old} a ${now}.`);
//   }
// }
