class RomanticForgivenessExperience {
  constructor() {
    this.attemptCount = 0;
    this.maxAttempts = 5;
    this.isNoButtonRunning = false;
    this.runPositions = this.generateRomanticPositions();
    
    this.init();
  }
  
  init() {
    this.setupAudio();
    this.setupRomanticAtmosphere();
    this.setupEventListeners();
    this.setupCharacterAnimations();
    this.addRomanticTouches();
  }

  setupAudio() {
    const musicChoice = sessionStorage.getItem("musicChoice");
    const music = document.getElementById("loveIntroPage5");
    const sweetChime = document.getElementById("sweetChime");
    const sadnessSound = document.getElementById("sadnessSound");
    const celebrationBells = document.getElementById("celebrationBells");
    
    this.music = music;
    this.sweetChime = sweetChime;
    this.sadnessSound = sadnessSound;
    this.celebrationBells = celebrationBells;

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
          gsap.to(music, { volume: 0.5, duration: 3 });
          console.log("🎵 Soft romantic piano playing...");
        }).catch(err => {
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
    }
  }

  startMusicOnInteraction() {
    const music = this.music;
    let hasStarted = false;

    const playMusic = () => {
      if (hasStarted || !music) return;
      hasStarted = true;

      const savedTime = sessionStorage.getItem("musicTime");
      if (savedTime) {
        music.currentTime = parseFloat(savedTime);
      }

      music.volume = 0.5;
      music.muted = false;
      music.play().catch(err => console.log("Music play failed:", err));
    };

    document.addEventListener('click', playMusic, { once: true });
    document.addEventListener('touchstart', playMusic, { once: true });
  }

  setupRomanticAtmosphere() {
    this.spawnRosePetals();
    this.spawnLightOrbs();
    this.spawnLoveSparkles();
    this.spawnDreamyHearts();
  }

  spawnRosePetals() {
    const petals = ['🌸', '🌺', '🌹', '🥀', '💮'];
    setInterval(() => {
      const petal = document.createElement('div');
      petal.className = 'rose-petal';
      petal.textContent = petals[Math.floor(Math.random() * petals.length)];
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = (8 + Math.random() * 4) + 's';
      petal.style.animationDelay = Math.random() * 2 + 's';
      
      document.getElementById('rosePetals').appendChild(petal);
      
      setTimeout(() => {
        if (petal.parentNode) petal.parentNode.removeChild(petal);
      }, 12000);
    }, 1000);
  }

  spawnLightOrbs() {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const orb = document.createElement('div');
        orb.className = 'light-orb';
        orb.style.left = Math.random() * 100 + '%';
        orb.style.top = Math.random() * 100 + '%';
        orb.style.animationDelay = Math.random() * 4 + 's';
        
        document.getElementById('lightOrbs').appendChild(orb);
      }, i * 500);
    }
  }

  spawnLoveSparkles() {
    const sparkles = ['✨', '⭐', '🌟', '💫', '⚡'];
    setInterval(() => {
      const sparkle = document.createElement('div');
      sparkle.className = 'love-sparkle';
      sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = Math.random() * 3 + 's';
      
      document.getElementById('loveSparkles').appendChild(sparkle);
      
      setTimeout(() => {
        if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
      }, 3000);
    }, 400);
  }

  spawnDreamyHearts() {
    const hearts = ['💕', '💖', '💗', '💘', '💝', '💞', '💟', '🫶'];
    setInterval(() => {
      const heart = document.createElement('div');
      heart.className = 'dreamy-heart';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDuration = (12 + Math.random() * 6) + 's';
      
      document.getElementById('dreamyHearts').appendChild(heart);
      
      setTimeout(() => {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
      }, 18000);
    }, 2000);
  }

  setupEventListeners() {
    const yesFlower = document.getElementById('yesFlower');
    const noFlower = document.getElementById('noFlower');
    const openGiftBtn = document.getElementById('openGiftBtn');

    // Yes flower choice
    yesFlower.addEventListener('click', () => this.handleYesChoice());
    yesFlower.addEventListener('mouseenter', () => this.playLoveChime());
    
    // No flower choice
    noFlower.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleNoChoice();
    });
    
    noFlower.addEventListener('mouseenter', () => {
      if (this.attemptCount >= 2 && !this.isNoButtonRunning) {
        this.makeFlowerRun();
      }
    });

    // Gift button
    openGiftBtn.addEventListener('click', () => this.openFinalSurprise());
    openGiftBtn.addEventListener('mouseenter', () => this.playLoveChime());

    // Prevent context menu
    noFlower.addEventListener('contextmenu', e => e.preventDefault());
  }

  setupCharacterAnimations() {
    // Add extra character expressions
    setInterval(() => {
      this.addRandomCharacterMoment();
    }, 8000);
  }

  addRomanticTouches() {
    // Add floating hearts around character
    setInterval(() => {
      this.spawnCharacterHearts();
    }, 3000);

    // Add gentle screen glow effect
    setInterval(() => {
      this.addGentleGlow();
    }, 5000);
  }

  handleYesChoice() {
    if (this.celebrationBells) {
      this.celebrationBells.currentTime = 0;
      this.celebrationBells.play().catch(e => console.log("Celebration bells failed"));
    }

    // Create romantic celebration
    this.createRomanticCelebration();

    // Transition to success scene
    gsap.to('#forgivenessScene', {
      opacity: 0,
      scale: 0.95,
      y: -20,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        document.getElementById('forgivenessScene').style.display = 'none';
        document.getElementById('successScene').classList.add('active');
        
        gsap.fromTo('#successScene', 
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)" }
        );
      }
    });
  }

  handleNoChoice() {
    this.attemptCount++;

    if (this.sadnessSound) {
      this.sadnessSound.currentTime = 0;
      this.sadnessSound.play().catch(e => console.log("Sadness sound failed"));
    }

    // Make flower run away
    this.makeFlowerRun();

    // Show sadness overlay
    this.showSadnessOverlay();

    // Update character to cry more
    this.updateCharacterToCry();

    // Update encouragement message
    this.updateEncouragementMessage();
  }

  makeFlowerRun() {
    const noFlower = document.getElementById('noFlower');
    this.isNoButtonRunning = true;
    
    noFlower.classList.add('running');
    
    const position = this.runPositions[this.attemptCount % this.runPositions.length];
    
    gsap.to(noFlower, {
      top: position.top,
      left: position.left,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        setTimeout(() => {
          this.isNoButtonRunning = false;
        }, 1000);
      }
    });

    // Change flower to more wilted
    const pleadingTexts = [
      'Please forgive me! 🥺',
      'I\'m truly sorry! 😭',
      'My heart is breaking! 💔',
      'I need your love! 🙏',
      'Don\'t leave me! 😰'
    ];
    
    const textIndex = Math.min(this.attemptCount - 1, pleadingTexts.length - 1);
    noFlower.querySelector('.no-label').textContent = pleadingTexts[textIndex];
  }

  showSadnessOverlay() {
    const overlay = document.getElementById('sadnessOverlay');
    overlay.classList.add('active');
    
    // Create rain effect
    this.createRainEffect();
    
    // Screen shake effect
    gsap.to('body', {
      x: 2,
      duration: 0.1,
      repeat: 12,
      yoyo: true,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set('body', { x: 0 });
      }
    });

    // Hide overlay after 4 seconds
    setTimeout(() => {
      overlay.classList.remove('active');
    }, 4000);
  }

  createRainEffect() {
    const rainContainer = document.getElementById('rainEffect');
    
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const drop = document.createElement('div');
        drop.className = 'raindrop';
        drop.textContent = '💧';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDelay = Math.random() * 2 + 's';
        
        rainContainer.appendChild(drop);
        
        setTimeout(() => {
          if (drop.parentNode) drop.parentNode.removeChild(drop);
        }, 2000);
      }, i * 100);
    }
  }

  updateCharacterToCry() {
    const leftTear = document.getElementById('leftTear');
    const rightTear = document.getElementById('rightTear');
    
    leftTear.style.animationDuration = '2s';
    rightTear.style.animationDuration = '2s';
  }

  updateEncouragementMessage() {
    const encouragementTexts = [
      'My heart yearns for your forgiveness... 💕',
      'Every beat of my heart says sorry... 💖',
      'You are my sunshine, don\'t go away... ☀️',
      'I promise to love you better... 🌹',
      'Please give me one more chance... 🙏'
    ];
    
    const textIndex = Math.min(this.attemptCount - 1, encouragementTexts.length - 1);
    document.getElementById('sweetEncouragement').innerHTML = `<p>${encouragementTexts[textIndex]}</p>`;
  }

  createRomanticCelebration() {
    const colors = ['#ffb3ba', '#ffc9dd', '#e8d5ff', '#c7f7c7', '#ffd89b'];
    
    // Create heart burst
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.textContent = ['💕', '💖', '💗', '💘', '💝'][Math.floor(Math.random() * 5)];
        heart.style.cssText = `
          position: fixed;
          left: 50%;
          top: 50%;
          font-size: ${Math.random() * 20 + 15}px;
          pointer-events: none;
          z-index: 1500;
        `;
        
        document.body.appendChild(heart);
        
        gsap.to(heart, {
          x: (Math.random() - 0.5) * 600,
          y: (Math.random() - 0.5) * 400,
          rotation: 360,
          scale: Math.random() * 1.5 + 0.5,
          duration: Math.random() * 3 + 2,
          ease: "power2.out",
          onComplete: () => {
            if (heart.parentNode) heart.parentNode.removeChild(heart);
          }
        });
      }, i * 40);
    }
  }

  openFinalSurprise() {
    const theater = document.getElementById('romanticVideoTheater');
    const video = document.getElementById('romanticSurpriseVideo');
    
    theater.classList.add('active');
    
    // Pause background music
    if (this.music) this.music.pause();
    
    // Open curtains after 1 second
    setTimeout(() => {
      theater.classList.add('curtains-open');
    }, 1000);
    
    // Start video after curtains open
    setTimeout(() => {
      video.play().then(() => {
        console.log("🎬 Romantic surprise video playing!");
      }).catch(err => {
        console.log("Video play failed:", err);
        setTimeout(() => window.location.reload(), 2000);
      });
    }, 3000);

    // Auto-refresh when video ends
    video.addEventListener('ended', () => {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });

    // Fallback refresh
    setTimeout(() => {
      window.location.reload();
    }, 60000);
  }

  addRandomCharacterMoment() {
    const character = document.getElementById('characterWrapper');
    const moments = [
      () => gsap.to(character, { rotation: 5, duration: 0.5, yoyo: true, repeat: 1 }),
      () => gsap.to(character, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1 }),
      () => gsap.to(character, { y: -5, duration: 0.4, yoyo: true, repeat: 1 })
    ];
    
    const randomMoment = moments[Math.floor(Math.random() * moments.length)];
    randomMoment();
  }

  spawnCharacterHearts() {
    const character = document.getElementById('characterWrapper');
    const rect = character.getBoundingClientRect();
    
    const heart = document.createElement('div');
    heart.textContent = ['💕', '💖', '💗'][Math.floor(Math.random() * 3)];
    heart.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width/2}px;
      top: ${rect.top}px;
      font-size: 20px;
      pointer-events: none;
      z-index: 100;
    `;
    
    document.body.appendChild(heart);
    
    gsap.to(heart, {
      y: -100,
      x: (Math.random() - 0.5) * 100,
      rotation: 360,
      scale: 0.5,
      duration: 3,
      ease: "power2.out",
      onComplete: () => {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
      }
    });
  }

  addGentleGlow() {
    const container = document.querySelector('.love-letter-container');
    gsap.to(container, {
      boxShadow: '0 20px 60px rgba(255, 182, 193, 0.6)',
      duration: 2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  }

  generateRomanticPositions() {
    return [
      { top: '20%', left: '70%' },
      { top: '60%', left: '20%' },
      { top: '30%', left: '80%' },
      { top: '70%', left: '30%' },
      { top: '15%', left: '25%' },
      { top: '80%', left: '75%' },
      { top: '45%', left: '10%' },
      { top: '55%', left: '85%' }
    ];
  }

  playLoveChime() {
    if (this.sweetChime) {
      this.sweetChime.currentTime = 0;
      this.sweetChime.volume = 0.3;
      this.sweetChime.play().catch(e => console.log("Sweet chime failed"));
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new RomanticForgivenessExperience();
});
