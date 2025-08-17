const cloudsLayer = document.getElementById('clouds-anim-layer');
const cloudDefs = [
  { y: 76, size: 650, speed: 5,  op: 1,  z:3 },
  { y: 88, size: 420, speed: 10, op: 0.76, z:2 },
  { y: 72, size: 320, speed: 16, op: 0.72, z:1 },
  { y: 20, size: 270, speed: 14, op: 0.68, z:2 },
  { y: 28, size: 165, speed: 25, op: 0.55, z:1 },
  { y: 13, size: 180, speed: 7,  op: 0.38, z:0 },
];
function makeCloudSVG(id, size, op = 1) {
  return `
<svg id="cloud${id}" width="${size}" height="${size*0.39}" 
    viewBox="0 0 350 135" fill="none"
    style="opacity:${op}; filter: blur(0.6px); position:absolute;pointer-events:none;">
  <defs>
    <radialGradient id="cgMain${id}" cx="54%" cy="64%" r="85%">
      <stop offset="0%" stop-color="#fff"/>
      <stop offset="84%" stop-color="#ffc3e7"/>
      <stop offset="100%" stop-color="#f4a2d2"/>
    </radialGradient>
  </defs>
  <ellipse cx="110" cy="115" rx="92" ry="18" fill="#fffafc"/>
  <ellipse cx="180" cy="106" rx="66" ry="15" fill="#fff3fa" fill-opacity="0.5"/>
  <ellipse cx="230" cy="110" rx="90" ry="22" fill="#ffceed" fill-opacity="0.36"/>
  <ellipse cx="70" cy="122" rx="52" ry="10" fill="#ffd4f2" fill-opacity="0.39"/>
  <ellipse cx="165" cy="115" rx="68" ry="24" fill="#fff"/>
  <ellipse cx="178" cy="88" rx="98" ry="38" fill="url(#cgMain${id})"/>
  <ellipse cx="140" cy="120" rx="50" ry="13" fill="#fff"/>
</svg>`;
}
function layoutClouds() {
  cloudsLayer.innerHTML = "";
  const w = window.innerWidth, h = window.innerHeight;
  for (let i = 0; i < cloudDefs.length; i++) {
    let c = cloudDefs[i];
    let l = Math.random()*w*0.6;
    let el = document.createElement("div");
    el.style.position = "absolute";
    el.style.zIndex = c.z;
    el.style.width = c.size+"px";
    el.style.height = (c.size*0.39)+"px";
    el.style.left = l+"px";
    el.style.top = (h * (c.y/100))+"px";
    el.innerHTML = makeCloudSVG(i, c.size, c.op);
    c.dom = el;
    c.x = l;
    cloudsLayer.appendChild(el);
  }
}
layoutClouds();
window.addEventListener('resize',layoutClouds);
let lastT = Date.now();
function cloudsAnimLoop() {
  const now = Date.now();
  let dt = (now - lastT) / 1000;
  lastT = now;
  let w = window.innerWidth;
  for (let i = 0; i < cloudDefs.length; i++) {
    let cloud = cloudDefs[i];
    cloud.x = (cloud.x + cloud.speed*dt) % (w + cloud.size);
    cloud.dom.style.left = (cloud.x - cloud.size) + "px";
  }
  requestAnimationFrame(cloudsAnimLoop);
}
cloudsAnimLoop();
