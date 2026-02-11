// ================= OPTIMIZED JAVASCRIPT FOR FAST LOADING =================

// ================= NEW LOADER ANIMATION FOR FESTRONIX 2.0 =================
window.addEventListener('load', () => {
    const loaderContainer = document.getElementById('loader');
    
    if (!loaderContainer) {
        startContentAnimations();
        return;
    }
    
    // Faster loading (2 seconds total to allow letter animation to complete)
    setTimeout(() => {
        loaderContainer.classList.add('fade-out');
        
        // Show content after fade-out animation completes
        setTimeout(() => {
            loaderContainer.style.display = 'none';
            startContentAnimations();
        }, 800);
    }, 2000); // Slightly longer to allow letter animation to play
});

// Content animations that should start after loader
function startContentAnimations() {
    // Start typing animation immediately
    const typingText = document.getElementById('typingText');
    if (typingText) {
        const texts = [
            "FESTRONIX 2.0",
            "TECHNICAL FEST",
            "INNOVATION & CREATIVITY",
            "JOIN THE CELEBRATION"
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeText, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeText, 500);
            } else {
                setTimeout(typeText, isDeleting ? 50 : 100);
            }
        }
        
        typeText();
    }
    
    // Start other animations
    animateHeroElements();
    initializeAllFeatures();
}

// Initialize all features after page loads
function initializeAllFeatures() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize sticky navbar
    initStickyNavbar();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize back to top
    initBackToTop();
    
    // Initialize Swiper if needed
    initSwiper();
    
    // Initialize particles (lightweight)
    initParticles();
    
    // Initialize sponsors slider
    initSponsorsSlider();
    
    // Initialize 3D card effects
    init3DCardEffects();
    
    // Initialize registration form
    initRegistrationForm();
}

// ================= HERO ANIMATIONS =================
function animateHeroElements() {
    // Animate tagline with delay
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        tagline.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }
    
    // Animate hero description
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        setTimeout(() => {
            heroDescription.style.animation = 'fadeInUp 0.8s ease-out 0.2s forwards';
        }, 200);
    }
    
    // Animate buttons
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        setTimeout(() => {
            heroButtons.style.animation = 'fadeInUp 0.8s ease-out 0.4s forwards';
        }, 400);
    }
}

// ================= CUSTOM CURSOR (MOBILE FIXED) =================
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    // Check if device has touch capability (mobile/tablet)
    const isTouchDevice = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0 || 
                         navigator.msMaxTouchPoints > 0;
    
    // If it's a touch device, hide the cursor and return early
    if (isTouchDevice) {
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
        return; // Stop executing the cursor code
    }
    
    // Only run cursor code for non-touch devices (desktop)
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let cursorDotX = 0, cursorDotY = 0;
    const friction = 0.15;
    
    function updateCursor() {
        cursorX += (mouseX - cursorX) * friction;
        cursorY += (mouseY - cursorY) * friction;
        cursorDotX += (mouseX - cursorDotX) * (friction * 2);
        cursorDotY += (mouseY - cursorDotY) * (friction * 2);
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorDot.style.left = cursorDotX + 'px';
        cursorDot.style.top = cursorDotY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Start cursor animation
    updateCursor();
    
    // Optimized hover effects with event delegation
    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (target.closest('a, button, .nav-link, .social-icon, .btn, .event-btn, .spoc-btn')) {
            cursor.classList.add('hover');
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        const target = e.target;
        if (target.closest('a, button, .nav-link, .social-icon, .btn, .event-btn, .spoc-btn')) {
            cursor.classList.remove('hover');
        }
    });
}

// ================= MOBILE MENU =================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuBtn || !closeMenuBtn || !mobileMenu) return;
    
    const toggleMobileMenu = () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    };
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    closeMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on links
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.closest('.mobile-nav-link')) {
            toggleMobileMenu();
        }
    });
}

// ================= STICKY NAVBAR =================
function initStickyNavbar() {
    const stickyNav = document.getElementById('stickyNav');
    if (!stickyNav) return;
    
    let lastScrollTop = 0;
    let ticking = false;
    
    const updateNavbar = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when scrolling down
        if (scrollTop > 50) { // Reduced from 100
            stickyNav.classList.add('scrolled');
        } else {
            stickyNav.classList.remove('scrolled');
        }
        
        // Navbar hide/show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) { // Reduced from 200
            stickyNav.style.transform = 'translateY(-100%)';
        } else {
            stickyNav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

// ================= SMOOTH SCROLLING =================
function initSmoothScrolling() {
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offset = 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ================= BACK TO TOP =================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 300) { // Reduced from 500
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

// ================= SWIPER GALLERY =================
function initSwiper() {
    if (!document.querySelector('.mySwiper')) return;
    
    // Load Swiper only when needed
    if (typeof Swiper === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
        script.onload = () => {
            initializeSwiperInstance();
        };
        document.body.appendChild(script);
    } else {
        initializeSwiperInstance();
    }
    
    function initializeSwiperInstance() {
        const swiper = new Swiper('.mySwiper', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            centeredSlides: true,
            loop: true,
            speed: 500, // Faster
            autoplay: {
                delay: 2500, // Faster
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 25
                }
            }
        });
    }
}

