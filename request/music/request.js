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
  // reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".announcement", { origin: "left" });
ScrollReveal().reveal(".heading", { origin: "top" });
ScrollReveal().reveal(".input-group, .btn", {
  origin: "bottom",
});

// Type Js
const typed = new Typed(".multiple-text", {
  strings: ["23B", "ILMU KOMPUTER"],
  loop: true,
  backSpeed: 60,
  typeSpeed: 180,
  backDelay: 1000,
});

// Dark Mode Start
function toggleMode() {
  var moonIcon = document.getElementById("moon");
  var sunIcon = document.getElementById("sun");

  moonIcon.style.display =
    moonIcon.style.display === "none" ? "inline" : "none";
  sunIcon.style.display = sunIcon.style.display === "none" ? "inline" : "none";

  var element = document.body;
  element.classList.toggle("dark-mode");
}
// Dark Mode End
