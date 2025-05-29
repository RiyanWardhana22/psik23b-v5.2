// Scroll Reveal
ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".audio-container, .announcement", { origin: "left" });
ScrollReveal().reveal(".game-slot", {
  origin: "bottom",
});

// Program Slot Start
const symbols = [
  "🍒",
  "🍋",
  "🍉",
  "🍇",
  "🍓",
  "🍍",
  "🍏",
  "🍆",
  "🍈",
  "🥭",
  "👑",
  "🍎",
  "🍊",
  "🍐",
  "🍔",
  "🍕",
  "🍲",
  "🍜",
  "🍱",
  "🍣",
  "🍙",
  "🍚",
  "🍛",
  "🍝",
  "🍠",
  "🍢",
  "🍥",
  "🍘",
  "🍿",
  "🥟",
  "🥠",
  "🥡",
  "🥢",
  "🥣",
  "🥤",
  "🍶",
  "🍵",
  "🍴",
  "🍽",
  "🥄",
  "🍩",
  "🍪",
  "🍫",
  "🍬",
  "🍭",
  "🍮",
  "🍯",
  "🍰",
  "🎂",
  "🍨",
  "🍧",
  "🍡",
  "🍦",
];

const values = {
  "🍒": 500,
  "🍋": 600,
  "🍉": 700,
  "🍇": 800,
  "🍓": 900,
  "🍍": 1000,
  "🍏": 1100,
  "🍆": 1200,
  "🍈": 1300,
  "🥭": 1400,
  "👑": 5000, // Nilai jackpot yang lebih tinggi
  "🍎": 1500,
  "🍊": 1600,
  "🍐": 1700,
  "🍔": 1800,
  "🍕": 1900,
  "🍲": 2000,
  "🍜": 2100,
  "🍱": 2200,
  "🍣": 2300,
  "🍛": 1600,
  "🍝": 1700,
  "🍠": 1800,
  "🍢": 1900,
  "🍥": 2000,
  "🍘": 2100,
  "🍿": 2200,
  "🥟": 2300,
  "🥠": 2400,
  "🥡": 2500,
  "🥢": 1550,
  "🥣": 1560,
  "🥤": 1570,
  "🍶": 1580,
  "🍵": 1590,
  "🍴": 1600,
  "🍽": 1610,
  "🥄": 1620,
  "🍩": 1630,
  "🍪": 1640,
  "🍫": 1650,
  "🍬": 1670,
  "🍭": 1680,
  "🍮": 1690,
  "🍯": 1700,
  "🍰": 1710,
  "🎂": 1720,
  "🍨": 1730,
  "🍧": 1740,
  "🍡": 1750,
  "🍦": 1760,
};

let balance = 0;
let spinning = false;
let spinCost = 1000;
let spinCount = 0;
let jackpotSpinCount = 0;
let autoSpinCount = 0;
const audioWin = new Audio("/fitur/slot/audio/jackpot.mp3");

// Fungsi untuk memperbarui jumlah taruhan
function updateBetAmount() {
  const betAmountSelect = document.getElementById("betAmount");
  spinCost = parseInt(betAmountSelect.value);
}

// Backsound
const audio = document.getElementById("myAudio");
const muteUnmuteButton = document.getElementById("muteUnmuteButton");

muteUnmuteButton.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    muteUnmuteButton.innerHTML = `<i class='bx bxs-volume-mute'></i>`;
  } else {
    audio.muted = true;
    muteUnmuteButton.innerHTML = `<i class='bx bxs-volume-full'></i>`;
  }
});

// Fungsi Save Saldo di LocalStorage
function loadBalance() {
  const savedBalance = localStorage.getItem("balance");
  if (savedBalance !== null) {
    balance = parseInt(savedBalance);
  }
  updateBalance(0);
}

function savedBalance() {
  localStorage.setItem("balance", balance.toString());
}

// Fungsi untuk memperbarui saldo
function updateBalance(amount) {
  balance += amount;
  document.getElementById(
    "balance"
  ).innerText = `Rp. ${balance.toLocaleString()}`;
  savedBalance();
}

