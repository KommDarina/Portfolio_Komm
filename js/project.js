document.addEventListener("DOMContentLoaded", () => {
  /* ================= CATEGORY ================= */

  const trigger = document.querySelector(".categories-trigger");
  const bar = document.querySelector(".category-bar");
  const filters = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".project-card");

  if (trigger) {
    trigger.addEventListener("click", () => {
      bar.classList.toggle("active");
    });
  }

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const category = card.dataset.category;

        if (filter === "all" || category === filter) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });

      bar.classList.remove("active");
    });
  });

  /* ================= OVERLAY ================= */

  cards.forEach((card) => {
    const overlay = card.querySelector(".project-overlay");
    const closeBtn = card.querySelector(".overlay-close");
    const imagesContainer = card.querySelector(".overlay-images");

    card.addEventListener("click", (e) => {
      if (e.target.closest(".overlay-close")) return;

      const files = card.dataset.images.split(",");

      imagesContainer.innerHTML = "";

      files.forEach((src) => {
        src = src.trim();

        /* VIDEO */

        if (
          src.endsWith(".mp4") ||
          src.endsWith(".webm") ||
          src.endsWith(".mov")
        ) {
          const video = document.createElement("video");

          video.src = src;
          video.autoplay = true;
          video.loop = true;
          video.muted = true;
          video.playsInline = true;

          imagesContainer.appendChild(video);
        } else {
          /* IMAGE */
          const img = document.createElement("img");

          img.src = src;
          img.loading = "lazy";

          imagesContainer.appendChild(img);
        }
      });

      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
  /* ================= MOBILE 2-STEP INTERACTION ================= */

  const isMobile = window.innerWidth <= 900;

  if (isMobile) {
    cards.forEach((card) => {
      let activated = false;

      card.addEventListener("click", (e) => {
        const overlay = card.querySelector(".project-overlay");
        const closeBtn = card.querySelector(".overlay-close");

        // якщо натиснули закрити — закриваємо
        if (e.target.closest(".overlay-close")) return;

        // 1-й клік → показати hover
        if (!activated) {
          e.preventDefault();
          e.stopPropagation();

          cards.forEach((c) => c.classList.remove("active"));
          card.classList.add("active");

          activated = true;
          return;
        }

        // 2-й клік → відкриваємо overlay
        const files = card.dataset.images.split(",");
        const imagesContainer = card.querySelector(".overlay-images");

        imagesContainer.innerHTML = "";

        files.forEach((src) => {
          src = src.trim();

          if (
            src.endsWith(".mp4") ||
            src.endsWith(".webm") ||
            src.endsWith(".mov")
          ) {
            const video = document.createElement("video");
            video.src = src;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            imagesContainer.appendChild(video);
          } else {
            const img = document.createElement("img");
            img.src = src;
            img.loading = "lazy";
            imagesContainer.appendChild(img);
          }
        });

        overlay.classList.add("active");
        document.body.style.overflow = "hidden";

        activated = false;
      });
    });
  }
});
