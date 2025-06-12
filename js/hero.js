// Hero Section Animations
class HeroAnimations {
    constructor() {
        this.heroSection = document.getElementById('home');
        this.heroContent = document.querySelector('.hero-content-container');
        this.overlay = document.querySelector('.hero-overlay');
        this.chevron = document.querySelector('.hero-chevron-down');
        
        // Initialize animations
        this.initParticles();
        this.initMouseMoveEffect();
        this.initScrollReveal();
        this.initScrollDown();
    }

    // Initialize particle.js effect
    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 150,
                        "density": {
                            "enable": true,
                            "value_area": 1000
                        }
                    },
                    "color": {
                        "value": ["#d4a017", "#ffffff", "#f8d56b"]
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        }
                    },
                    "opacity": {
                        "value": 0.7,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 2,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 0.5,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": false
                    },
                    "move": {
                        "enable": true,
                        "speed": 0.5,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "bubble"
                        },
                        "resize": true
                    },
                    "modes": {
                        "repulse": {
                            "distance": 100,
                            "duration": 0.4
                        },
                        "bubble": {
                            "distance": 200,
                            "size": 6,
                            "duration": 0.3,
                            "opacity": 0.8,
                            "speed": 3
                        }
                    }
                },
                "retina_detect": true
            });
        }
    }


    // Initialize mouse move effect for the hero section
    initMouseMoveEffect() {
        if (!this.heroSection || !this.overlay) return;

        this.heroSection.addEventListener('mousemove', (e) => {
            const { left, top } = this.heroSection.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            // Update overlay gradient position only
            this.overlay.style.setProperty('--x', `${x}px`);
            this.overlay.style.setProperty('--y', `${y}px`);
        });

        // No need to reset transform on mouseleave, as parallax is removed
        this.heroSection.addEventListener('mouseleave', () => {
            // No action needed
        });
    }


    // Initialize scroll reveal animations
    initScrollReveal() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateText();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        if (this.heroSection) {
            observer.observe(this.heroSection);
        }
    }

    // Animate text with staggered delays
    animateText() {
        // Add animate-in class to trigger CSS animations
        this.heroSection.classList.add('animate-in');

        // Animate characters in the first line
        const chars = document.querySelectorAll('.line1 .char');
        chars.forEach((char, index) => {
            char.style.setProperty('--char-index', index);
            char.style.animation = `charReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.03}s forwards`;
        });

        // Animate words in the second line
        const words = document.querySelectorAll('.line2 .word-wrapper');
        words.forEach((word, index) => {
            const wordSpan = word.querySelector('span');
            wordSpan.style.setProperty('--word-index', index);
            wordSpan.style.animation = `maskedWordSlideUp 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + (index * 0.1)}s forwards`;
        });
    }

    // Smooth scroll for the chevron
    initScrollDown() {
        if (!this.chevron) return;

        this.chevron.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = this.chevron.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Initialize particles for any section
function initSectionParticles(containerId, options = {}) {
    if (typeof particlesJS !== 'undefined' && document.getElementById(containerId)) {
        const defaultOptions = {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#d4a017", "#ffffff", "#f8d56b"]
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 0.3,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 70,
                        duration: 0.4
                    }
                }
            },
            retina_detect: true
        };

        // Merge default options with custom options
        const finalOptions = JSON.parse(JSON.stringify(defaultOptions));
        if (options.particles) {
            finalOptions.particles = { ...defaultOptions.particles, ...options.particles };
        }
        if (options.interactivity) {
            finalOptions.interactivity = { ...defaultOptions.interactivity, ...options.interactivity };
        }

        particlesJS(containerId, finalOptions);
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize hero section animations if it exists
    if (document.getElementById('home')) {
        const heroAnimations = new HeroAnimations();
    }
    
    // Artists section particles have been removed for better performance
});
