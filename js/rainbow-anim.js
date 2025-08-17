const rainbowSVG = document.getElementById('rainbow-anim-layer');
function drawRainbowAnim() {
  const w = window.innerWidth, h = window.innerHeight;
  rainbowSVG.setAttribute("width", w);
  rainbowSVG.setAttribute("height", h);
  rainbowSVG.innerHTML = `
  <defs>
    <linearGradient id="rainbowStripes" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffe4fa"/>
      <stop offset="20%" stop-color="#a1e8fc"/>
      <stop offset="40%" stop-color="#a5faea"/>
      <stop offset="60%" stop-color="#f5fdad"/>
      <stop offset="80%" stop-color="#ffd6a3"/>
      <stop offset="100%" stop-color="#ffbfdc"/>
    </linearGradient>
  </defs>
  <ellipse id="rainbowArc" cx="${w/2}" cy="${h*0.58}" rx="${w*0.29}" ry="${h*0.10}"
    fill="none" stroke="url(#rainbowStripes)" stroke-width="26" opacity="0.7"
    stroke-dasharray="1800" stroke-dashoffset="1800"/>
  `;
}
drawRainbowAnim();
window.addEventListener("resize",drawRainbowAnim);
function animateRainbowDraw() {
  const arc = document.getElementById('rainbowArc');
  if (!arc) return setTimeout(animateRainbowDraw,100);
  let step=0;
  function anim() {
    step+=1;
    const max = 1800;
    arc.setAttribute('stroke-dashoffset', Math.max(max-step*16,0));
    if (step*16 < max) requestAnimationFrame(anim);
  }
  anim();
}
setTimeout(animateRainbowDraw,300);
