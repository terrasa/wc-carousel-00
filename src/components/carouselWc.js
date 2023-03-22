export function carouselWc (sliderRoot) {
  const slides = sliderRoot.querySelectorAll('.slider .slider__slide')
  console.log('slides wc', slides)

  const nextSlide = sliderRoot.querySelector('.slider__btn--next')
  const prevSlide = sliderRoot.querySelector('.slider__btn--prev')

  slides.forEach((slide, indx) => {
    // slide.style.transform = `translateX(${indx * 100}%)`
  })

  let currentSlide = 0
  const maxSlide = slides.length

  const translateSlide = (currentSlide) => {
    slides.forEach((slide, indx) => {
      const itemsWidth = slides[indx].offsetWidth
      slide.style.transform = `translateX(${(itemsWidth + 8) * (currentSlide)}px)`
    })
  }

  // handleEvent(e)
  const slider = sliderRoot.querySelector('.slider')
  const sliderType = slider.classList.contains('items')
    ? 'items'
    : slider.classList.contains('full')
      ? 'full'
      : slider.classList.contains('items-svg')
        ? 'items-svg'
        : slider.classList.contains('items-data')
          ? 'items-data'
          : ''

  const containerWidth = slider.offsetWidth
  const itemsWidth = slides[0].offsetWidth
  // no creo que sea necesario rest y meter gap por javascript para que el 8 sea una variable

  const rest = slider.offsetWidth % slides[0].offsetWidth
  const maxItems = Math.floor(slider.offsetWidth / slides[0].offsetWidth)
  const maxItemsContained = (sliderType === 'full' || sliderType === 'items' || sliderType === 'items-svg' || sliderType === 'items-data')
    ? (rest > 0 && slider.offsetWidth - ((slides[0].offsetWidth * maxItems) + (8 * (maxItems - 1)))) < 0
        ? (Math.floor(slider.offsetWidth / slides[0].offsetWidth)) - 1
        : (Math.floor(slider.offsetWidth / slides[0].offsetWidth))
    : ''

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
