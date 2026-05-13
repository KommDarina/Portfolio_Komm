document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".hero-images img");

  let activeImg = null;
  let offsetX = 0;
  let offsetY = 0;

  images.forEach((img) => {
    // RANDOM POSITION
    const x = 10 + Math.random() * 70;
    const y = 10 + Math.random() * 70;

    img.style.left = x + "%";
    img.style.top = y + "%";

    const rotate = (Math.random() - 0.5) * 20;
    img.dataset.rotate = rotate;
    img.dataset.x = 0;
    img.dataset.y = 0;

    img.style.transform = `translate(0px, 0px) rotate(${rotate}deg)`;

    /* POINTER DOWN */
    img.addEventListener("pointerdown", (e) => {
      activeImg = img;

      const rect = img.getBoundingClientRect();

      // ОЦЕ КЛЮЧ — запам’ятовуємо зміщення
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      img.classList.add("dragging");

      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
    });
  });

  function move(e) {
    if (!activeImg) return;

    // нова позиція з урахуванням offset
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    activeImg.style.left = x + "px";
    activeImg.style.top = y + "px";

    const rotate = activeImg.dataset.rotate;

    activeImg.style.transform = `
      rotate(${rotate}deg)
      scale(1.05)
    `;
  }

  function up() {
    if (!activeImg) return;

    const rotate = activeImg.dataset.rotate;

    activeImg.style.transform = `
      rotate(${rotate}deg)
      scale(1)
    `;

    activeImg.classList.remove("dragging");

    document.removeEventListener("pointermove", move);
    document.removeEventListener("pointerup", up);

    activeImg = null;
  }
});
