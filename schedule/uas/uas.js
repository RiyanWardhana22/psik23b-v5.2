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

// Section Timetable
const toggleButtons = document.querySelectorAll(".toggle-button");
const hiddenElements = document.querySelectorAll(".hidden-element");

toggleButtons.forEach((toggleButton, index) => {
  toggleButton.addEventListener("click", function () {
    const hiddenElement = hiddenElements[index];

    if (
      hiddenElement.style.height === "0px" ||
      hiddenElement.style.height === ""
    ) {
      hiddenElement.style.height = "680px";
    } else {
      hiddenElement.style.height = "0";
    }
  });
});

// Type Js
const typed = new Typed(".multiple-text", {
  strings: ["23B", "ILMU KOMPUTER"],
  loop: true,
  backSpeed: 60,
  typeSpeed: 180,
  backDelay: 1000,
});

// Scroll Reveal
ScrollReveal({
  // reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".heading, .update", { origin: "left" });
ScrollReveal().reveal(".toggle-button, .hidden-element", {
  origin: "bottom",
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
