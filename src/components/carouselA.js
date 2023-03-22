export function carouselA () {
  const slides = document.querySelectorAll('.slider__slide')
  console.log('slides A', slides)

  const nextSlide = document.querySelector('.slider__btn--next')
  const prevSlide = document.querySelector('.slider__btn--prev')

  let currentSlide = 0
  const maxSlide = slides.length - 1

  const translateSlide = (currentSlide) => {
    slides.forEach((slide, indx) => {
      const itemsWidth = slides[indx].offsetWidth
      slide.style.transform = `translateX(${(itemsWidth + 8) * (currentSlide)}px)`
    })
  }

  nextSlide.addEventListener('click', function () {
    if (-currentSlide === maxSlide) {
      currentSlide = 0
    } else {
      currentSlide--
    }

    translateSlide(currentSlide)
  })

  prevSlide.addEventListener('click', function () {
    if (currentSlide === 0) {
      currentSlide = -maxSlide
    } else {
      currentSlide++
    }

    translateSlide(currentSlide)
  })
}
