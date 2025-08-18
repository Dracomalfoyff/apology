const bg = document.getElementById('fairytale-bg');
function renderBackground() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  bg.innerHTML = `
<svg viewBox="0 0 1440 900" width="${w}" height="${h}" 
     style="display:block; width:100vw;height:100vh;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fed8f6"/>
      <stop offset="70%" stop-color="#fabbe4"/>
      <stop offset="100%" stop-color="#fff"/>
    </linearGradient>
    <radialGradient id="cloud-grad" cx="50%" cy="55%" r="80%">
      <stop offset="0%" stop-color="#fff9fb"/>
      <stop offset="80%" stop-color="#f7c6e2"/>
      <stop offset="100%" stop-color="#faafd7"/>
    </radialGradient>
    <radialGradient id="cloud-grad2" cx="55%" cy="42%" r="84%">
      <stop offset="0%" stop-color="#fff7fa"/>
      <stop offset="80%" stop-color="#f3a6cf"/>
      <stop offset="100%" stop-color="#fa97d4"/>
    </radialGradient>
    <linearGradient id="rainbow" gradientTransform="rotate(50)">
      <stop offset="0%" stop-color="#ffe4fa"/>
      <stop offset="17%" stop-color="#f1e1ff"/>
      <stop offset="34%" stop-color="#a1e8fc"/>
      <stop offset="50%" stop-color="#a5faea"/>
      <stop offset="66%" stop-color="#f5fdad"/>
      <stop offset="83%" stop-color="#ffd6a3"/>
      <stop offset="100%" stop-color="#ffbfdc"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="1440" height="900" fill="url(#sky)"/>
  <!-- Rainbow -->
  <ellipse cx="720" cy="500" rx="430" ry="90" 
           fill="none" stroke="url(#rainbow)" stroke-width="22" opacity="0.45"/>
  <ellipse cx="720" cy="520" rx="370" ry="76" 
           fill="none" stroke="url(#rainbow)" stroke-width="16" opacity="0.38"/>
  <!-- Back clouds (bottom) -->
  <ellipse cx="720" cy="860" rx="800" ry="112" fill="url(#cloud-grad)" opacity="0.97"/>
  <ellipse cx="1160" cy="880" rx="180" ry="44" fill="#fff" opacity="0.85"/>
  <ellipse cx="280" cy="870" rx="180" ry="42" fill="#fff" opacity="0.84"/>
  <!-- Foreground clouds - painterly -->
  <path d="M200,730 
    Q260,800 440,810 Q580,820 720,790 Q970,830 1240,770 
    Q1330,750 1400,800 Q1560,900 100,900 Z" 
    fill="url(#cloud-grad2)" opacity="0.93"/>
  <ellipse cx="240" cy="790" rx="90" ry="34" fill="#ffeafd"/>
  <ellipse cx="1240" cy="800" rx="96" ry="33" fill="#ffeafd"/>
  <!-- Dreamy upper clouds -->
  <ellipse cx="220" cy="190" rx="44" ry="18" fill="#fff" opacity="0.69"/>
  <ellipse cx="1220" cy="120" rx="62" ry="22" fill="#fff" opacity="0.78"/>
  <ellipse cx="500" cy="80" rx="32" ry="10" fill="#fdd7f7" opacity="0.8"/>
  <ellipse cx="970" cy="55" rx="46" ry="17" fill="#ffd4ea" opacity="0.8"/>
  <!-- Sparkles -->
  <g>
    <circle cx="650" cy="140" r="3" fill="#fff" fill-opacity="0.85"/>
    <circle cx="1200" cy="220" r="2.3" fill="#fff" fill-opacity="0.68"/>
    <circle cx="960" cy="135" r="1.7" fill="#fff" fill-opacity="0.7"/>
    <circle cx="350" cy="110" r="2.3" fill="#fff" fill-opacity="0.87"/>
    <circle cx="1350" cy="250" r="2.5" fill="#fff" />
    <circle cx="780" cy="52"  r="1.2" fill="#fff" />
    <circle cx="700" cy="175" r="2.2" fill="#fff" />
    <circle cx="1240" cy="340" r="1.6" fill="#fff" fill-opacity="0.7"/>
    <circle cx="360" cy="260" r="1.6" fill="#fff" fill-opacity="0.5"/>
  </g>
  <!-- Lovebirds on a cloud -->
  <g>
    <ellipse cx="950" cy="835" rx="26" ry="11" fill="#ffeafe"/>
    <ellipse cx="938" cy="830" rx="13" ry="6.5" fill="#ffd2ee"/>
    <ellipse cx="944" cy="834" rx="10" ry="4.1" fill="#f9b8df"/>
    <!-- Bird 1 (left) -->
    <ellipse cx="938" cy="827" rx="7" ry="4.1" fill="#fdb5df"/>
    <ellipse cx="933" cy="825" rx="4.2" ry="2.0" fill="#ff92cc"/>
    <polygon points="930,825 928,824 931,827" fill="#ffc87c"/>
    <circle cx="934.8" cy="826" r="0.7" fill="#77507a"/>
    <!-- Bird 2 (right) -->
    <ellipse cx="948" cy="827" rx="5" ry="3" fill="#fff6fb"/>
    <ellipse cx="951" cy="826" rx="2" ry="1.1" fill="#fbb4df"/>
    <polygon points="949,825 950,824 950,827" fill="#ffc87c"/>
    <circle cx="951.4" cy="826" r="0.5" fill="#77507a"/>
    <!-- Heart between birds -->
    <path d="M942,818 Q943,815 944,818 Q945,815 946,818 Q945,821 944,820 Q943,821 942,818Z"
      fill="#ff85b0" opacity="1"/>
  </g>
</svg>
  `;
}
renderBackground();
window.addEventListener('resize', renderBackground);
