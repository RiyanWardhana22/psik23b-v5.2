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

// REQUEST MUSIC START
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.querySelector(".close");

btn.onclick = function () {
  modal.style.display = "flex";
  setTimeout(() => {
    modal.classList.add("active");
  }, 10);
};

span.onclick = function () {
  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }
};
