class InteractiveLoveStory {
  constructor() {
    this.currentChapter = 0;
    this.userChoices = {};
    this.musicSaveInterval = null;
    this.storyData = {
      memories: {
        'first-talk': {
          image: 'assets/images/memories/first-conversation.jpg',
          video: 'assets/videos/memories/first-talk.mp4',
          text: "Remember that nervous excitement? When we first started talking, I knew something magical was beginning..."
        },
        'first-smile': {
          image: 'assets/images/memories/first-smile.jpg', 
          video: 'assets/videos/memories/first-smile.mp4',
          text: "Your smile lit up my entire world. In that moment, I knew I wanted to make you smile like that forever..."
        },
        'first-laugh': {
          image: 'assets/images/memories/first-laugh.jpg',
          video: 'assets/videos/memories/first-laugh.mp4', 
          text: "That beautiful sound of your laughter became my favorite melody. I knew then that I wanted to hear it every day..."
        },
        'adventure': {
          video: 'assets/videos/memories/adventures.mp4',
          text: "Every adventure with you feels like a fairytale. You make even the simplest moments extraordinary..."
        },
        'quiet-moments': {
          video: 'assets/videos/memories/quiet-times.mp4',
          text: "In your arms, I found my peace. These quiet moments together are my most treasured memories..."
        },
        'overcoming': {
          video: 'assets/videos/memories/growing-stronger.mp4',
          text: "Every challenge we've faced has only made us stronger. Together, we can overcome anything..."
        },
        'laughter': {
          gif: 'assets/gifs/laughing-together.gif',
          text: "The way we make each other laugh is pure magic. You bring joy to every corner of my heart..."
        },
        'support': {
          gif: 'assets/gifs/supporting-love.gif',
          text: "You lift me up when I'm down, and I promise to always be your strength too..."
        },
        'dreams': {
          gif: 'assets/gifs/shared-dreams.gif',
          text: "Our dreams intertwined create the most beautiful future I could ever imagine..."
        }
      }
    };
    
    this.init();
  }
  
  init() {
    this.setupAudio();
    this.setupBackgroundAnimations();
    this.setupEnhancedEffects();
    this.setupEventListeners();
    this.setupScrollTriggers();
    this.typewriterEffects();
    this.setupMobileEnhancements();
  }

