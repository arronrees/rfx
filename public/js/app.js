if (!!document.querySelector('.hero__splide')) {
  const heroSplide = new Splide('.hero__splide', {
    type: 'fade',
    easing: 'ease',
    arrows: true,
    autoplay: false,
    interval: 4000,
    speed: 800,
    rewind: true,
    pagination: false,
    perPage: 1,
    updateOnMove: true,
  }).mount();
}

if (!!document.querySelector('.blog__splide')) {
  const blogSplide = new Splide('.blog__splide', {
    type: 'loop',
    easing: 'ease',
    arrows: false,
    autoplay: false,
    interval: 4000,
    speed: 800,
    rewind: true,
    pagination: true,
    perPage: 1,
    updateOnMove: true,
  }).mount();
}
