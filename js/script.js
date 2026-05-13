document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slides img");
  const hero = document.querySelector(".hero");

  let index = 0;
  let intervalTime = 4000; // стандартна швидкість
  let fastTime = 600; // швидкість при кліку
  let sliderInterval;

  function showSlide(i) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[i].classList.add("active");
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  function startAutoSlide(time = intervalTime) {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(nextSlide, time);
  }

  // старт автоматичного слайдера
  startAutoSlide();

  // клік по hero
  hero.addEventListener("click", () => {
    nextSlide(); // одразу перемкнути
    startAutoSlide(fastTime); // пришвидшити

    // через 3 секунди повернути нормальну швидкість
    setTimeout(() => {
      startAutoSlide(intervalTime);
    }, 3000);
  });
});
