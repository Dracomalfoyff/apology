// Shared JavaScript functionality across all pages

class ApologyWebsite {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 5;
        this.hearts = ['💖', '💕', '💗', '💝', '💞', '💟', '💓', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🖤', '🤎'];
        this.init();
    }

    init() {
        this.createFloatingHearts();
        this.updateProgressIndicator();
        this.addPageTransitions();
        this.preloadNextPage();
    }

    createFloatingHearts() {
        const container = document.getElementById('heartsContainer');
        if (!container) return;

        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = this.hearts[Math.floor(Math.random() * this.hearts.length)];
            
            // Random positioning and timing
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.animationDuration = (Math.random() * 3 + 6) + 's';
            heart.style.fontSize = (Math.random() * 20 + 16) + 'px';
            
            container.appendChild(heart);

            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 8000);
        }, 600);
    }

    updateProgressIndicator() {
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 === this.currentPage) {
                step.classList.add('active');
            } else if (index + 1 < this.currentPage) {
                step.classList.add('completed');
            }
        });
    }

    navigateToPage(pageNumber) {
        if (pageNumber < 1 || pageNumber > this.totalPages) return;
        
        const pages = {
            1: 'index.html',
            2: 'game.html',
            3: 'forgive.html',
            4: 'heartfelt.html',
            5: 'finale.html'
        };

        // Add page transition effect
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            window.location.href = pages[pageNumber];
        }, 300);
    }

    addPageTransitions() {
        // Add smooth entry animation
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(0.95)';
        document.body.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            document.body.style.transform = 'scale(1)';
        }, 100);
    }

    preloadNextPage() {
        // Preload next page for faster navigation
        const nextPageUrls = {
            'index.html': 'game.html',
            'game.html': 'forgive.html',
            'forgive.html': 'heartfelt.html',
            'heartfelt.html': 'finale.html'
        };

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const nextPage = nextPageUrls[currentPage];
        
        if (nextPage) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = nextPage;
            document.head.appendChild(link);
        }
    }

    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-green)' : type === 'error' ? 'var(--error-red)' : 'var(--primary-pink)'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 600;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }

    addParticleEffect(element, particleCount = 20) {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.innerHTML = this.hearts[Math.floor(Math.random() * this.hearts.length)];
            particle.style.cssText = `
                position: absolute;
                pointer-events: none;
                font-size: ${Math.random() * 20 + 10}px;
                color: ${['#ff6b9d', '#ff8cc5', '#a55eea', '#ff4757'][Math.floor(Math.random() * 4)]};
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: explode 1s ease-out forwards;
                animation-delay: ${Math.random() * 0.5}s;
            `;
            
            element.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1500);
        }
    }
}

// CSS for particle explosion effect
const style = document.createElement('style');
style.textContent = `
    @keyframes explode {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Initialize the website
const website = new ApologyWebsite();

// Make it globally available
window.ApologyWebsite = website;
