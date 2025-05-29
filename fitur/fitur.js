// Scroll Reveal
ScrollReveal({
  // reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".heading-fitur", {
  origin: "top",
});

ScrollReveal().reveal("#chatbot-toggler", {
  origin: "left",
});

ScrollReveal().reveal(".container, .judul, .audio, .send-button, #alert", {
  origin: "bottom",
});

// CHANGELOG START
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
