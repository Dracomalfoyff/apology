// ✅ Pick correct audio element for each page
const music = document.getElementById("loveIntro") || document.getElementById("loveIntroPage2");
const overlay = document.getElementById("musicOverlay");
const yesBtn = document.getElementById("yesMusic");
const noBtn = document.getElementById("noMusic");
const beginBtn = document.getElementById("beginBtn");

// 🎶 Enable music
function enableMusic() {
  if (!music) return;

  // Restore last position if available
  const lastTime = sessionStorage.getItem("musicTime");
  if (lastTime) {
    music.currentTime = parseFloat(lastTime);
  } else {
    music.currentTime = 0;
  }

  music.volume = 0;
  music.muted = false;

  music.play().then(() => {
    let v = 0;
    const fade = setInterval(() => {
      v += 0.02;
      music.volume = Math.min(1, v);
      if (v >= 1) clearInterval(fade);
    }, 120);

    // 🔧 FIXED: Use "musicChoice" instead of "musicEnabled"
    sessionStorage.setItem("musicChoice", "yes");
    if (overlay) overlay.style.display = "none";
  }).catch(err => {
    console.log("Autoplay blocked. Waiting for click...");
    document.addEventListener("click", () => {
      music.play().then(() => {
        // Also set full volume here
        music.volume = 1;
        console.log("Music started after click ✅");
      });
    }, { once: true });
  });
}

// 🚫 Disable music
function disableMusic() {
  // 🔧 FIXED: Use "musicChoice" instead of "musicEnabled"
  sessionStorage.setItem("musicChoice", "no");
  if (overlay) overlay.style.display = "none";
  if (music) music.pause();
}

// ⏳ Save current playback time before unload
window.addEventListener("beforeunload", () => {
  if (music) {
    sessionStorage.setItem("musicTime", music.currentTime);
  }
});

// 🌸 Attach only if buttons exist
if (yesBtn) yesBtn.addEventListener("click", enableMusic);
if (noBtn) noBtn.addEventListener("click", disableMusic);

// Redirect on Begin (index only)
if (beginBtn) {
  beginBtn.addEventListener("click", () => {
    window.location.href = "page2.html";
  });
}

// Auto-check preference
window.addEventListener("DOMContentLoaded", () => {
  // 🔧 FIXED: Use "musicChoice" instead of "musicEnabled"
  const pref = sessionStorage.getItem("musicChoice");
  if (pref === "yes") {
    enableMusic();
  } else if (pref === "no" && overlay) {
    overlay.style.display = "none";
  }
});
