export function carouselWc (sliderRoot) {
  const slides = sliderRoot.querySelectorAll('.slider .slider__slide')
  console.log('slides wc')

  const nextSlide = sliderRoot.querySelector('.slider__btn--next')
  const prevSlide = sliderRoot.querySelector('.slider__btn--prev')

  let currentSlide = 0
  const maxSlide = slides.length

  const slider = sliderRoot.querySelector('.slider')
  // casi es mejor asignar gap desde js y no por clases, por la complejidad de recuperar el valor para usar a continuación
  const sliderGapClass = slider.classList.contains('slider__type--full') ? 'slider__gap--0' : 'slider__gap'
  slider.classList.add(sliderGapClass)
  const sliderStyles = window.getComputedStyle(slider)
  const sliderGap = +sliderStyles.getPropertyValue('gap').replace('px', '').replace('normal', 0)

  const translateSlide = (currentSlide) => {
    slides.forEach((slide, indx) => {
      const itemsWidth = slides[indx].offsetWidth
      slide.style.transform = `translateX(${(itemsWidth + sliderGap) * (currentSlide)}px)`
    })
  }

  const containerWidth = slider.offsetWidth
  const itemsWidth = slides[0].offsetWidth

  const rest = containerWidth % itemsWidth
  const maxItems = Math.floor(containerWidth / itemsWidth)
  const maxItemsContained = (rest > 0 && containerWidth - ((itemsWidth * maxItems) + (sliderGap * (maxItems - 1)))) < 0
    ? (Math.floor(containerWidth / itemsWidth)) - 1
    : (Math.floor(containerWidth / itemsWidth))

  const handleNextSlide = () => {
    if (-currentSlide + maxItemsContained === maxSlide) {
      currentSlide = 0
    } else {
      currentSlide--
    }

    translateSlide(currentSlide)
  }

  const handlePrevSlide = () => {
    if (currentSlide === 0) {
      currentSlide = -(maxSlide - maxItemsContained)
    } else {
      currentSlide++
    }

    translateSlide(currentSlide)
  }

  nextSlide.addEventListener('click', handleNextSlide)

  prevSlide.addEventListener('click', handlePrevSlide)
}
