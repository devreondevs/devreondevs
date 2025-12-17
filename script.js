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
    initCostEstimator();
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

/* =====================================================
   GEMINI AI API CONFIGURATION
   ===================================================== */
const GEMINI_API_KEY = "AIzaSyBkM4tfR5Z8QPbcU1pVVIFU0MRfTnOBdLg";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/* =====================================================
   AI PROJECT COST ESTIMATOR
   Interactive multi-step form with Gemini AI pricing analysis
   ===================================================== */
function initCostEstimator() {
    const form = document.getElementById('costEstimatorForm');
    if (!form) return;
    
    const steps = form.querySelectorAll('.estimator-step');
    const prevBtn = form.querySelector('.est-prev');
    const nextBtn = form.querySelector('.est-next');
    const stepDots = form.querySelectorAll('.step-dot');
    const resultPanel = document.getElementById('estimateResult');
    
    let currentStep = 1;
    const totalSteps = steps.length;
    
    // Update step display
    function showStep(stepNum) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === stepNum);
        });
        
        stepDots.forEach((dot, index) => {
            dot.classList.toggle('active', index < stepNum);
        });
        
        prevBtn.disabled = stepNum === 1;
        nextBtn.textContent = stepNum === totalSteps ? '🤖 Get AI Estimate' : 'Next';
        
        currentStep = stepNum;
    }
    
    // Navigation handlers
    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            showStep(currentStep + 1);
        } else {
            calculateEstimate();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    });
    
    // Calculate estimate with Gemini AI
    async function calculateEstimate() {
        let baseCost = 0;
        let featuresCost = 0;
        let multiplier = 1;
        let projectTypeName = 'Not selected';
        let selectedFeatures = [];
        let timelineName = 'Standard';
        
        // Get project type
        const projectType = form.querySelector('input[name="projectType"]:checked');
        if (projectType) {
            baseCost = parseInt(projectType.dataset.cost) || 0;
            projectTypeName = projectType.nextElementSibling.querySelector('.option-label').textContent;
        }
        
        // Get features
        const features = form.querySelectorAll('input[name="features"]:checked');
        features.forEach(feature => {
            featuresCost += parseInt(feature.dataset.cost) || 0;
            const label = feature.parentElement.querySelector('span:last-child');
            if (label) selectedFeatures.push(label.textContent);
        });
        
        // Get timeline
        const timeline = form.querySelector('input[name="timeline"]:checked');
        if (timeline) {
            multiplier = parseFloat(timeline.dataset.multiplier) || 1;
            timelineName = timeline.nextElementSibling.querySelector('.timeline-label').textContent;
        }
        
        // Calculate total
        const subtotal = baseCost + featuresCost;
        const total = Math.round(subtotal * multiplier);
        const totalMax = Math.round(total * 1.2);
        
        // Update display with animation
        animateNumber('estimatedCost', total);
        animateNumber('estimatedCostMax', totalMax);
        document.getElementById('baseCost').textContent = '₹' + baseCost.toLocaleString();
        document.getElementById('featuresCost').textContent = '₹' + featuresCost.toLocaleString();
        
        // Timeline adjustment percentage
        let adjustText = '0%';
        if (multiplier > 1) adjustText = '+' + Math.round((multiplier - 1) * 100) + '%';
        else if (multiplier < 1) adjustText = '-' + Math.round((1 - multiplier) * 100) + '%';
        document.getElementById('timelineAdjust').textContent = adjustText;
        
        // Show result panel
        resultPanel.classList.add('calculated');
        
        // Get AI reasoning
        await getAIReasoning(projectTypeName, selectedFeatures, timelineName, baseCost, featuresCost, total, totalMax);
    }
    
    // Get AI-powered pricing reasoning from Gemini
    async function getAIReasoning(projectType, features, timeline, baseCost, featuresCost, total, totalMax) {
        const aiReasoningEl = document.getElementById('aiReasoning');
        if (!aiReasoningEl) return;
        
        // Show loading state
        aiReasoningEl.innerHTML = `
            <div class="ai-loading">
                <div class="ai-loading-icon">🤖</div>
                <span>AI is analyzing your requirements...</span>
            </div>
        `;
        aiReasoningEl.style.display = 'block';
        
        const prompt = `You are a professional software development cost analyst for Devreon Devs, a premium web development company in India.

A client has requested a project estimate with the following specifications:

📋 PROJECT TYPE: ${projectType}
💡 FEATURES REQUESTED: ${features.length > 0 ? features.join(', ') : 'None selected'}
⏱️ TIMELINE: ${timeline}

💰 COST BREAKDOWN:
- Base Project Cost: ₹${baseCost.toLocaleString()}
- Additional Features: ₹${featuresCost.toLocaleString()}
- Total Estimate: ₹${total.toLocaleString()} - ₹${totalMax.toLocaleString()}

Please provide a brief, professional explanation (3-4 bullet points max) of why this project costs what it does. Consider:
1. Complexity of the project type
2. Development effort for each feature
3. Timeline impact on pricing
4. Market rates in India for similar projects

Format your response with emoji bullets (use ✅ or 💡 or 📌) and keep it concise and client-friendly. No markdown headers, just bullet points. Keep total response under 150 words.`;

        try {
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 300,
                    }
                })
            });
            
            if (!response.ok) {
                throw new Error('API request failed');
            }
            
            const data = await response.json();
            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate analysis.';
            
            // Format and display AI response
            aiReasoningEl.innerHTML = `
                <div class="ai-response">
                    <div class="ai-response-header">
                        <span class="ai-icon">🤖</span>
                        <span class="ai-title">AI Pricing Analysis</span>
                    </div>
                    <div class="ai-response-content">
                        ${formatAIResponse(aiText)}
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Gemini API Error:', error);
            // Provide fallback reasoning
            aiReasoningEl.innerHTML = `
                <div class="ai-response">
                    <div class="ai-response-header">
                        <span class="ai-icon">💡</span>
                        <span class="ai-title">Pricing Breakdown</span>
                    </div>
                    <div class="ai-response-content">
                        <p>✅ <strong>${projectType}</strong> projects require specialized expertise in UI/UX design, backend architecture, and security implementation.</p>
                        <p>📌 ${features.length > 0 ? `Selected features (${features.join(', ')}) add significant value and development hours.` : 'No additional features selected - base package pricing applies.'}</p>
                        <p>⏱️ ${timeline} timeline ${timeline === 'Urgent' ? 'requires additional resources and priority allocation.' : timeline === 'Flexible' ? 'allows for optimized resource planning and cost savings.' : 'follows our standard development workflow.'}</p>
                        <p>💰 This estimate is competitive with Indian market rates for quality development.</p>
                    </div>
                </div>
            `;
        }
    }
    
    // Format AI response text
    function formatAIResponse(text) {
        // Split by newlines and filter empty lines
        const lines = text.split('\n').filter(line => line.trim());
        return lines.map(line => `<p>${line}</p>`).join('');
    }
    
    // Animate number counting
    function animateNumber(elementId, target) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const duration = 1000;
        const steps = 30;
        const stepDuration = duration / steps;
        let current = 0;
        const increment = target / steps;
        
        function update() {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                setTimeout(update, stepDuration);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        update();
    }
    
    // Auto-calculate on selection change (only update numbers, not AI)
    form.addEventListener('change', () => {
        // Only recalculate if we're on the last step and already calculated
        if (currentStep === totalSteps && resultPanel.classList.contains('calculated')) {
            // Just update the numbers, don't call AI again
            let baseCost = 0;
            let featuresCost = 0;
            let multiplier = 1;
            
            const projectType = form.querySelector('input[name="projectType"]:checked');
            if (projectType) baseCost = parseInt(projectType.dataset.cost) || 0;
            
            const features = form.querySelectorAll('input[name="features"]:checked');
            features.forEach(feature => {
                featuresCost += parseInt(feature.dataset.cost) || 0;
            });
            
            const timeline = form.querySelector('input[name="timeline"]:checked');
            if (timeline) multiplier = parseFloat(timeline.dataset.multiplier) || 1;
            
            const subtotal = baseCost + featuresCost;
            const total = Math.round(subtotal * multiplier);
            const totalMax = Math.round(total * 1.2);
            
            animateNumber('estimatedCost', total);
            animateNumber('estimatedCostMax', totalMax);
            document.getElementById('baseCost').textContent = '₹' + baseCost.toLocaleString();
            document.getElementById('featuresCost').textContent = '₹' + featuresCost.toLocaleString();
            
            let adjustText = '0%';
            if (multiplier > 1) adjustText = '+' + Math.round((multiplier - 1) * 100) + '%';
            else if (multiplier < 1) adjustText = '-' + Math.round((1 - multiplier) * 100) + '%';
            document.getElementById('timelineAdjust').textContent = adjustText;
        }
    });
    
    // Initialize
    showStep(1);
}

console.log('🚀 Devreon Dev website loaded successfully!');

