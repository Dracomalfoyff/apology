const floatingContainer = document.querySelector('.floating-elements');
const elements = ['assets/images/heart.png', 'assets/images/petal.png', 'assets/images/sparkle.png'];

function createFloatingElement() {
  const el = document.createElement('img');
  el.src = elements[Math.floor(Math.random() * elements.length)];
  el.classList.add('floating');
  el.style.left = Math.random() * 100 + 'vw';
  el.style.animationDuration = (5 + Math.random() * 5) + 's';
  floatingContainer.appendChild(el);
  setTimeout(() => el.remove(), 10000);
}

setInterval(createFloatingElement, 1000);
