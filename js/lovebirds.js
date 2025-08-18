(function() {
  const lovebirdDiv = document.getElementById("lovebird-layer");
  lovebirdDiv.innerHTML = `<div class="lovebirds" id="loveBirdSVG"></div>`;
  const bird = document.getElementById("loveBirdSVG");
  bird.innerHTML = `
  <svg viewBox="0 0 84 52" width="84" height="52">
    <ellipse cx="40" cy="41" rx="40" ry="10" fill="#ffe2fa" fill-opacity="0.49"/>
    <ellipse cx="35" cy="28" rx="16" ry="14" fill="#fcbde6"/>
    <ellipse cx="47" cy="28" rx="12" ry="12" fill="#fff6fc"/>
    <ellipse cx="36" cy="28" rx="4" ry="4.2" fill="#f487bc"/>
    <ellipse cx="46" cy="27.2" rx="2.2" ry="2.3" fill="#fcbde6"/>
    <circle cx="36" cy="26" r="0.7" fill="#74457a"/>
    <circle cx="47.6" cy="26.7" r="0.63" fill="#76417b"/>
    <path d="M42 26 Q42.6 25 43.2 26 Q43.8 25 44.4 26 Q44.2 27 43.2 27 Q42.2 27 42 26 Z"
      fill="#ff84c6"/>
  </svg>`;
  let lt=0;
  function animateLovebirds() {
    lt+=0.014;
    bird.style.left = (6 + Math.sin(lt/3)*12 + Math.cos(lt/6)*17) + "vw";
    bird.style.top = (78 - Math.sin(lt/2.8)*19) + "vh";
    bird.style.transform = `scale(${1+Math.sin(lt/2.4)*0.04})`;
    requestAnimationFrame(animateLovebirds);
  }
  animateLovebirds();
})();
