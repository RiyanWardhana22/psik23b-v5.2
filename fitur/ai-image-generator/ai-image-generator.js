const themeToggle = document.querySelector(".theme-toggle");
const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");
const promptBtn = document.querySelector(".prompt-btn");
const generateBtn = document.querySelector(".generate-btn");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");
const gridGallery = document.querySelector(".gallery-grid");

const API_KEY = "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"; // API riyanwardhana2
// const API_KEY = "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"; // API riyanwardhana55

const examplePrompts = [
  "Hutan ajaib dengan tanaman bercahaya dan rumah peri di antara jamur raksasa",
  "Pesawat steampunk tua yang mengambang di awan keemasan saat matahari terbenam",
  "Koloni Mars di masa depan dengan kubah kaca dan taman berlatar belakang pegunungan merah",
  "Seekor naga yang tertidur di atas koin emas di dalam gua kristal",
  "Kerajaan bawah laut dengan manusia serigala dan bangunan karang yang bercahaya",
  "Pulau terapung dengan air terjun yang mengalir ke awan di bawahnya",
  "Pondok penyihir di musim gugur dengan tanaman ajaib di taman",
  "Robot yang sedang melukis di studio yang cerah dengan perlengkapan seni di sekelilingnya",
  "Perpustakaan ajaib dengan buku-buku bercahaya yang mengambang dan tangga spiral",
  "Kuil Jepang saat musim sakura dengan lentera dan pegunungan berkabut",
  "Pantai kosmik dengan pasir bercahaya dan aurora di langit malam",
  "Pasar abad pertengahan dengan tenda warna-warni dan artis jalanan",
  "Kota cyberpunk dengan lampu-lampu neon dan mobil-mobil terbang pada malam hari",
  "Hutan bambu yang damai dengan kuil kuno yang tersembunyi",
  "Kura-kura raksasa yang membawa sebuah desa di atas punggungnya di lautan",
];

// Menghitung lebar/tinggi berdasarkan pemilihan rasio
const getImageDimensions = (aspectRatio, baseSize = 512) => {
  const [width, height] = aspectRatio.split("/").map(Number);
  const scaleFactor = baseSize / Math.sqrt(width * height);

  let calculatedWidth = Math.round(width * scaleFactor);
  let calculatedHeight = Math.round(height * scaleFactor);

  // Ensure dimensions are multiples of 16 (AI model requirements)
  calculatedWidth = Math.floor(calculatedWidth / 16) * 16;
  calculatedHeight = Math.floor(calculatedHeight / 16) * 16;
  return { width: calculatedWidth, height: calculatedHeight };
};

// Mengganti spinner loading dengan gambar yang dihasilkan
const updateImageCard = (imgIndex, imgUrl) => {
  const imgCard = document.getElementById(`img-card-${imgIndex}`);
  if (!imgCard) return;

  imgCard.classList.remove("loading");
  imgCard.innerHTML = `<img src="${imgUrl}" class="result-img" />
              <div class="img-overlay">
                <a href="${imgUrl}" class="img-download-btn" download="${Date.now()}.png">
                  <i class="fa-solid fa-download"></i>
                </a>
              </div>`;
};

const generateImages = async (
  selectedModel,
  imageCount,
  aspectRatio,
  promptText
) => {
  const MODEL_URL = `https://router.huggingface.co/hf-inference/models/${selectedModel}`;
  const { width, height } = getImageDimensions(aspectRatio);
  generateBtn.setAttribute("disabled", "true");

  const imagePromises = Array.from({ length: imageCount }, async (_, i) => {
    try {
      const response = await fetch(MODEL_URL, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          // "x-use-cache": "false",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: promptText,
          parameters: { width, height },
          options: { wait_for_model: true, user_cache: false },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      // Konversi respon ke gambar dan update image card
      const result = await response.blob();
      updateImageCard(i, URL.createObjectURL(result));
    } catch (error) {
      console.log(error);
      const imgCard = document.getElementById(`img-card-${i}`);
      imgCard.classList.replace("loading", "error");
      imgCard.querySelector(".status-text").textContent =
        "Generation Failed! Check terminal for more details";
    }
  });

  await Promise.allSettled(imagePromises);
  generateBtn.removeAttribute("disabled");
};

// CREATE PLACEHOLDER CARDS WITH LOADING SPINNER
const createImageCards = (
  selectedModel,
  imageCount,
  aspectRatio,
  promptText
) => {
  gridGallery.innerHTML = "";
  for (let i = 0; i < imageCount; i++) {
    gridGallery.innerHTML += `<div class="img-card loading" id="img-card-${i}" style="aspect-ratio: ${aspectRatio}">
              <div class="status-container">
                <div class="spinner"></div>
                  <i class="fa-solid fa-triangle-exclamation"></i>
                  <p class="status-text">Generating...</p>
                </div>
              </div>`;
  }

  generateImages(selectedModel, imageCount, aspectRatio, promptText);
};

// Handle Form Submission
const handleFormSubmit = (e) => {
  e.preventDefault();
  //   Get form value
  const selectedModel = modelSelect.value;
  const imageCount = parseInt(countSelect.value) || 1;
  const aspectRatio = ratioSelect.value || "1/1";
  const promptText = promptInput.value.trim();

  createImageCards(selectedModel, imageCount, aspectRatio, promptText);
};

// Isi Prompt menggunakan variable examplePrompts
promptBtn.addEventListener("click", () => {
  const prompt =
    examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
  promptInput.value = prompt;
  promptInput.focus();
});

promptForm.addEventListener("submit", handleFormSubmit);
themeToggle.addEventListener("click", toggleTheme);
