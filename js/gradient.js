const canvas = document.getElementById("bg-gradient");
const ctx = canvas.getContext("2d");
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();
let t = 0;
function drawGradientBG() {
  const w = canvas.width, h = canvas.height;
  t += 0.014;
  let x = w/2 + Math.sin(t/2)*w/7, y = h/2 + Math.cos(t/1.8)*h/5;
  const g = ctx.createRadialGradient(
    x, y,  Math.max(w,h)*0.09,
    w/2, h/1.21, Math.max(w,h)*0.9
  );
  g.addColorStop(0, "#ffd7ee");
  g.addColorStop(0.18 + 0.1 * Math.sin(t), "#ff7abe");
  g.addColorStop(0.42 + 0.12 * Math.cos(t), "#c169f3");
  g.addColorStop(1, "#231532");
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = g;
  ctx.fillRect(0,0,w,h);
  requestAnimationFrame(drawGradientBG);
}
drawGradientBG();
