const sparkleLayer = document.getElementById("star-sparkle-layer");
const sparkleSVG = `<svg viewBox="0 0 20 20" width="20" height="20">
  <polygon points="10,0 13,7 20,10 13,13 10,20 7,13 0,10 7,7"
    fill="#fff8" stroke="#fff" stroke-width="0.9"/>
</svg>`;
function spawnSparkle() {
  const d = document.createElement('div');
  d.className = "twinkle-star";
  d.style.left = Math.random()*98 + "vw";
  d.style.top = Math.random()*93 + "vh";
  d.style.opacity = (0.45 + Math.random()*0.4).toFixed(2);
  d.innerHTML = sparkleSVG;
  sparkleLayer.appendChild(d);
  d.animate([
    {opacity: 0}, {opacity: d.style.opacity}, {opacity: 0}
  ], {duration: 1850 + Math.random()*1680, easing: "cubic-bezier(.74,0,.9,1)"});
  setTimeout(()=>{ d.remove(); }, 3400);
}
setInterval(spawnSparkle, 360);
