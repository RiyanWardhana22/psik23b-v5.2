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
