document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation and Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Don't prevent default for non-hash links or external pages
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#' || targetId.startsWith('http')) return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('#mainHeader')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileNav = document.querySelector('.mobile-nav-sheet');
                if (mobileNav && !mobileNav.classList.contains('hidden')) {
                    mobileNav.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-nav-toggle');
    const closeToggle = document.querySelector('.close-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav-sheet');
    if (menuToggle && closeToggle && mobileNav) {
        const toggleMenu = (show) => {
            if (show) {
                mobileNav.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            } else {
                mobileNav.classList.add('hidden');
                document.body.style.overflow = '';
            }
        };
        menuToggle.addEventListener('click', () => toggleMenu(true));
        closeToggle.addEventListener('click', () => toggleMenu(false));
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    // --- Header scroll effect with throttling ---
    const mainHeader = document.getElementById('mainHeader');
    if (mainHeader) {
        let ticking = false;
        
        const updateHeader = () => {
            mainHeader.classList.toggle('scrolled', window.scrollY > 50);
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
        
        // Initial check
        updateHeader();
    }

    // Hero animations are now handled by hero.js

    // Enhanced scroll reveal animation with support for data-animate
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    });

    // Only animate elements outside the hero section
    document.querySelectorAll('.scroll-animate').forEach((element, index) => {
        if (!element.closest('#home')) {
            // Apply staggered delay for smoother appearance
            element.style.setProperty('--stagger-delay', `${index * 30}ms`);
            scrollObserver.observe(element);
        }
    });
    
    // Interactive spotlight is now handled by hero.js

    // --- Animated Stats Counter ---
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('is-counted')) {
                    statNumber.classList.add('is-counted');
                    const targetValue = parseInt(statNumber.textContent.replace('+', ''), 10);
                    let currentValue = 0;
                    const increment = Math.max(1, Math.ceil(targetValue / 100));

                    const interval = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= targetValue) {
                            currentValue = targetValue;
                            clearInterval(interval);
                        }
                        statNumber.textContent = `${currentValue}+`;
                    }, 15);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });

    document.querySelectorAll('.stat-item').forEach(item => {
        statsObserver.observe(item);
    });
}); 