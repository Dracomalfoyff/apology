// Soft swoop for headline, float for subtitle, pop for button
document.addEventListener("DOMContentLoaded", () => {
  anime({
    targets: '.main-card',
    scale: [0.93, 1],
    opacity: [0, 1],
    easing: 'easeOutBack',
    duration: 900
  });
  anime({
    targets: '.hero-title',
    translateY: [70, 0],
    opacity: [0, 1],
    delay: 220,
    duration: 1040,
    easing: 'easeOutQuart'
  });
  anime({
    targets: '.subtitle',
    opacity: [0, 1],
    delay: 700,
    duration: 950,
    easing: 'easeOutCubic'
  });
  anime({
    targets: '.glow-btn',
    scale: [0.7, 1],
    opacity: [0, 1],
    delay: 1100,
    duration: 700,
    easing: 'easeOutElastic(.83, .6)'
  });
});
