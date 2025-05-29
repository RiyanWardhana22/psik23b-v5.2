// Scroll Reveal
ScrollReveal({
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".random-header", {
  origin: "left",
});
ScrollReveal().reveal(".random-card", {
  origin: "bottom",
});

// Helper function to adjust number of groups
function adjustNumber(value) {
  const input = document.getElementById("numGroups");
  let currentValue = parseInt(input.value) || 0;
  const newValue = currentValue + value;

  if (newValue >= parseInt(input.min) && newValue <= parseInt(input.max)) {
    input.value = newValue;
  }
}

// Random Team Generator
function generateTeams() {
  const namesInput = document.getElementById("names").value;
  const numGroups = parseInt(document.getElementById("numGroups").value);
  const namesArray = namesInput
    .split("\n")
    .map((name) => name.trim())
    .filter((name) => name);

  if (numGroups < 1 || !namesArray.length) {
    Swal.fire({
      title: "Input tidak valid!",
      text: "Pastikan nama dan jumlah kelompok diisi dengan benar",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  const loadingElement = document.getElementById("loading");
  const teamsContainer = document.getElementById("teams");
  const resultsSection = document.querySelector(".results-section");

  loadingElement.style.display = "flex";
  teamsContainer.innerHTML = "";
  resultsSection.classList.remove("visible");

  setTimeout(() => {
    let previousTeams = JSON.parse(localStorage.getItem("previousTeams")) || {
      numGroups: 0,
      teams: [],
    };
    let newTeams;
    let attempt = 0;
    let maxAttempts = 10;

    do {
      newTeams = createTeams(namesArray, numGroups);
      attempt++;
    } while (
      attempt < maxAttempts &&
      numGroups === previousTeams.numGroups &&
      hasSimilarTeams(newTeams, previousTeams.teams)
    );

    localStorage.setItem(
      "previousTeams",
      JSON.stringify({ numGroups, teams: newTeams })
    );

    loadingElement.style.display = "none";
    displayTeams(newTeams);
    resultsSection.classList.add("visible");
  }, 1000);
}

function createTeams(namesArray, numGroups) {
  const shuffledNames = [...namesArray].sort(() => Math.random() - 0.5);
  const teams = Array.from({ length: numGroups }, () => []);

  shuffledNames.forEach((name, index) => {
    teams[index % numGroups].push(name);
  });

  return teams;
}

function hasSimilarTeams(newTeams, previousTeams) {
  if (previousTeams.length === 0) return false;

  let similarityCount = 0;
  newTeams.forEach((team, index) => {
    if (
      index < previousTeams.length &&
      team.some((name) => previousTeams[index].includes(name))
    ) {
      similarityCount++;
    }
  });

  return similarityCount > newTeams.length / 2;
}

function displayTeams(teams) {
  const teamsContainer = document.getElementById("teams");
  teamsContainer.innerHTML = "";

  let allTeamsText = "";

  teams.forEach((team, index) => {
    const teamGroup = document.createElement("div");
    teamGroup.classList.add("team-group");

    const teamText = `Kelompok ${index + 1}: ${team.join(", ")}\n`;
    allTeamsText += teamText;

    const teamHTML = `
      <h4><i class='bx bx-group'></i> Kelompok ${index + 1}</h4>
      <ul>
        ${team.map((member) => `<li>${member}</li>`).join("")}
      </ul>
    `;

    teamGroup.innerHTML = teamHTML;
    teamsContainer.appendChild(teamGroup);
  });

  // Show the copy button and attach the teams' text to it
  const copyButton = document.getElementById("copyButton");
  copyButton.dataset.text = allTeamsText;
}

function copyToClipboard() {
  const copyText = document.getElementById("copyButton").dataset.text;
  navigator.clipboard.writeText(copyText).then(
    () => {
      const copyButton = document.getElementById("copyButton");
      copyButton.innerHTML = `<i class='bx bx-check'></i> Tersalin!`;

      setTimeout(() => {
        copyButton.innerHTML = `<i class='bx bxs-copy'></i> Salin`;
      }, 2000);

      // Optional: Show a small notification
      const notification = document.createElement("div");
      notification.className = "copy-notification";
      notification.textContent = "Berhasil disalin!";
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.classList.add("show");
      }, 10);

      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    },
    (err) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Gagal menyalin",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}

// Add CSS for copy notification dynamically
const style = document.createElement("style");
style.textContent = `
  .copy-notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--main-color);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
  }
  
  .copy-notification.show {
    opacity: 1;
  }
`;
document.head.appendChild(style);
