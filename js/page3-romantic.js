class RomanticMemoryGame {
  constructor() {
    // Modern romantic emoji pairs
    this.emojiPairs = [
      '💕', '💖', '💗', '💘', '💝', '💞', '💟', '🫶'
    ];
    
    this.gameState = {
      flippedCards: [],
      matchedPairs: 0,
      totalPairs: 8,
      moves: 0,
      score: 0,
      startTime: null,
      gameCompleted: false
    };
    
    this.loveMessages = [
      "Every memory with you is precious 💕",
      "Perfect match! Just like us 💖",
      "You're amazing at this! 🥰",
      "Another beautiful memory unlocked 💝",
      "We make the perfect team! 👫",
      "Love is in the air! 💞",
      "You're doing wonderfully! ✨",
      "Each pair tells our story 📖💕"
    ];
    
    this.init();
  }
  
  init() {
    this.setupAudio();
    this.setupBackgroundAnimations();
    this.setupMemoryGame();
    this.setupGameTimer();
    this.setupInteractions();
  }

  setupAudio() {
    const musicChoice = sessionStorage.getItem("musicChoice");
    const music = document.getElementById("page3Music") || document.getElementById("loveIntroPage3");
    
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
          console.log("Page 3 romantic music playing!");
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

      music.volume = 1;
      music.muted = false;
      
      music.play().then(() => {
        console.log("✅ Page 3 romantic music started!");
      }).catch(err => {
        console.log("❌ Play failed:", err);
      });

      document.removeEventListener('click', playMusic);
      document.removeEventListener('touchstart', playMusic);
    };

    document.addEventListener('click', playMusic, { once: true });
    document.addEventListener('touchstart', playMusic, { once: true });
  }

  setupBackgroundAnimations() {
    // Floating hearts
    const heartEmojis = ['💕', '💖', '💗', '💘', '💝', '💞', '💟', '🫶', '💌', '🌹'];
    setInterval(() => {
      this.createFloatingHeart(heartEmojis);
    }, 1200);

    // Golden sparkles
    setInterval(() => {
      this.createGoldenSparkle();
    }, 300);

    // Rose petals
    setInterval(() => {
      this.createRosePetal();
    }, 800);
  }

  createFloatingHeart(emojis) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (4 + Math.random() * 2) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    document.getElementById('floatingHearts').appendChild(heart);
    
    setTimeout(() => {
      if (heart.parentNode) heart.parentNode.removeChild(heart);
    }, 6000);
  }

  createGoldenSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'golden-sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 3 + 's';
    
    document.getElementById('goldenSparkles').appendChild(sparkle);
    
    setTimeout(() => {
      if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
    }, 3000);
  }

  createRosePetal() {
    const petal = document.createElement('div');
    petal.className = 'rose-petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (6 + Math.random() * 2) + 's';
    
    document.getElementById('rosePetals').appendChild(petal);
    
    setTimeout(() => {
      if (petal.parentNode) petal.parentNode.removeChild(petal);
    }, 8000);
  }

  setupMemoryGame() {
    const cards = [...this.emojiPairs, ...this.emojiPairs]; // Create pairs
    this.shuffleArray(cards);

    const grid = document.getElementById('memoryGrid');
    cards.forEach((emoji, index) => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.dataset.emoji = emoji;
      card.dataset.index = index;
      card.innerHTML = '💝'; // Hidden state
      
      card.addEventListener('click', () => this.flipCard(card));
      grid.appendChild(card);
    });

    this.updateProgress();
  }

  flipCard(card) {
    if (this.gameState.flippedCards.length >= 2 || 
        card.classList.contains('flipped') || 
        card.classList.contains('matched')) return;

    // Start timer on first move
    if (!this.gameState.startTime) {
      this.gameState.startTime = Date.now();
    }

    card.classList.add('flipped');
    card.innerHTML = card.dataset.emoji;
    this.gameState.flippedCards.push(card);

    if (this.gameState.flippedCards.length === 2) {
      this.gameState.moves++;
      this.updateMoves();
      setTimeout(() => this.checkMatch(), 1000);
    }
  }

  checkMatch() {
    const [card1, card2] = this.gameState.flippedCards;
    
    if (card1.dataset.emoji === card2.dataset.emoji) {
      // Match found!
      card1.classList.add('matched');
      card2.classList.add('matched');
      
      this.gameState.matchedPairs++;
      this.gameState.score += 100;
      
      this.updateProgress();
      this.updateScore();
      this.showLoveMessage();
      
      // Check if game completed
      if (this.gameState.matchedPairs === this.gameState.totalPairs) {
        setTimeout(() => this.completeGame(), 500);
      }
    } else {
      // No match
      card1.classList.add('wrong');
      card2.classList.add('wrong');
      
      setTimeout(() => {
        card1.classList.remove('flipped', 'wrong');
        card2.classList.remove('flipped', 'wrong');
        card1.innerHTML = '💝';
        card2.innerHTML = '💝';
      }, 600);
    }
    
    this.gameState.flippedCards = [];
  }

  updateProgress() {
    const progressPercent = (this.gameState.matchedPairs / this.gameState.totalPairs) * 100;
    const progressFill = document.getElementById('progressFill');
    const progressHearts = document.getElementById('progressHearts');
    const foundPairs = document.getElementById('foundPairs');
    
    gsap.to(progressFill, {
      width: progressPercent + '%',
      duration: 0.8,
      ease: "power2.out"
    });
    
    progressHearts.textContent = '💖'.repeat(this.gameState.matchedPairs);
    foundPairs.textContent = this.gameState.matchedPairs;
  }

  updateMoves() {
    document.getElementById('moves').textContent = this.gameState.moves;
  }

  updateScore() {
    const scoreElement = document.getElementById('score');
    gsap.to({ value: parseInt(scoreElement.textContent) }, {
      value: this.gameState.score,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: function() {
        scoreElement.textContent = Math.round(this.targets()[0].value);
      }
    });
  }

  showLoveMessage() {
    const messageContent = document.getElementById('messageContent');
    const randomMessage = this.loveMessages[Math.floor(Math.random() * this.loveMessages.length)];
    
    gsap.to(messageContent, {
      scale: 0.8,
      opacity: 0,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        messageContent.textContent = randomMessage;
        gsap.to(messageContent, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      }
    });
  }

  setupGameTimer() {
    setInterval(() => {
      if (this.gameState.startTime && !this.gameState.gameCompleted) {
        const elapsed = Date.now() - this.gameState.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        document.getElementById('gameTime').textContent = 
          `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }, 1000);
  }

  completeGame() {
    this.gameState.gameCompleted = true;
    
    // Show celebration overlay
    const overlay = document.getElementById('celebrationOverlay');
    overlay.classList.add('active');
    
    // Update love message
    const messageContent = document.getElementById('messageContent');
    messageContent.textContent = "🎉 You've unlocked all our beautiful memories! 🎉";
    
    // Unlock continue button
    const continueBtn = document.getElementById('continueBtn');
    const btnText = document.getElementById('btnText');
    const continueHint = document.getElementById('continueHint');
    
    setTimeout(() => {
      overlay.classList.remove('active');
      
      continueBtn.classList.remove('locked');
      continueBtn.classList.add('unlocked');
      continueBtn.disabled = false;
      continueBtn.innerHTML = '<span class="btn-icon">💖</span><span class="btn-text">Continue Our Journey</span><div class="btn-shine"></div>';
      
      continueHint.textContent = "Ready for our next beautiful chapter? ✨";
      
      // Add sparkle effect
      this.addButtonSparkles();
    }, 3000);
  }

  addButtonSparkles() {
    const button = document.getElementById('continueBtn');
    setInterval(() => {
      const sparkle = document.createElement('div');
      sparkle.style.position = 'absolute';
      sparkle.style.width = '4px';
      sparkle.style.height = '4px';
      sparkle.style.background = '#ffd700';
      sparkle.style.borderRadius = '50%';
      sparkle.style.left = Math.random() * button.offsetWidth + 'px';
      sparkle.style.top = Math.random() * button.offsetHeight + 'px';
      sparkle.style.animation = 'sparkle 1s ease-out forwards';
      sparkle.style.pointerEvents = 'none';
      
      button.appendChild(sparkle);
      
      setTimeout(() => {
        if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
      }, 1000);
    }, 200);
  }

  setupInteractions() {
    document.getElementById('continueBtn').addEventListener('click', () => {
      if (!this.gameState.gameCompleted) return;
      
      gsap.to('#memory-experience', {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          window.location.href = 'page4.html';
        }
      });
    });
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new RomanticMemoryGame();
});
