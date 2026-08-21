/* ==========================================================
   SAMMI SHOT THAT
   Main JavaScript

   01. Homepage Load
   02. Mobile Navigation
   03. Gallery Lightbox
   04. Gallery Cursor
   05. Video Lightbox
   06. Video Cursor
========================================================== */


/* ==========================================================
   01. HOMEPAGE LOAD
========================================================== */

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
  
  
  /* ==========================================================
     02. MOBILE NAVIGATION
  ========================================================== */
  
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  
  if (menuToggle && navigation) {
  
    menuToggle.addEventListener("click", () => {
  
      const isOpen = navigation.classList.toggle("open");
  
      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
  
      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
      );
  
      menuToggle.textContent =
        isOpen ? "Close" : "Menu";
  
    });
  
  
    /* Close menu after clicking a nav link */
  
    navigation
      .querySelectorAll(".nav-link")
      .forEach(link => {
  
        link.addEventListener("click", () => {
  
          navigation.classList.remove("open");
  
          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );
  
          menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
          );
  
          menuToggle.textContent = "Menu";
  
        });
  
      });
  
  }
  
  
  /* ==========================================================
     03. GALLERY LIGHTBOX
  ========================================================== */
  
  const galleryItems =
    [...document.querySelectorAll(".gallery-item")];
  
  const galleryImages =
    galleryItems
      .map(item => item.querySelector("img"))
      .filter(Boolean);
  
  const lightbox =
    document.querySelector(".lightbox");
  
  const lightboxImage =
    document.querySelector(".lightbox-image");
  
  const closeButton =
    document.querySelector(".lightbox-close");
  
  const previousButton =
    document.querySelector(".lightbox-prev");
  
  const nextButton =
    document.querySelector(".lightbox-next");
  
  const currentCounter =
    document.querySelector(".current-image");
  
  const totalCounter =
    document.querySelector(".total-images");
  
  
  /*
     Only initialize the gallery if
     the gallery/lightbox actually exists
     on the current page.
  */
  
  if (
    galleryItems.length &&
    galleryImages.length &&
    lightbox &&
    lightboxImage
  ) {
  
    let currentIndex = 0;
  
  
    /* TOTAL IMAGE COUNT */
  
    if (totalCounter) {
      totalCounter.textContent =
        String(galleryImages.length).padStart(2, "0");
    }
  
  
    /* SHOW IMAGE */
  
    function showImage(index) {
  
      currentIndex =
        (index + galleryImages.length) %
        galleryImages.length;
  
      const selectedImage =
        galleryImages[currentIndex];
  
      lightboxImage.src =
        selectedImage.src;
  
      lightboxImage.alt =
        selectedImage.alt;
  
  
      if (currentCounter) {
  
        currentCounter.textContent =
          String(currentIndex + 1)
            .padStart(2, "0");
  
      }
  
    }
  
  
    /* OPEN LIGHTBOX */
  
    function openLightbox(index) {
  
      showImage(index);
  
      lightbox.classList.add("open");
  
      lightbox.setAttribute(
        "aria-hidden",
        "false"
      );
  
      document.body.classList.add(
        "lightbox-open"
      );
  
    }
  
  
    /* CLOSE LIGHTBOX */
  
    function closeLightbox() {
  
      lightbox.classList.remove("open");
  
      lightbox.setAttribute(
        "aria-hidden",
        "true"
      );
  
      document.body.classList.remove(
        "lightbox-open"
      );
  
    }
  
  
    /* IMAGE CLICKS */
  
    galleryItems.forEach((item, index) => {
  
      item.addEventListener("click", () => {
        openLightbox(index);
      });
  
    });
  
  
    /* PREVIOUS */
  
    if (previousButton) {
  
      previousButton.addEventListener(
        "click",
        () => {
          showImage(currentIndex - 1);
        }
      );
  
    }
  
  
    /* NEXT */
  
    if (nextButton) {
  
      nextButton.addEventListener(
        "click",
        () => {
          showImage(currentIndex + 1);
        }
      );
  
    }
  
  
    /* CLOSE BUTTON */
  
    if (closeButton) {
  
      closeButton.addEventListener(
        "click",
        closeLightbox
      );
  
    }
  
  
    /* CLICK BACKDROP */
  
    lightbox.addEventListener(
      "click",
      event => {
  
        if (event.target === lightbox) {
          closeLightbox();
        }
  
      }
    );
  
  
    /* KEYBOARD CONTROLS */
  
    document.addEventListener(
      "keydown",
      event => {
  
        if (
          !lightbox.classList.contains("open")
        ) {
          return;
        }
  
  
        if (event.key === "Escape") {
          closeLightbox();
        }
  
  
        if (event.key === "ArrowRight") {
          showImage(currentIndex + 1);
        }
  
  
        if (event.key === "ArrowLeft") {
          showImage(currentIndex - 1);
        }
  
      }
    );
  
  }
  
  
  /* ==========================================================
     04. GALLERY CURSOR
  ========================================================== */
  
  const imageCursor =
    document.querySelector(".image-cursor");
  
  
  if (
    imageCursor &&
    galleryItems.length
  ) {
  
    galleryItems.forEach(item => {
  
      item.addEventListener(
        "mouseenter",
        () => {
  
          imageCursor.classList.add(
            "visible"
          );
  
        }
      );
  
  
      item.addEventListener(
        "mouseleave",
        () => {
  
          imageCursor.classList.remove(
            "visible"
          );
  
        }
      );
  
    });
  
  
    document.addEventListener(
      "mousemove",
      event => {
  
        imageCursor.style.left =
          `${event.clientX}px`;
  
        imageCursor.style.top =
          `${event.clientY}px`;
  
      }
    );
  
  }
  
  
  /* ==========================================================
     05. VIDEO LIGHTBOX
  ========================================================== */
  
  const videoCovers =
    [...document.querySelectorAll(".video-cover")];
  
  const videoLightbox =
    document.querySelector(".video-lightbox");
  
  const lightboxVideo =
    document.querySelector(".lightbox-video");
  
  const videoClose =
    document.querySelector(".video-close");
  
  
  if (
    videoCovers.length &&
    videoLightbox &&
    lightboxVideo
  ) {
  
    videoCovers.forEach(cover => {
  
      cover.addEventListener(
        "click",
        () => {
  
          const videoSource =
            cover.dataset.video;
  
  
          /*
             Don't try opening the player
             if no video has been assigned.
          */
  
          if (!videoSource) {
            return;
          }
  
  
          lightboxVideo.src =
            videoSource;
  
          videoLightbox.classList.add(
            "open"
          );
  
          videoLightbox.setAttribute(
            "aria-hidden",
            "false"
          );
  
          document.body.classList.add(
            "lightbox-open"
          );
  
  
          /*
             play() returns a Promise.
             Catch prevents browser autoplay
             restrictions from throwing noise.
          */
  
          lightboxVideo
            .play()
            .catch(() => {});
  
        }
      );
  
    });
  
  
    /* CLOSE VIDEO */
  
    function closeVideo() {
  
      lightboxVideo.pause();
  
      lightboxVideo.removeAttribute(
        "src"
      );
  
      lightboxVideo.load();
  
      videoLightbox.classList.remove(
        "open"
      );
  
      videoLightbox.setAttribute(
        "aria-hidden",
        "true"
      );
  
      document.body.classList.remove(
        "lightbox-open"
      );
  
    }
  
  
    /* CLOSE BUTTON */
  
    if (videoClose) {
  
      videoClose.addEventListener(
        "click",
        closeVideo
      );
  
    }
  
  
    /* CLICK BACKDROP */
  
    videoLightbox.addEventListener(
      "click",
      event => {
  
        if (
          event.target === videoLightbox
        ) {
          closeVideo();
        }
  
      }
    );
  
  
    /* ESCAPE KEY */
  
    document.addEventListener(
      "keydown",
      event => {
  
        if (
          event.key === "Escape" &&
          videoLightbox.classList.contains(
            "open"
          )
        ) {
          closeVideo();
        }
  
      }
    );
  
  }
  
  
  /* ==========================================================
     06. VIDEO CURSOR
  ========================================================== */
  
  const videoCursor =
    document.querySelector(".video-cursor");
  
  
  if (
    videoCursor &&
    videoCovers.length
  ) {
  
    videoCovers.forEach(cover => {
  
      cover.addEventListener(
        "mouseenter",
        () => {
  
          videoCursor.classList.add(
            "visible"
          );
  
        }
      );
  
  
      cover.addEventListener(
        "mouseleave",
        () => {
  
          videoCursor.classList.remove(
            "visible"
          );
  
        }
      );
  
    });
  
  
    document.addEventListener(
      "mousemove",
      event => {
  
        videoCursor.style.left =
          `${event.clientX}px`;
  
        videoCursor.style.top =
          `${event.clientY}px`;
  
      }
    );
  
  }