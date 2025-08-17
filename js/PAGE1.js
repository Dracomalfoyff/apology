class LandingPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startEmotionalSequence();
        this.addInteractiveElements();
    }

    setupEventListeners() {
        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) {
            continueBtn.addEventListener('click', this.handleContinue.bind(this));
            continueBtn.addEventListener('mouseenter', this.addButtonParticles.bind(this));
        }

        // Add progress step listeners
        document.querySelectorAll('.step').forEach((step, index) => {
            step.addEventListener('click', () => {
                if (index === 0) return; // Already on page 1
                window.ApologyWebsite.navigateToPage(index + 1);
            });
        });
    }

    handleContinue() {
        // Add dramatic exit animation
        const mainContainer = document.querySelector('.main-container');
        mainContainer.style.animation = 'dramaticExit 1s ease-in forwards';
        
        // Show transition message
        window.ApologyWebsite.showNotification('Taking you to prove my sincerity...', 'info', 2000);
        
        setTimeout(() => {
            window.ApologyWebsite.navigateToPage(2);
        }, 1200);
    }

    addButtonParticles(event) {
        const button = event.target;
        window.ApologyWebsite.addParticleEffect(button, 15);
    }

    startEmotionalSequence() {
        // Gradually increase emotional intensity
        setTimeout(() => {
            this.addTearDrops();
        }, 3000);

        setTimeout(() => {
            this.makeSceneMoreDramatic();
        }, 5000);
    }

    addTearDrops() {
        const femaleTeddy = document.querySelector('.female-teddy');
        if (!femaleTeddy) return;

        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const tear = document.createElement('div');
                tear.innerHTML = '💧';
                tear.style.cssText = `
                    position: absolute;
                    font-size: 1.5rem;
                    left: 60%;
                    top: 40%;
                    animation: tearFall 2s ease-in forwards;
                    pointer-events: none;
                `;
                femaleTeddy.appendChild(tear);

                setTimeout(() => {
                    if (tear.parentNode) {
                        tear.parentNode.removeChild(tear);
                    }
                }, 2000);
            }, i * 800);
        }
    }

    makeSceneMoreDramatic() {
        // Add rain effect
        const weatherEffect = document.querySelector('.weather-effect');
        if (weatherEffect) {
            weatherEffect.style.opacity = '0.6';
        }

        // Make male teddy more desperate
        const maleTeddy = document.querySelector('.male-teddy');
        if (maleTeddy) {
            maleTeddy.style.animation = 'desperateWiggle 2s ease-in-out infinite';
        }
    }

    addInteractiveElements() {
        // Add hover effects to teddies
        document.querySelectorAll('.teddy-body').forEach(teddy => {
            teddy.addEventListener('mouseenter', () => {
                teddy.style.transform = 'scale(1.1)';
                teddy.style.transition = 'transform 0.3s ease';
            });

            teddy.addEventListener('mouseleave', () => {
                teddy.style.transform = 'scale(1)';
            });
        });

        // Add click effect to guilt meter
        const guiltBar = document.querySelector('.guilt-bar');
        if (guiltBar) {
            guiltBar.addEventListener('click', () => {
                window.ApologyWebsite.showNotification('My guilt is overflowing! 😭', 'error');
            });
        }
    }
}

// Additional CSS for page 1 specific animations
const page1Styles = document.createElement('style');
page1Styles.textContent = `
    @keyframes dramaticExit {
        0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.8) rotate(-5deg);
        }
    }

    @keyframes tearFall {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(100px) scale(0.5);
        }
    }

    @keyframes desperateWiggle {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        25% { transform: translateX(-10px) rotate(-5deg); }
        50% { transform: translateX(10px) rotate(5deg); }
        75% { transform: translateX(-5px) rotate(-2deg); }
    }
`;
document.head.appendChild(page1Styles);

// Initialize page 1
document.addEventListener('DOMContentLoaded', () => {
    new LandingPage();
});
