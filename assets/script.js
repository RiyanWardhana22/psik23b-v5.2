// Toggle Navbar
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Klik DiLuar Elemen Pada Bagian Navbar
document.addEventListener("click", function (e) {
  if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
    navbar.classList.remove("active");
    menuIcon.classList.remove("bx-x");
  }
});

// Navbar Magic Start
const list = document.querySelectorAll(".navbar-magic a");
function activeLink() {
  list.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}

list.forEach((item) => item.addEventListener("click", activeLink));

// Navbar Magic End

// Scroll Reveal
ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".heading", { origin: "top" });
ScrollReveal().reveal(
  ".btn, .about-img, .content, .input-box, .mapbox, .form-btn",
  {
    origin: "bottom",
  }
);
ScrollReveal().reveal(".stat-box", { origin: "right" });
ScrollReveal().reveal(".main, .social-media, .form-title, .form-input", {
  origin: "left",
});

// Function Call Hari
function hari() {
  const hariIni = new Date();
  const hari = { weekday: "long" };
  return hariIni.toLocaleDateString("id-ID", hari);
}

// Function Tanggal Saat ini
function tanggal() {
  const saatIni = new Date();
  const pilihan = { month: "long", day: "numeric" };
  return saatIni.toLocaleDateString("id-ID", pilihan);
}

// Type Js
const typed = new Typed(".multiple-text", {
  strings: ["PSIK 23 B", hari(), tanggal()],
  loop: true,
  backSpeed: 60,
  typeSpeed: 180,
  backDelay: 1000,
});

// DARK MODE
function toggleMode() {
  const moonIcon = document.getElementById("moon");
  const sunIcon = document.getElementById("sun");
  const body = document.body;

  const isDarkMode = body.classList.toggle("dark-mode");
  localStorage.setItem("themeColor", isDarkMode ? "dark-mode" : "light-mode");

  moonIcon.style.display = isDarkMode ? "none" : "inline";
  sunIcon.style.display = isDarkMode ? "inline" : "none";
}

// Fungsi untuk memuat preferensi mode dari localStorage
function loadLocalStorage() {
  const isDarkMode = localStorage.getItem("themeColor") === "dark-mode";
  const moonIcon = document.getElementById("moon");
  const sunIcon = document.getElementById("sun");

  document.body.classList.toggle("dark-mode", isDarkMode);
  moonIcon.style.display = isDarkMode ? "none" : "inline";
  sunIcon.style.display = isDarkMode ? "inline" : "none";
}
loadLocalStorage();

// Footer
function years() {
  const yearSpan = document.getElementById("years");
  const tahunIni = new Date().getFullYear();
  yearSpan.textContent = tahunIni;
}
years();

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// HERO SLIDER START
const heroSlider = document.querySelector(".hero-slider");
const slides = [
  "./assets/img/slider/slider1.jpg",
  "./assets/img/slider/slider2.jpg",
  "./assets/img/slider/slider3.jpg",
  "./assets/img/slider/slider4.jpg",
  "./assets/img/slider/slider5.jpg",
];

let currentSlide = 0;

function initSlider() {
  slides.forEach((imgSrc, index) => {
    const slide = document.createElement("div");
    slide.classList.add("hero-slide");
    slide.style.backgroundImage = `url('${imgSrc}')`;
    if (index === 0) {
      slide.classList.add("active", "zoom-in");
    }

    heroSlider.appendChild(slide);
  });
}

function changeSlide() {
  const allSlides = document.querySelectorAll(".hero-slide");
  const activeSlide = allSlides[currentSlide];
  activeSlide.classList.remove("active");
  currentSlide = (currentSlide + 1) % allSlides.length;
  const nextSlide = allSlides[currentSlide];

  nextSlide.classList.add("active");
  nextSlide.classList.remove("zoom-in", "zoom-out");
  if (currentSlide % 2 === 0) {
    nextSlide.classList.add("zoom-in");
  } else {
    nextSlide.classList.add("zoom-out");
  }
}

if (heroSlider) {
  initSlider();
  setInterval(changeSlide, 3000);
}