// ================= PARTICLES BACKGROUND =================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Create fewer particles for better performance
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Smaller, faster particles
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const delay = Math.random() * 3;
        const duration = Math.random() * 5 + 3;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Simple colors for performance
        const colors = ['var(--ember)', 'var(--fire)'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        
        particlesContainer.appendChild(particle);
    }
}

// ================= SPONSORS SLIDER =================
function initSponsorsSlider() {
    const sponsorsTrack = document.querySelector('.sponsors-track');
    if (!sponsorsTrack) return;
    
    const sponsorItems = document.querySelectorAll('.sponsor-item');
    if (sponsorItems.length === 0) return;
    
    // Create clones efficiently
    const fragment = document.createDocumentFragment();
    sponsorItems.forEach(item => {
        const clone = item.cloneNode(true);
        fragment.appendChild(clone);
    });
    sponsorsTrack.appendChild(fragment);
}

// ================= 3D CARD EFFECTS =================
function init3DCardEffects() {
    const cards3D = document.querySelectorAll('.about-card-3d, .event-card-3d, .spoc-card-3d, .team-card-3d, .gallery-card, .previous-gallery-card, .sponsor-item, .contact-item');
    
    if (cards3D.length === 0) return;
    
    cards3D.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 30; // Less sensitive
            const rotateX = (centerY - y) / 30; // Less sensitive
            
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
        });
    });
}

// ================= REGISTRATION FORM =================
function initRegistrationForm() {
    const registrationForm = document.getElementById('registrationForm');
    if (!registrationForm) return;
    
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate submission (replace with actual API call)
        setTimeout(() => {
            alert('Registration submitted successfully! We will contact you soon.');
            
            // Reset form
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 800);
    });
}

// ================= LAZY LOAD IMAGES =================
function lazyLoadImages() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ================= TOUCH FEEDBACK FOR MOBILE =================
function initTouchFeedback() {
    const isTouchDevice = 'ontouchstart' in window;
    
    if (isTouchDevice) {
        // Add touch feedback to interactive elements
        const touchElements = document.querySelectorAll('a, button, .nav-link, .btn');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
        
        // Add CSS for touch feedback
        const style = document.createElement('style');
        style.textContent = `
            .touch-active {
                transform: scale(0.95) !important;
                opacity: 0.8 !important;
                transition: transform 0.1s ease !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ================= PERFORMANCE OPTIMIZATIONS =================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ================= INITIALIZE EVERYTHING ON DOM READY =================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize custom cursor (with mobile detection)
    initCustomCursor();
    
    // Initialize touch feedback for mobile
    initTouchFeedback();
    
    // Start lazy loading images
    lazyLoadImages();
    
    // Initialize features that don't depend on loader
    initMobileMenu();
    initSmoothScrolling();
    initBackToTop();
    init3DCardEffects();
    
    // If loader is already hidden (page cached), start animations immediately
    const loaderContainer = document.getElementById('loader');
    if (!loaderContainer || loaderContainer.style.display === 'none' || loaderContainer.classList.contains('fade-out')) {
        startContentAnimations();
    }
});

// ================= RESIZE OPTIMIZATION =================
window.addEventListener('resize', throttle(() => {
    // Handle resize events efficiently
    const cards3D = document.querySelectorAll('.about-card-3d, .event-card-3d, .spoc-card-3d, .team-card-3d, .gallery-card, .previous-gallery-card, .sponsor-item, .contact-item');
    cards3D.forEach(card => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
    });
}, 200));

// ================= SCROLL OPTIMIZATION =================
window.addEventListener('scroll', debounce(() => {
    // Handle scroll events efficiently
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
}, 100));

// ================= ERROR HANDLING =================
window.addEventListener('error', function(e) {
    console.log('Error occurred:', e.message);
    // Hide loader if there's an error
    const loaderContainer = document.getElementById('loader');
    if (loaderContainer) {
        loaderContainer.style.display = 'none';
    }
});

// ================= FALLBACK FOR SLOW CONNECTIONS =================
// If page takes too long to load, hide loader anyway
setTimeout(() => {
    const loaderContainer = document.getElementById('loader');
    if (loaderContainer && loaderContainer.style.display !== 'none') {
        loaderContainer.style.display = 'none';
        startContentAnimations();
    }
}, 3000); // Max 3 seconds wait