// Fungsi untuk mendapatkan simbol acak
function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Fungsi utama untuk melakukan spin
function spin() {
  if (spinning) return;
  if (balance < spinCost) {
    Swal.fire("Saldo tidak cukup untuk melakukan spin.");
    return;
  }
  spinning = true;
  updateBalance(-spinCost);
  spinCount++;
  jackpotSpinCount++;

  const slot1 = document.getElementById("slot1");
  const slot2 = document.getElementById("slot2");
  const slot3 = document.getElementById("slot3");
  const result = document.getElementById("result");
  result.innerText = "Good Luck";
  let spins = 3;

  function animateSpin(slot, delay) {
    setTimeout(() => {
      const interval = setInterval(() => {
        slot.innerText = getRandomSymbol();
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
        slot.innerText = getRandomSymbol();
        spins--;
        if (spins === 0) {
          determineResult();
          spinning = false;
          if (autoSpinCount > 0) {
            autoSpinCount--;
            if (autoSpinCount > 0) {
              setTimeout(spin, 500);
            }
          }
        }
      }, 1000);
    }, delay);
  }

  function determineResult() {
    let symbol1 = slot1.innerText;
    let symbol2 = slot2.innerText;
    let symbol3 = slot3.innerText;

    let winAmount = 0;
    const jackpotChance = 0.2; // Misalnya : 0.00 = 0% Jackpot / 0.05 = 5% jackpot / 0.10 = 10% jackpot
    // const jackpotChance = 1; // 100% Auto JP bray

    if (Math.random() < jackpotChance) {
      symbol1 = symbol2 = symbol3 = "👑";
      winAmount = values["👑"] + 10000;
      result.innerText = `JACKPOT!`;
      jackpotSpinCount = 0;
      audioWin.play();
    } else {
      if (symbol1 === symbol2 && symbol2 === symbol3) {
        winAmount = values[symbol1] * 3;
      } else if (
        symbol1 === symbol2 ||
        symbol2 === symbol3 ||
        symbol1 === symbol3
      ) {
        if (symbol1 === symbol2) winAmount += values[symbol1] * 2;
        if (symbol2 === symbol3) winAmount += values[symbol2] * 2;
        if (symbol1 === symbol3) winAmount += values[symbol1] * 2;
      }
    }

    if (winAmount > 0) {
      result.innerText += ` Anda mendapatkan Rp ${winAmount.toLocaleString()}!`;
      updateBalance(winAmount);
    } else {
      result.innerText = "Coba lagi...";
    }

    slot1.innerText = symbol1;
    slot2.innerText = symbol2;
    slot3.innerText = symbol3;
  }

  animateSpin(slot1, 0);
  animateSpin(slot2, 500);
  animateSpin(slot3, 1000);
}

// Fungsi untuk memulai spin otomatis
function startAutoSpin(count) {
  if (spinning) return;
  if (balance < spinCost * count) {
    Swal.fire("Saldo tidak cukup untuk melakukan spin otomatis.");
    return;
  }
  autoSpinCount = count;
  spin();
}

// Fungsi untuk menambahkan saldo (deposit)
async function deposit() {
  const { value: amount } = await Swal.fire({
    title: "Masukkan jumlah deposit:",
    input: "text",
    inputPlaceholder: "Masukkan Jumlah Deposit",
    inputValidator: (value) => {
      const parsedValue = parseInt(value);
      if (!value || isNaN(parsedValue) || parsedValue <= 0) {
        return "Jumlah tidak valid.";
      }
      if (parsedValue > 200000) {
        return "Maximum Deposit Rp 200.000.";
      }
    },
  });

  const parsedAmount = parseInt(amount);
  if (parsedAmount > 0 && parsedAmount <= 200000) {
    updateBalance(parsedAmount);
    Swal.fire(
      "Deposit Berhasil !",
      `Saldo Anda Sekarang Rp ${balance.toLocaleString()}`,
      "success"
    );
  }
}

// Fungsi untuk menarik saldo (withdraw)
async function withdraw() {
  const { value: amount } = await Swal.fire({
    title: "Masukkan jumlah penarikan:",
    input: "text",
    inputPlaceholder: "Masukkan jumlah penarikan",
    inputValidator: (value) => {
      const parsedValue = parseInt(value);
      if (!value || isNaN(parsedValue) || parsedValue <= 0) {
        return "Jumlah tidak valid.";
      }
      if (parseInt(value) > balance) {
        return "Saldo tidak mencukupi.";
      }
      if (parsedValue < 10000) {
        return "Minimum Deposit Rp. 10,000";
      }
    },
  });

  const parsedAmount = parseInt(amount);
  if (parsedAmount > 0 && parsedAmount <= balance) {
    updateBalance(-parsedAmount);
    Swal.fire(
      "Penarikan Berhasil!",
      `Saldo Anda sekarang Rp ${balance.toLocaleString()}`,
      "success"
    );
  }
}

document
  .getElementById("betAmount")
  .addEventListener("change", updateBetAmount);

window.onload = loadBalance;
