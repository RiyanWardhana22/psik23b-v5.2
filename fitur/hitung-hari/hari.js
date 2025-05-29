// Scroll Reveal
ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

// ScrollReveal().reveal(".heading", { origin: "left" });
ScrollReveal().reveal(".container", {
  origin: "bottom",
});

// Hitung Umur Start
document.getElementById("ageForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const birthDate = new Date(document.getElementById("birthDate").value);
  const currentDate = new Date(document.getElementById("currentDate").value);

  const birthDay = birthDate.getDate();
  const birthMonth = birthDate.getMonth() + 1;
  const birthYear = birthDate.getFullYear();

  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  let ageYear = currentYear - birthYear;
  let ageMonth = currentMonth - birthMonth;
  let ageDay = currentDay - birthDay;

  if (ageDay < 0) {
    ageDay += new Date(currentYear, currentMonth - 1, 0).getDate();
    ageMonth--;
  }

  if (ageMonth < 0) {
    ageMonth += 12;
    ageYear--;
  }

  document.getElementById(
    "result"
  ).innerText = `${ageYear} Tahun ${ageMonth} Bulan ${ageDay} Hari`;
});