  setupAudio() {
    const musicChoice = sessionStorage.getItem("musicChoice");
    const music = document.getElementById("loveIntroPage4");
    
    this.music = music;
    
    if (musicChoice === "yes" && music) {
      const savedTime = sessionStorage.getItem("musicTime");
      if (savedTime) {
        music.currentTime = parseFloat(savedTime);
      }
      
      music.volume = 0;
      music.muted = false;
      music.loop = true;

      const playPromise = music.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          gsap.to(music, { volume: 0.6, duration: 3 });
          console.log("Page 4 romantic music playing!");
        }).catch(err => {
          console.log("Autoplay blocked, waiting for interaction");
          this.startMusicOnInteraction();
        });
      } else {
        this.startMusicOnInteraction();
      }

      this.musicSaveInterval = setInterval(() => {
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

      music.volume = 0.6;
      music.muted = false;
      
      music.play().then(() => {
        console.log("✅ Page 4 romantic music started!");
      }).catch(err => {
        console.log("❌ Play failed:", err);
      });
    };

    document.addEventListener('click', playMusic, { once: true });
    document.addEventListener('touchstart', playMusic, { once: true });
  }

  setupBackgroundAnimations() {
    this.setupLoveConstellation();
    this.spawnFloatingPetals();
    this.spawnGoldenParticles();
    this.spawnLoveBubbles();
  }

  setupEnhancedEffects() {
    this.createShootingStars();
    this.setupHeartTrail();
  }

  createShootingStars() {
    setInterval(() => {
      const star = document.createElement('div');
      star.innerHTML = '✨';
      star.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 15 + 10}px;
        left: -50px;
        top: ${Math.random() * 50}%;
        color: #ffd700;
        pointer-events: none;
        z-index: 5;
        animation: shootingStar 4s linear forwards;
      `;
      
      document.querySelector('.romantic-atmosphere').appendChild(star);
      setTimeout(() => star.remove(), 4000);
    }, 3000);
  }

  setupHeartTrail() {
    let lastSpawn = 0;
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastSpawn > 200) {
        lastSpawn = now;
        
        const heart = document.createElement('div');
        heart.innerHTML = ['💕', '💖', '💗', '💝'][Math.floor(Math.random() * 4)];
        heart.style.cssText = `
          position: fixed;
          left: ${e.clientX - 10}px;
          top: ${e.clientY - 10}px;
          font-size: 18px;
          pointer-events: none;
          z-index: 100;
          animation: heartFade 2s ease-out forwards;
        `;
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
      }
    });
  }

  setupMobileEnhancements() {
    let startY = 0;
    let currentY = 0;

    document.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', (e) => {
      currentY = e.touches.clientY;
    });

    document.addEventListener('touchend', () => {
      const diff = startY - currentY;
      if (Math.abs(diff) > 50) {
        this.createTouchFeedback();
      }
    });
  }

  createTouchFeedback() {
    const feedback = document.createElement('div');
    feedback.innerHTML = '💫';
    feedback.style.cssText = `
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
      pointer-events: none;
      z-index: 1000;
      animation: sparkleExplode 1s ease-out forwards;
    `;
    
    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 1000);
  }

  setupLoveConstellation() {
    const canvas = document.getElementById('loveConstellation');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];
    const heartCount = 50;

    for (let i = 0; i < heartCount; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.3,
        direction: Math.random() * Math.PI * 2
      });
    }

    const animateConstellation = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      hearts.forEach(heart => {
        heart.x += Math.cos(heart.direction) * heart.speed;
        heart.y += Math.sin(heart.direction) * heart.speed;
        
        if (heart.x < 0 || heart.x > canvas.width) heart.direction = Math.PI - heart.direction;
        if (heart.y < 0 || heart.y > canvas.height) heart.direction = -heart.direction;
        
        ctx.fillStyle = `rgba(255, 107, 138, ${heart.opacity})`;
        ctx.font = `${heart.size * 10}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText('💖', heart.x, heart.y);
      });
      
      requestAnimationFrame(animateConstellation);
    };
    
    animateConstellation();
  }

  spawnFloatingPetals() {
    setInterval(() => {
      const petal = document.createElement('div');
      petal.className = 'floating-petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = (6 + Math.random() * 4) + 's';
      petal.style.animationDelay = Math.random() * 2 + 's';
      
      document.getElementById('floatingPetals').appendChild(petal);
      
      setTimeout(() => {
        if (petal.parentNode) petal.parentNode.removeChild(petal);
      }, 10000);
    }, 800);
  }

  spawnGoldenParticles() {
    setInterval(() => {
      const particle = document.createElement('div');
      particle.className = 'golden-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 4 + 's';
      
      document.getElementById('goldenParticles').appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      }, 4000);
    }, 200);
  }

  spawnLoveBubbles() {
    setInterval(() => {
      const bubble = document.createElement('div');
      bubble.className = 'love-bubble';
      const size = Math.random() * 40 + 20;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = Math.random() * 100 + '%';
      bubble.style.bottom = '0px';
      bubble.style.animationDuration = (4 + Math.random() * 3) + 's';
      
      document.getElementById('loveBubbles').appendChild(bubble);
      
      setTimeout(() => {
        if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
      }, 7000);
    }, 1500);
  }

  setupEventListeners() {
    // Begin story button
    document.getElementById('beginStoryBtn').addEventListener('click', () => {
      this.startStory();
    });

    // Choice buttons
    document.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleChoice(e.target.closest('.choice-btn'));
      });
    });

    // Close memory modal
    document.getElementById('closeMemory').addEventListener('click', () => {
      this.closeMemoryModal();
    });

    // NEW: Continue to next page button (Chapter 4 only)
    const continueBtn = document.getElementById('continueToNextPageBtn');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        console.log("🚀 Continue button clicked!");
        this.redirectToNextPage();
      });
    }

    this.generatePolaroidMemories();
    this.generateFloatingLoveWords();
  }

  startStory() {
    gsap.to('#storyIntro', {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        document.getElementById('storyIntro').style.display = 'none';
        this.showChapter(1);
      }
    });
  }

  showChapter(chapterNum) {
    this.currentChapter = chapterNum;
    const chapter = document.getElementById(`chapter${chapterNum}`);
    chapter.classList.add('active');
    
    gsap.fromTo(chapter, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
    
    this.animateTypewriter(`chapter${chapterNum}Text`);
  }

  handleChoice(choiceBtn) {
    const choice = choiceBtn.dataset.choice;
    const chapter = parseInt(choiceBtn.dataset.chapter);
    
    if (choiceBtn.disabled) return;
    
    if (!this.userChoices[`chapter${chapter}`]) {
      this.userChoices[`chapter${chapter}`] = [];
    }
    
    this.userChoices[`chapter${chapter}`].push(choice);
    
    if (this.music && !this.music.paused) {
      const originalVolume = this.music.volume;
      gsap.to(this.music, { 
        volume: originalVolume * 1.3, 
        duration: 0.2,
        yoyo: true,
        repeat: 1
      });
    }
    
    this.createSparkleEffect(choiceBtn);
    
    gsap.timeline()
      .to(choiceBtn, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)"
      })
      .to(choiceBtn, {
        scale: 1.02,
        duration: 0.2
      });
    
    choiceBtn.classList.add('selected');
    choiceBtn.style.background = 'linear-gradient(135deg, rgba(255,107,138,0.9), rgba(253,121,168,0.9))';
    choiceBtn.style.color = 'white';
    choiceBtn.disabled = true;
    choiceBtn.style.cursor = 'default';
    
    setTimeout(() => {
      this.showMemoryModal(choice);
    }, 600);
  }

  createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();
    const sparkles = ['✨', '💫', '⭐', '🌟'];
    
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement('div');
      sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
      sparkle.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width/2 + (Math.random() - 0.5) * 100}px;
        top: ${rect.top + rect.height/2 + (Math.random() - 0.5) * 100}px;
        font-size: ${Math.random() * 10 + 12}px;
        pointer-events: none;
        z-index: 1000;
        animation: sparkleExplode 1.5s ease-out forwards;
        animation-delay: ${i * 0.1}s;
      `;
      
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1500);
    }
  }

  showMemoryModal(choice) {
    const modal = document.getElementById('memoryModal');
    const memoryData = this.storyData.memories[choice];
    
    if (memoryData) {
      const mediaContainer = document.getElementById('memoryMedia');
      const textElement = document.getElementById('memoryText');
      
      mediaContainer.innerHTML = '';
      
      const spinner = this.createLoadingSpinner();
      mediaContainer.appendChild(spinner);
      
      if (memoryData.image) {
        const img = document.createElement('img');
        img.src = memoryData.image;
        img.alt = 'Our memory';
        img.addEventListener('load', () => {
          spinner.remove();
          mediaContainer.appendChild(img);
          gsap.fromTo(img, 
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
          );
        });
      } else if (memoryData.video) {
        const video = document.createElement('video');
        video.src = memoryData.video;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.controls = false;
        
        video.addEventListener('loadeddata', () => {
          spinner.remove();
          mediaContainer.appendChild(video);
          gsap.fromTo(video, 
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
          );
        });
      } else if (memoryData.gif) {
        const img = document.createElement('img');
        img.src = memoryData.gif;
        img.alt = 'Our memory';
        img.addEventListener('load', () => {
          spinner.remove();
          mediaContainer.appendChild(img);
          gsap.fromTo(img, 
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
          );
        });
      }
      
      this.typewriterText(textElement, memoryData.text);
      modal.classList.add('active');
    }
  }

  createLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    return spinner;
  }

  typewriterText(element, text) {
    element.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 40);
  }

  closeMemoryModal() {
    const modal = document.getElementById('memoryModal');
    modal.classList.remove('active');
    
    // For chapters 1-3, check if all choices are made
    if (this.currentChapter < 4) {
      const currentChapterSection = document.getElementById(`chapter${this.currentChapter}`);
      const currentChapterChoices = currentChapterSection.querySelectorAll('.choice-btn');
      const selectedChoices = currentChapterSection.querySelectorAll('.choice-btn.selected');
      
      if (selectedChoices.length === 3 && currentChapterChoices.length === 3) {
        this.showChapterCompletionMessage(() => {
          this.hideCurrentChapter(() => {
            this.showChapter(this.currentChapter + 1);
          });
        });
      }
    }
    // For chapter 4, just close modal - user will use continue button when ready
  }

  showChapterCompletionMessage(callback) {
    const completionOverlay = document.createElement('div');
    completionOverlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(255,107,138,0.95);
      backdrop-filter: blur(10px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      opacity: 0;
      font-family: 'Dancing Script', cursive;
      text-align: center;
      color: white;
    `;
    
    const messages = [
      "✨ Chapter 1 Complete! ✨<br><span style='font-size: 1.5rem; font-family: Cormorant Garamond, serif;'>Every beginning holds magic...</span>",
      "💕 Chapter 2 Complete! 💕<br><span style='font-size: 1.5rem; font-family: Cormorant Garamond, serif;'>Our journey grows more beautiful...</span>",
      "💖 Chapter 3 Complete! 💖<br><span style='font-size: 1.5rem; font-family: Cormorant Garamond, serif;'>You've discovered what makes us perfect...</span>"
    ];
    
    completionOverlay.innerHTML = `
      <div style="font-size: 3rem; margin-bottom: 1rem; text-shadow: 0 0 20px rgba(255,255,255,0.8);">
        ${messages[this.currentChapter - 1]}
      </div>
      <div style="font-size: 1.2rem; opacity: 0.9; margin-top: 2rem;">
        Continuing to next chapter...
      </div>
    `;
    
    document.body.appendChild(completionOverlay);

    gsap.to(completionOverlay, {
      opacity: 1,
      duration: 0.7,
      ease: "power2.out",
      onComplete: () => {
        this.createCelebrationHearts(completionOverlay);

        setTimeout(() => {
          gsap.to(completionOverlay, {
            opacity: 0,
            duration: 0.7,
            ease: "power2.inOut",
            onComplete: () => {
              completionOverlay.remove();
              if (callback) callback();
            }
          });
        }, 1800);
      }
    });
  }

  createCelebrationHearts(container) {
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = ['💕', '💖', '💗', '💝', '💘'][Math.floor(Math.random() * 5)];
        heart.style.cssText = `
          position: absolute;
          left: ${Math.random() * 100}%;
          top: 100%;
          font-size: ${Math.random() * 10 + 20}px;
          pointer-events: none;
          animation: celebrationHeart 3s ease-out forwards;
          animation-delay: ${Math.random() * 0.5}s;
        `;
        
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 3500);
      }, i * 100);
    }
  }

  hideCurrentChapter(callback) {
    const currentChapter = document.getElementById(`chapter${this.currentChapter}`);
    gsap.to(currentChapter, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        currentChapter.classList.remove('active');
        currentChapter.style.display = 'none';
        if (callback) callback();
      }
    });
  }

  redirectToNextPage() {
    console.log("🚀 Redirecting to page5.html");
    
    // Save music and choices
    if (this.music && !this.music.paused) {
      sessionStorage.setItem("musicTime", this.music.currentTime);
    }
    if (this.musicSaveInterval) {
      clearInterval(this.musicSaveInterval);
    }
    sessionStorage.setItem("loveStoryChoices", JSON.stringify(this.userChoices));
    
    // Beautiful transition effect
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #ff6b8a, #fd79a8, #a29bfe);
      z-index: 10000;
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Dancing Script', cursive;
      font-size: 3rem;
      color: white;
      text-shadow: 0 0 20px rgba(255,255,255,0.8);
    `;
    
    overlay.innerHTML = 'Our story continues... 💕';
    document.body.appendChild(overlay);
    
    gsap.to(overlay, {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        setTimeout(() => {
          window.location.href = 'page5.html';
        }, 1000);
      }
    });
  }

  generatePolaroidMemories() {
    const container = document.getElementById('polaroidMemories');
    if (!container) return;
    
    const memories = [
      'assets/images/polaroid/memory1.jpg',
      'assets/images/polaroid/memory2.jpg', 
      'assets/images/polaroid/memory3.jpg',
      'assets/images/polaroid/memory4.jpg',
      'assets/images/polaroid/memory5.jpg'
    ];
    
    memories.forEach((src, index) => {
      const polaroid = document.createElement('div');
      polaroid.className = 'polaroid-photo';
      polaroid.style.setProperty('--rotation', `${(Math.random() - 0.5) * 30}deg`);
      polaroid.style.left = Math.random() * 80 + '%';
      polaroid.style.top = Math.random() * 70 + '%';
      polaroid.style.animationDelay = index * 0.5 + 's';
      
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Our memory';
      polaroid.appendChild(img);
      
      container.appendChild(polaroid);
    });
  }

  generateFloatingLoveWords() {
    const container = document.getElementById('floatingLoveWords');
    if (!container) return;
    
    const words = ['Love', 'Forever', 'Soulmate', 'Heart', 'Dreams', 'Together', 'Always', 'Beautiful'];
    
    words.forEach((word, index) => {
      const wordElement = document.createElement('div');
      wordElement.className = 'love-word';
      wordElement.textContent = word;
      wordElement.style.left = Math.random() * 90 + '%';
      wordElement.style.top = Math.random() * 80 + '%';
      wordElement.style.animationDelay = index * 0.8 + 's';
      
      container.appendChild(wordElement);
    });
  }

  animateTypewriter(textId) {
    const element = document.getElementById(textId);
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(typeInterval);
      }
    }, 50);
  }

  setupScrollTriggers() {
    gsap.registerPlugin(ScrollTrigger);
  }

  typewriterEffects() {
    setTimeout(() => {
      this.animateTypewriter('chapter1Text');
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new InteractiveLoveStory();
});
