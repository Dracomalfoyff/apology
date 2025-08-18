class PremiumSorryExperience {
  constructor() {
    this.currentStage = 1;
    this.totalStages = 4;
    this.isTransitioning = false;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = [];

    this.init();
  }

  init() {
    this.setupAudio();
    this.setup3DBackground();
    this.setupEmotionalEffects();
    this.setupStageTransitions();
    this.setupInteractions();
    this.startExperience();
  }

 setupAudio() {
  // Now this will correctly find the "yes" value from Page 1
  const musicChoice = sessionStorage.getItem("musicChoice");
  const music = document.getElementById("page2Music") || document.getElementById("loveIntroPage2");
  
  this.music = music;

  if (musicChoice === "yes" && music) {
    const savedTime = sessionStorage.getItem("musicTime");
    if (savedTime) {
      music.currentTime = parseFloat(savedTime);
    }
    
    music.volume = 0;
    music.muted = false;

    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        gsap.to(music, { volume: 1, duration: 2 });
        console.log("Page 2 music autoplay successful!");
      }).catch(err => {
        console.log("Autoplay blocked, waiting for user interaction");
        this.startMusicOnInteraction();
      });
    } else {
      this.startMusicOnInteraction();
    }

    setInterval(() => {
      if (music && !music.paused) {
        sessionStorage.setItem("musicTime", music.currentTime);
      }
    }, 1000);
  } else {
    console.log("Music choice:", musicChoice); // Debug what value is actually stored
  }
}


  setup3DBackground() {
    const canvas = document.getElementById('backgroundCanvas');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 5;

    const heartGeometry = new THREE.SphereGeometry(0.05, 8, 6);
    const heartMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b8a,
      transparent: true,
      opacity: 0.6
    });

    for (let i = 0; i < 100; i++) {
      const heart = new THREE.Mesh(heartGeometry, heartMaterial);
      heart.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      heart.velocity = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      };
      this.particles.push(heart);
      this.scene.add(heart);
    }

    this.animate3D();
  }

  animate3D() {
    requestAnimationFrame(() => this.animate3D());

    this.particles.forEach(particle => {
      particle.position.x += particle.velocity.x;
      particle.position.y += particle.velocity.y;
      particle.position.z += particle.velocity.z;

      if (Math.abs(particle.position.x) > 10) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 10) particle.velocity.y *= -1;
      if (Math.abs(particle.position.z) > 10) particle.velocity.z *= -1;

      particle.rotation.x += 0.01;
      particle.rotation.y += 0.01;
    });

    if (this.mouseX && this.mouseY) {
      this.camera.position.x += (this.mouseX * 0.001 - this.camera.position.x) * 0.05;
      this.camera.position.y += (-this.mouseY * 0.001 - this.camera.position.y) * 0.05;
    }

    this.renderer.render(this.scene, this.camera);
  }

  setupEmotionalEffects() {
    setInterval(() => { this.createTear(); }, 300);
    setInterval(() => { this.createFloatingWord(); }, 2000);
  }

  createTear() {
    const tear = document.createElement('div');
    tear.className = 'tear-drop';
    tear.style.left = Math.random() * 100 + '%';
    tear.style.animationDuration = (2 + Math.random() * 3) + 's';
    tear.style.opacity = Math.random() * 0.8 + 0.2;
    document.getElementById('sorryRain').appendChild(tear);
    setTimeout(() => { if (tear.parentNode) tear.parentNode.removeChild(tear); }, 5000);
  }

  createFloatingWord() {
    const words = ['regret', 'sorrow', 'mistake', 'forgiveness', 'love', 'sorry', 'hurt', 'healing'];
    const word = document.createElement('div');
    word.className = 'floating-word';
    word.textContent = words[Math.floor(Math.random() * words.length)];
    word.style.left = Math.random() * 100 + '%';
    word.style.fontSize = (Math.random() * 10 + 12) + 'px';
    word.style.animationDuration = (6 + Math.random() * 4) + 's';
    document.getElementById('floatingWords').appendChild(word);
    setTimeout(() => { if (word.parentNode) word.parentNode.removeChild(word); }, 10000);
  }

  setupStageTransitions() {
    setTimeout(() => this.nextStage(), 5000);
    setTimeout(() => this.nextStage(), 12000);
    setTimeout(() => this.nextStage(), 20000);
  }

  nextStage() {
    if (this.isTransitioning || this.currentStage >= this.totalStages) return;
    this.isTransitioning = true;
    const currentStageEl = document.getElementById(`stage${this.currentStage}`);
    gsap.to(currentStageEl, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        currentStageEl.classList.remove('active');
        this.currentStage++;
        this.showStage(this.currentStage);
      }
    });
  }

  showStage(stageNum) {
    const stageEl = document.getElementById(`stage${stageNum}`);
    stageEl.classList.add('active');
    const progressFill = document.getElementById('progressFill');
    gsap.to(progressFill, {
      width: (stageNum / this.totalStages) * 100 + '%',
      duration: 1,
      ease: "power2.out"
    });
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index < stageNum);
    });
    this.animateStageContent(stageNum);
    setTimeout(() => { this.isTransitioning = false; }, 1500);
  }

  animateStageContent(stageNum) {
    switch(stageNum) {
      case 2:
        this.animateConfessionStage();
        break;
      case 3:
        this.animateMemoryStage();
        break;
      case 4:
        this.animateRedemptionStage();
        break;
    }
  }

  animateConfessionStage() {
    const confessionLines = document.querySelectorAll('.confession-line');
    confessionLines.forEach((line, index) => {
      const delay = parseInt(line.dataset.delay) || 0;
      setTimeout(() => {
        gsap.fromTo(line,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
        );
      }, delay);
    });
    setTimeout(() => {
      const regretMeter = document.getElementById('regretMeter');
      gsap.to(regretMeter, { width: '95%', duration: 2, ease: "power2.out" });
    }, 3000);
  }

  animateMemoryStage() {
    const memoryFrames = document.querySelectorAll('.memory-frame');
    memoryFrames.forEach((frame, index) => {
      setTimeout(() => {
        gsap.fromTo(frame,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)" }
        );
      }, index * 800);
    });
  }

  animateRedemptionStage() {
    const promiseItems = document.querySelectorAll('.promise-item');
    promiseItems.forEach((item, index) => {
      setTimeout(() => {
        gsap.fromTo(item,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
        );
      }, index * 500);
    });
  }

  setupInteractions() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX - window.innerWidth / 2);
      this.mouseY = (e.clientY - window.innerHeight / 2);
    });
    document.getElementById('stage1').addEventListener('click', () => {
      if (this.currentStage === 1 && !this.isTransitioning) {
        this.nextStage();
      }
    });
    document.getElementById('acceptJourney').addEventListener('click', () => {
      this.fadeOutAndRedirect();
    });
    window.addEventListener('resize', () => {
      if (this.renderer && this.camera) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    });
  }

  fadeOutAndRedirect() {
    gsap.to('#sorry-experience', {
      opacity: 0,
      duration: 2,
      ease: "power2.inOut",
      onComplete: () => {
        window.location.href = 'page3.html';
      }
    });
  }

  startExperience() {
    this.showStage(1);
    const mainSorry = document.getElementById('mainSorry');
    setInterval(() => {
      if (this.currentStage === 1) {
        gsap.fromTo(mainSorry,
          { scale: 1 },
          { scale: 1.02, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.inOut" }
        );
      }
    }, 2000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PremiumSorryExperience();
});