const galleryItems = [...document.querySelectorAll(".gallery-item")];
const galleryImages = galleryItems.map(item => item.querySelector("img"));

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

const currentCounter = document.querySelector(".current-image");
const totalCounter = document.querySelector(".total-images");

const imageCursor = document.querySelector(".image-cursor");

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

let currentIndex = 0;

/* ------------------------------
   HOMEPAGE LOAD
------------------------------ */

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

/* ------------------------------
   LIGHTBOX
------------------------------ */

totalCounter.textContent =
  String(galleryImages.length).padStart(2, "0");


function showImage(index) {

  currentIndex =
    (index + galleryImages.length) %
    galleryImages.length;

  const selectedImage = galleryImages[currentIndex];

  lightboxImage.src = selectedImage.src;
  lightboxImage.alt = selectedImage.alt;

  currentCounter.textContent =
    String(currentIndex + 1).padStart(2, "0");
}


function openLightbox(index) {

  showImage(index);

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}


function closeLightbox() {

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}


galleryItems.forEach((item, index) => {

  item.addEventListener("click", () => {
    openLightbox(index);
  });

});


previousButton.addEventListener("click", () => {
  showImage(currentIndex - 1);
});


nextButton.addEventListener("click", () => {
  showImage(currentIndex + 1);
});


closeButton.addEventListener("click", closeLightbox);


lightbox.addEventListener("click", event => {

  if (event.target === lightbox) {
    closeLightbox();
  }

});


document.addEventListener("keydown", event => {

  if (!lightbox.classList.contains("open")) {
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

});


/* ------------------------------
   CUSTOM IMAGE CURSOR
------------------------------ */

galleryItems.forEach(item => {

  item.addEventListener("mouseenter", () => {
    imageCursor.classList.add("visible");
  });

  item.addEventListener("mouseleave", () => {
    imageCursor.classList.remove("visible");
  });

});


document.addEventListener("mousemove", event => {

  imageCursor.style.left = `${event.clientX}px`;
  imageCursor.style.top = `${event.clientY}px`;

});


/* ------------------------------
   MOBILE MENU
------------------------------ */

menuToggle.addEventListener("click", () => {

  const isOpen =
    navigation.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    isOpen
  );

});

/* ------------------------------
   VIDEO LIGHTBOX
------------------------------ */

const videoCovers =
  [...document.querySelectorAll(".video-cover")];

const videoCursor =
  document.querySelector(".video-cursor");

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

    cover.addEventListener("click", () => {

      const videoSource =
        cover.dataset.video;

      lightboxVideo.src = videoSource;

      videoLightbox.classList.add("open");

      videoLightbox.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow = "hidden";

      lightboxVideo.play();
    });


    /* PLAY CURSOR */

    cover.addEventListener("mouseenter", () => {

      if (videoCursor) {
        videoCursor.classList.add("visible");
      }

    });

    cover.addEventListener("mouseleave", () => {

      if (videoCursor) {
        videoCursor.classList.remove("visible");
      }

    });

  });


  function closeVideo() {

    lightboxVideo.pause();

    lightboxVideo.removeAttribute("src");
    lightboxVideo.load();

    videoLightbox.classList.remove("open");

    videoLightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow = "";
  }


  videoClose.addEventListener(
    "click",
    closeVideo
  );


  videoLightbox.addEventListener(
    "click",
    event => {

      if (event.target === videoLightbox) {
        closeVideo();
      }

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        videoLightbox.classList.contains("open")
      ) {
        closeVideo();
      }

    }
  );

}


/* ------------------------------
   VIDEO CURSOR POSITION
------------------------------ */

document.addEventListener(
  "mousemove",
  event => {

    if (!videoCursor) return;

    videoCursor.style.left =
      `${event.clientX}px`;

    videoCursor.style.top =
      `${event.clientY}px`;

  }
);