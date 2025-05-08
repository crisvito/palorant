let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  let header = document.querySelector(".header");
  if (header) {
    if (prevScrollpos < currentScrollPos) {
      navbarLinks.classList.remove("show");
      hamburger.classList.remove("active");
    }
    header.style.top = prevScrollpos > currentScrollPos ? "20px" : "-100px";
  }
  prevScrollpos = currentScrollPos;
};

const hamburger = document.querySelector(".hamburger");
const navbarLinks = document.querySelector(".navbar-links");

// Event listener untuk toggle menu
hamburger.addEventListener("click", () => {
  navbarLinks.classList.toggle("show"); // Tampilkan/sembunyikan menu
  hamburger.classList.toggle("active"); // Animasi "X"
});

// Klik di luar menu untuk menutup
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navbarLinks.contains(e.target)) {
    navbarLinks.classList.remove("show");
    hamburger.classList.remove("active");
  }
});
