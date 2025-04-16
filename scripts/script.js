const mapsCarousel = document.querySelector(".maps-carousel-container");
const carouselControls = document.querySelectorAll(
  ".maps-carousel-control span"
);
const carouselItems = document.querySelectorAll(".maps-carousel-item");

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = [...controls];
    this.carouselArray = [...items];
    this.currentIndex = 1; // Start with item-2 as the center item
    this.isAnimating = false;
  }

  updateItem() {
    this.carouselArray.forEach((item, index) => {
      // Remove all position classes first
      item.classList.remove("item-1", "item-2", "item-3");

      // Calculate relative positions
      const itemCount = this.carouselArray.length;
      const prevIndex = (this.currentIndex - 1 + itemCount) % itemCount;
      const nextIndex = (this.currentIndex + 1) % itemCount;

      if (index === this.currentIndex) {
        item.classList.add("item-2"); // Center item
      } else if (index === prevIndex) {
        item.classList.add("item-1"); // Left item
      } else if (index === nextIndex) {
        item.classList.add("item-3"); // Right item
      }
    });
  }

  setContainerHeight() {
    const heights = this.carouselItems.map((item) => item.offsetHeight);
    const maxHeight = Math.max(...heights);
    this.carouselContainer.style.height = `${maxHeight}px`;
  }

  setCurrentState(direction) {
    this.isAnimating = true;
    if (direction.id === "left") {
      this.currentIndex =
        (this.currentIndex - 1 + this.carouselArray.length) %
        this.carouselArray.length;
    } else {
      this.currentIndex = (this.currentIndex + 1) % this.carouselArray.length;
    }
    this.updateItem();

    setTimeout(() => {
      this.setContainerHeight();
      this.isAnimating = false;
    }, 300); // Match dengan durasi CSS transition
  }

  useControls() {
    this.carouselControls.forEach((control) => {
      control.addEventListener("click", (e) => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }
}

// Initialize the carousel
const carousel = new Carousel(mapsCarousel, carouselItems, carouselControls);
carousel.useControls();
carousel.updateItem();
