// Bokeh effect with canvas
const bokeh = document.getElementById("bokeh-bg");
const bctx = bokeh.getContext("2d");
function resizeBokeh() {
  bokeh.width = window.innerWidth;
  bokeh.height = window.innerHeight;
}
window.addEventListener('resize', resizeBokeh);
resizeBokeh();

let bokehs = [];
function initBokeh() {
  bokehs = [];
  for(let i=0;i<24;i++){
    bokehs.push({
      x: Math.random()*bokeh.width,
      y: Math.random()*bokeh.height,
      r: 20+Math.random()*38,
      a: 0.1+Math.random()*0.18,
      dx: (Math.random()-0.5)*0.16,
      dy: (Math.random()-0.5)*0.13,
      hue: 320+Math.random()*100,
    });
  }
}
function drawBokeh() {
  bctx.clearRect(0,0,bokeh.width,bokeh.height);
  for(let b of bokehs){
    bctx.beginPath();
    bctx.arc(b.x,b.y,b.r,0,2*Math.PI);
    bctx.fillStyle = `hsla(${b.hue},87%,77%,${b.a})`;
    bctx.shadowColor = `hsla(${b.hue},95%,88%,.6)`;
    bctx.shadowBlur = 15;
    bctx.fill();
    b.x += b.dx; b.y += b.dy;
    if(b.x<0||b.x>bokeh.width) b.dx*=-1;
    if(b.y<0||b.y>bokeh.height) b.dy*=-1;
  }
  requestAnimationFrame(drawBokeh);
}

initBokeh();
drawBokeh();
window.addEventListener('resize', ()=>{ resizeBokeh(); initBokeh(); });
