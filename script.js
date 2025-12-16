/* =====================================================
   DEVREON DEV - Interactive JavaScript
   Animations, Scroll Effects, and Interactions
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initScrollReveal();
    initNavigation();
    initStatsCounter();
    initContactForm();
    initSmoothScroll();
    initParallaxEffects();
    initScrollProgress();
    initCursorGlow();
    init3DCardEffects();
});

/* =====================================================
   SCROLL REVEAL ANIMATION
   Using Intersection Observer for performance
   ===================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (!revealElements.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after reveal for performance
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/* =====================================================
   NAVIGATION
   Active states, scroll behavior, mobile navigation
   ===================================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileNav = document.getElementById('mobileNav');
    const navItems = document.querySelectorAll('.nav-item');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const sections = document.querySelectorAll('section[id]');
    
    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        // Add shadow on scroll
        if (scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        // Update active section
        updateActiveSection();
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Update active section based on scroll position
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update desktop nav
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.querySelector(`a[href="#${sectionId}"]`)) {
                        item.classList.add('active');
                    }
                });
                
                // Update mobile nav
                mobileNavItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Initial active state
    updateActiveSection();
    
    // Nav item click handlers
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            mobileNavItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/* =====================================================
   STATS COUNTER ANIMATION
   Animates numbers on scroll into view
   ===================================================== */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    if (!statNumbers.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;
    const increment = target / steps;
    
    function updateCounter() {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            setTimeout(updateCounter, stepDuration);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

/* =====================================================
   CONTACT FORM
   Form validation and submission handling
   ===================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
            </svg>
        `;
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success state
        submitBtn.innerHTML = `
            <span>Message Sent!</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #00ffc8 0%, #00d4ff 100%)';
        
        // Reset form
        form.reset();
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
    
    // Add floating label behavior
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });
        }
    });
}

/* =====================================================
   SMOOTH SCROLL
   Enhanced smooth scrolling for anchor links
   ===================================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navHeight = 100; // Account for fixed nav
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =====================================================
   PARALLAX EFFECTS
   Subtle parallax on gradient orbs
   ===================================================== */
function initParallaxEffects() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    if (!orbs.length) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animate() {
        // Smooth interpolation
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 15;
            const x = currentX * speed;
            const y = currentY * speed;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}



/* =====================================================
   TYPING EFFECT (Optional enhancement for hero)
   ===================================================== */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    
    if (!typingElement) return;
    
    const text = typingElement.getAttribute('data-text');
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }
    
    type();
}





/* =====================================================
   MAGNETIC BUTTON EFFECT
   Buttons follow cursor slightly
   ===================================================== */
const magneticButtons = document.querySelectorAll('.btn-primary');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-2px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

/* =====================================================
   PRELOADER
   Premium loading animation
   ===================================================== */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Wait for progress bar animation to complete (2s) plus a small delay
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('loaded');
            document.body.classList.add('page-loaded');
            
            // Remove preloader from DOM after fade out
            setTimeout(() => {
                preloader.remove();
            }, 600);
        }
    }, 2200);
    
    // Trigger page load animations
    document.body.classList.add('loaded');
});

/* =====================================================
   CURSOR GLOW EFFECT (Optional enhancement)
   ===================================================== */
function initCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// Uncomment to enable cursor glow:
// initCursorGlow();

/* =====================================================
   SCROLL PROGRESS INDICATOR (Optional)
   ===================================================== */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const bar = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        bar.style.width = progress + '%';
    });
}

// Uncomment to enable scroll progress:
// initScrollProgress();

/* =====================================================
   3D CARD TILT EFFECTS
   Interactive hover effects for cards
   ===================================================== */
function init3DCardEffects() {
    const cards = document.querySelectorAll('.about-card, .service-card, .ai-card, .project-card, .why-card');
    
    if (!cards.length) return;
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out';
        });
    });
}

console.log('🚀 Devreon Dev website loaded successfully!');
