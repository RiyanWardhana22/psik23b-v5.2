// SweetAlert Notification
Swal.fire({
  title: "Refresh websitenya yaa😉",
  color: "#fdfefe",
  padding: "3em",
  background: `linear-gradient(
    90deg,
    rgba(166, 0, 0, 1) 0%,
    rgba(220, 0, 0, 1) 50%,
    rgba(166, 0, 0, 1) 100%
  )`,
  // icon: "warning",
  confirmButtonText: "OK",
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
      hiddenElement.style.height = "1000px";
    } else {
      hiddenElement.style.height = "0";
    }
  });
});

// SECTION TABS
let tabs = document.querySelectorAll(".tabs__toggle"),
  contents = document.querySelectorAll(".tabs__content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    contents.forEach((content) => {
      content.classList.remove("is-active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("is-active");
    });
    contents[index].classList.add("is-active");
    tabs[index].classList.add("is-active");
  });
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
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Scroll Reveal
ScrollReveal({
  // reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(
  ".heading, #judul-calender, .tabs__head, .update, .btn-calender, .send-button, .send-button24",
  {
    origin: "left",
  }
);
// ScrollReveal().reveal(".toggle-button, .hidden-element,  #img", {
//   origin: "bottom",
// });
