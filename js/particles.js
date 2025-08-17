const L = 15;
const heartsCont = document.getElementById('particles-layer');
function fancyHeartSVG(size, rot) {
  return `<svg width="${size}" height="${size*0.9}" viewBox="0 0 64 56"
    style="transform: rotate(${rot}deg);" xmlns="http://www.w3.org/2000/svg">
<defs>
  <radialGradient id="g1" cx="50%" cy="40%" r="74%">
    <stop offset="0%" stop-color="#fff0fc" stop-opacity="0.95"/>
    <stop offset="48%" stop-color="#ff78c6"/>
    <stop offset="100%" stop-color="#fc4187"/>
  </radialGradient>
  <radialGradient id="shine" cx="32%" cy="19%" r="83%">
    <stop offset="0%" stop-color="#fff" stop-opacity="0.83"/>
    <stop offset="62%" stop-color="#fff" stop-opacity="0"/>
  </radialGradient>
</defs>
<path d="M32,51 C30,47 9,36 9,22 C9,10 22,3 32,18 C42,3 55,10 55,22 C55,36 34,47 32,51Z"
  fill="url(#g1)" stroke="#d41465" stroke-width="2.6" filter="drop-shadow(0 6px 15px #ff8cd3ad)"/>
<ellipse cx="23" cy="17" rx="7" ry="6" fill="url(#shine)" />
</svg>`;
}
function makeParticle() {
  const size = 64 + Math.random()*28;
  const rot = -15 + Math.random()*30;
  const d = document.createElement('div');
  d.className = 'soft-spark-heart';
  d.style.position = "absolute";
  d.style.left = Math.random()*87 + "vw";
  d.style.top = (80+Math.random()*13) + "vh";
  d.style.opacity = (0.34+Math.random()*0.66).toFixed(2);
  d.innerHTML = fancyHeartSVG(size, rot);
  heartsCont.appendChild(d);
  const dur = 9000 + Math.random()*2600;
  d.animate([
    {transform: `translateY(0) rotate(${rot}deg) scale(1)`, opacity: d.style.opacity},
    {transform: `translateY(-${260+Math.random()*50}px) rotate(${rot+12-Math.random()*30}deg) scale(1.14)`, opacity: 0.06}
  ], {duration: dur, easing: 'cubic-bezier(.45,.72,.2,1)'});
  setTimeout(() => { d.remove(); }, dur-200);
}
setInterval(() => makeParticle(), 920);
window.addEventListener("DOMContentLoaded", () => {
  for(let i=0;i<L;i++) setTimeout(makeParticle, 400*i);
});
