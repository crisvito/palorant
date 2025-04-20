const imgs = document.querySelectorAll(".maps-carousel img");
const bannerImg = document.querySelector(".banner-image");

let currentIndex = 0;
imgs[currentIndex].classList.add("active");
bannerImg.src = imgs[currentIndex].src;

imgs.forEach((img, index) => {
  img.addEventListener("click", () => {
    updateBanner(index);
  });
});

function updateBanner(newIndex) {
  imgs[currentIndex].classList.remove("active");
  currentIndex = newIndex;
  imgs[currentIndex].classList.add("active");
  bannerImg.src = imgs[currentIndex].src;

  imgs[currentIndex].scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest",
  });
}

const mapsCarousel = document.querySelector(".maps-carousel");
const arrowBtns = document.querySelectorAll(".maps-carousel-control span");
const firstImgWidth = mapsCarousel.querySelector("img").offsetWidth;
let isDragging = false,
  startX,
  startScrollLeft;

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id === "left") {
      const prevIndex = (currentIndex - 1 + imgs.length) % imgs.length;
      updateBanner(prevIndex);
    } else {
      const nextIndex = (currentIndex + 1) % imgs.length;
      updateBanner(nextIndex);
    }
  });
});

mapsCarousel.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
  startScrollLeft = mapsCarousel.scrollLeft;
});

mapsCarousel.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  let maxScrollLeft = mapsCarousel.scrollWidth - mapsCarousel.clientWidth;
  mapsCarousel.scrollLeft = startScrollLeft - (e.pageX - startX) * 2.5;
  // Jika geser manual sampai ujung kanan, balik ke kiri
  if (mapsCarousel.scrollLeft >= maxScrollLeft) mapsCarousel.scrollLeft = 0;
});

document.addEventListener("mouseup", (e) => {
  isDragging = false;
});

mapsCarousel.querySelectorAll("img").forEach((img) => {
  img.addEventListener("dragstart", (e) => e.preventDefault());
});

mapsCarousel.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
  startScrollLeft = mapsCarousel.scrollLeft;
});

mapsCarousel.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  let maxScrollLeft = mapsCarousel.scrollWidth - mapsCarousel.clientWidth;
  mapsCarousel.scrollLeft = startScrollLeft - (e.pageX - startX) * 2.5;
  // Jika geser manual sampai ujung kanan, balik ke kiri
  if (mapsCarousel.scrollLeft >= maxScrollLeft) mapsCarousel.scrollLeft = 0;
});

document.addEventListener("mouseup", (e) => {
  isDragging = false;
});
