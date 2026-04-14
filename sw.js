const CACHE_NAME = "psik23b-cache-v1";
const urlsToCache = [
  // --- BASE & ASSETS UTAMA ---
  "/",
  "/index.html",
  "/assets/style.css",
  "/assets/theme.css",
  "/assets/script.js",
  "/assets/img/logopsik.png",

  // --- FOLDER GALLERY ---
  "/gallery/index.html",
  "/gallery/gallery.css",
  "/gallery/gallery.js",

  // --- FOLDER SCHEDULE ---
  "/schedule/index.html",
  "/schedule/schedule.css",
  "/schedule/schedule.js",
  "/schedule/uas/index.html",
  "/schedule/uas/uas.css",
  "/schedule/uas/uas.js",
  "/schedule/uts/index.html",
  "/schedule/uts/uts.css",
  "/schedule/uts/uts.js",

  // --- FOLDER FITUR (MENU UTAMA) ---
  "/fitur/index.html",
  "/fitur/fitur.css",
  "/fitur/fitur.js",

  // --- FITUR: MOVIES ---
  "/fitur/Movies/index.html",
  "/fitur/Movies/movies.js",

  // --- FITUR: AI IMAGE GENERATOR ---
  "/fitur/ai-image-generator/index.html",
  "/fitur/ai-image-generator/ai-image-generator.css",
  "/fitur/ai-image-generator/ai-image-generator.js",

  // --- FITUR: LOVE ---
  "/fitur/love/index.html",
  "/fitur/love/main.css",
  "/fitur/love/main.js",

  // --- FITUR: HITUNG HARI ---
  "/fitur/hitung-hari/index.html",
  "/fitur/hitung-hari/hari.css",
  "/fitur/hitung-hari/hari.js",

  // --- FITUR: TEAM GENERATOR ---
  "/fitur/team-generator/index.html",
  "/fitur/team-generator/random.css",
  "/fitur/team-generator/random.js",

  // --- FITUR: MUSIC PLAYER ---
  "/fitur/music/main.css",
  "/fitur/music/music.js",
  "/fitur/music/script.js",
  "/fitur/music/songs/december.mp3",
  "/fitur/music/songs/sempurna.mp3",
  "/fitur/music/songs/iloveyoubibeh.mp3",
  "/fitur/music/songs/pendengarsetiamu.mp3",
  "/fitur/music/songs/kita.mp3",
  "/fitur/music/img/december.png",
  "/fitur/music/img/sempurna.png",
  "/fitur/music/img/iloveyoubibeh.png",
  "/fitur/music/img/pendengarsetiamu.png",
  "/fitur/music/img/kita.png",

  // --- FITUR GAMES: FLAPPY BIRD ---
  "/fitur/flappy-bird/index.html",
  "/fitur/flappy-bird/flappy-bird.css",
  "/fitur/flappy-bird/flappy-bird.js",
  "/fitur/flappy-bird/img/bg.jpg",
  "/fitur/flappy-bird/img/og-theme.png",
  "/fitur/flappy-bird/img/og-theme-2.png",
  "/fitur/flappy-bird/audio/sfx_die.wav",
  "/fitur/flappy-bird/audio/sfx_hit.wav",
  "/fitur/flappy-bird/audio/sfx_point.wav",
  "/fitur/flappy-bird/audio/sfx_swooshing.wav",
  "/fitur/flappy-bird/audio/sfx_wing.wav",

  // --- FITUR GAMES: TIC TAC TOE ---
  "/fitur/tic-tac-toe/index.html",
  "/fitur/tic-tac-toe/tic-tac-toe.css",
  "/fitur/tic-tac-toe/tic-tac-toe.js",
  "/fitur/tic-tac-toe/images/O.png",
  "/fitur/tic-tac-toe/images/X.png",

  // --- FITUR GAMES: SLOT ---
  "/fitur/slot/index.html",
  "/fitur/slot/slot.css",
  "/fitur/slot/slot.js",
  "/fitur/slot/audio/musik.mp3",
  "/fitur/slot/audio/jackpot.mp3",

  // --- FITUR GAMES: SPIN WHEEL ---
  "/fitur/spin-wheel/index.html",
  "/fitur/spin-wheel/spin.css",
  "/fitur/spin-wheel/spin.js",
  "/fitur/spin-wheel/file/clap.mp3",
  "/fitur/spin-wheel/file/kembang_apii.gif",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
