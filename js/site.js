(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  const counters = document.querySelectorAll("[data-count-to]");
  if (counters.length && "IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-count-to") || "0", 10);
          const suffix = el.getAttribute("data-count-suffix") || "";
          const duration = 1200;
          const start = performance.now();

          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          countObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => countObserver.observe(el));
  }

  function initLightbox() {
    const images = document.querySelectorAll(
      ".screenshot-frame img, .guide-screenshot img, .hero-app-logo"
    );
    if (!images.length) return;

    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Đóng">×</button>' +
      '<div class="lightbox-body">' +
      '<img class="lightbox-image" alt="" />' +
      '<p class="lightbox-caption" hidden></p>' +
      "</div>";
    document.body.appendChild(overlay);

    const lbImg = overlay.querySelector(".lightbox-image");
    const lbCaption = overlay.querySelector(".lightbox-caption");
    const closeBtn = overlay.querySelector(".lightbox-close");
    let lastFocus = null;

    function open(src, alt) {
      lastFocus = document.activeElement;
      lbImg.src = src;
      lbImg.alt = alt || "";
      if (alt) {
        lbCaption.textContent = alt;
        lbCaption.hidden = false;
      } else {
        lbCaption.hidden = true;
        lbCaption.textContent = "";
      }
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      closeBtn.focus();
    }

    function close() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      lbImg.removeAttribute("src");
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      }
    }

    images.forEach((img) => {
      img.classList.add("zoomable-img");
      if (!img.hasAttribute("tabindex")) {
        img.setAttribute("tabindex", "0");
      }
      img.setAttribute("role", "button");
      const label = img.alt || "Ảnh";
      img.setAttribute("aria-label", label + " — bấm để phóng to");

      const openFromImg = (event) => {
        event.preventDefault();
        open(img.currentSrc || img.src, img.alt);
      };

      img.addEventListener("click", openFromImg);
      img.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          openFromImg(event);
        }
      });
    });

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (event) => {
      if (
        event.target === overlay ||
        event.target.classList.contains("lightbox-body")
      ) {
        close();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && overlay.classList.contains("is-open")) {
        close();
      }
    });
  }

  initLightbox();
})();
