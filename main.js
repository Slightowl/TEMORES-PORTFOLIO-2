document.addEventListener("DOMContentLoaded", () => {
  // Fade in on load
  document.body.classList.add("is-loaded");

  // ---------- Lightbox (only on gallery pages) ----------
  if (document.body.classList.contains("gallery-page")) {
    const items = document.querySelectorAll(".portfolio-item img");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-image");
    const closeBtn = document.querySelector(".lightbox-close");
    const backdrop = document.querySelector(".lightbox-backdrop");

    function openLightbox(img) {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "";
      lightbox.classList.add("is-visible");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove("is-visible");
      document.body.style.overflow = "";
    }

    items.forEach((img) => {
      img.addEventListener("click", () => openLightbox(img));
    });

    closeBtn?.addEventListener("click", closeLightbox);
    backdrop?.addEventListener("click", closeLightbox);

    document.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    });
  }

  // ---------- Page fade transitions for normal links ----------
  const links = document.querySelectorAll("a[href]");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      link.hasAttribute("data-no-transition")
    ) {
      return;
    }

    link.addEventListener("click", (event) => {
      // allow Cmd/Ctrl/Shift-click etc to open in new tab normally
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === "_blank"
      ) {
        return;
      }

      event.preventDefault();

      // start fade-out
      document.body.classList.remove("is-loaded");

      const onTransitionEnd = () => {
        window.location.href = href;
      };

      document.body.addEventListener("transitionend", onTransitionEnd, {
        once: true,
      });
    });
  });
});
