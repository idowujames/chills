// Scroll Animation Handler
class ScrollAnimator {
    constructor() {
        this.animateOnScrollElements = document.querySelectorAll('.scroll-animate');
        this.initialize();
    }

    initialize() {
        // Don't run on mobile devices to save performance
        if (window.innerWidth < 768) {
            this.animateOnScrollElements.forEach(el => el.classList.add('visible'));
            return;
        }

        // Set up intersection observer
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a small delay between each element's animation
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        // Stop observing after animation is triggered
                        observer.unobserve(entry.target);
                    }, delay);
                }
            });
        }, observerOptions);

        // Observe each element
        this.animateOnScrollElements.forEach((element, index) => {
            // Stagger animations with a small delay
            element.dataset.delay = index * 50; // 50ms delay between each element
            observer.observe(element);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    if (document.querySelector('.scroll-animate')) {
        new ScrollAnimator();
    }
});
