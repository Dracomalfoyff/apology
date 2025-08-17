const bg = document.getElementById('svg-hearts-bg');

function randomHeartSVG(x, y, size, opacity, hueRotate) {
  // Modern simple SVG heart (no raster)
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" style="opacity:${opacity};filter:hue-rotate(${hueRotate}deg);"
        viewBox="0 0 32 29"><path d="M23.6,2.6c-2.7,0-4.9,2-5.6,4.8C17.3,4.6,15,2.6,12.4,2.6C8.7,2.6,5.7,5.7,5.7,9.3
    c0,6.9,10.1,15.2,10.6,15.6c0.2,0.2,0.5,0.2,0.7,0C18.2,24.5,28.3,16.2,28.3,9.3C28.3,5.7,25.3,2.6,21.6,2.6z"
    fill="#fe6eb9" stroke="#de477a" stroke-width="1"/></svg>`;
}

// Animate 5–10 parallax hearts at random places
function generateHearts() {
  bg.innerHTML = '';
  for (let i = 0; i < 15; i++) {
    let x = Math.random() * 96, y = Math.random() * 76 + 2,
        s = 22 + Math.random()*38, o= Math.random()*0.4+0.18,
        h = Math.floor(Math.random()*45-15);
    bg.innerHTML += randomHeartSVG(`${x}vw`,`${y}vh`, s, o, h);
  }
}
generateHearts();
// Re-move every 2.5s for parallax shimmer
setInterval(generateHearts, 2500);
