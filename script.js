// Global variables
let isDragging = false;
let currentDragElement = null;
let offset = { x: 0, y: 0 };

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupNavigation();
    setupTypingAnimation();
    setupScrollAnimations();
    setupFloatingElements();
    setupParticles();
    setupSkillBars();
    setupProjectFilters();
    setupContactForm();
    setupStatsCounter();
    setupMobileMenu();
    setupOfferings();
}

// Navigation Setup
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active navigation link
        updateActiveNavLink();
    });
}

// Update active navigation link based on current section
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Setup
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Typing Animation Setup
function setupTypingAnimation() {
    const texts = [
        'Full Stack Developer',
        'Web Developer',
        'Backend Engineer',
        'React Developer',
        'SQL Developer',
        'JavaScript Lover',
        'Problem Solver',
        'Tech Enthusiast',
        'Open Source Contributor',
        'Software Engineer',

    ];

    const typedTextElement = document.getElementById('typed-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 100 : 150;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }

    typeText();
}

// Scroll Animations Setup
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
        '.about-text, .about-image, .skill-category, .project-card, .cert-card, .contact-item, .contact-form'
    );

    animatedElements.forEach((element, index) => {
        if (element.classList.contains('about-text') || element.classList.contains('contact-form')) {
            element.classList.add('slide-in-left');
        } else if (element.classList.contains('about-image') || element.classList.contains('contact-item')) {
            element.classList.add('slide-in-right');
        } else {
            element.classList.add('fade-in');
            element.style.transitionDelay = `${index * 0.1}s`;
        }

        observer.observe(element);
    });
}

// Floating Elements Setup (Draggable)
function setupFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');

    floatingElements.forEach(element => {
        // Mouse events
        element.addEventListener('mousedown', startDrag);

        // Touch events for mobile
        element.addEventListener('touchstart', startDrag, { passive: false });

        // Add hover effect
        element.addEventListener('mouseenter', function () {
            this.style.transform += ' scale(1.1)';
        });

        element.addEventListener('mouseleave', function () {
            if (!isDragging) {
                this.style.transform = this.style.transform.replace(' scale(1.1)', '');
            }
        });
    });

    // Global mouse/touch move and up events
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', stopDrag);
}

function startDrag(e) {
    isDragging = true;
    currentDragElement = e.target;

    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

    const rect = currentDragElement.getBoundingClientRect();
    offset.x = clientX - rect.left;
    offset.y = clientY - rect.top;

    currentDragElement.style.cursor = 'grabbing';
    currentDragElement.style.zIndex = '1000';

    e.preventDefault();
}

function drag(e) {
    if (!isDragging || !currentDragElement) return;

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    const newX = clientX - offset.x;
    const newY = clientY - offset.y;

    // Keep element within window bounds
    const maxX = window.innerWidth - currentDragElement.offsetWidth;
    const maxY = window.innerHeight - currentDragElement.offsetHeight;

    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));

    currentDragElement.style.left = constrainedX + 'px';
    currentDragElement.style.top = constrainedY + 'px';
    currentDragElement.style.right = 'auto';
    currentDragElement.style.bottom = 'auto';

    e.preventDefault();
}

function stopDrag() {
    if (isDragging && currentDragElement) {
        currentDragElement.style.cursor = 'move';
        currentDragElement.style.zIndex = '-1';
        currentDragElement.style.transform = currentDragElement.style.transform.replace(' scale(1.1)', '');
    }

    isDragging = false;
    currentDragElement = null;
}

// Particles Background Setup
function setupParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }

    // Create new particles periodically
    setInterval(() => {
        if (particlesContainer.children.length < particleCount) {
            createParticle(particlesContainer);
        }
    }, 3000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random starting position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 20000);
}

// Skill Bars Animation
function setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width + '%';
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Project Filters Setup
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.display = 'block';
                    }, 10);
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form Setup
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            submitForm(form, submitBtn);
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + 'Error');

    let isValid = true;
    let errorMessage = '';

    // Check if field is empty
    if (value === '') {
        isValid = false;
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    } else {
        // Specific validation rules
        switch (fieldName) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }
    }

    // Update UI
    if (isValid) {
        field.classList.remove('error');
        errorElement.textContent = '';
    } else {
        field.classList.add('error');
        errorElement.textContent = errorMessage;
    }

    return isValid;
}

function submitForm(form, submitBtn) {
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        // Hide loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Show success message
        alert('Thank you for your message! I\'ll get back to you soon.');

        // Reset form
        form.reset();
    }, 2000);
}

// Stats Counter Animation
function setupStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Modal Functions
function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');

    // Project data
    const projectData = {
        project1: {
            title: 'E-commerce Platform',
            image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'A full-featured e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT', 'Express'],
            features: [
                'User authentication and authorization',
                'Product catalog with search and filters',
                'Shopping cart and wishlist functionality',
                'Secure payment processing with Stripe',
                'Order tracking and history',
                'Admin dashboard for inventory management'
            ],
            github: '#',
            live: '#'
        },
        project2: {
            title: 'Task Management App',
            image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'A collaborative task management application with real-time updates. Built with React, Socket.io, and Express for seamless team collaboration.',
            technologies: ['React', 'Socket.io', 'Express', 'MongoDB', 'JWT'],
            features: [
                'Real-time task updates',
                'Team collaboration tools',
                'Project organization',
                'Due date reminders',
                'File attachments',
                'Activity tracking'
            ],
            github: '#',
            live: '#'
        },
        project3: {
            title: 'React Native Social App',
            image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'A cross-platform social media application built with React Native, featuring real-time messaging, photo sharing, and social interactions.',
            technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
            features: [
                'User profiles and authentication',
                'Photo and video sharing',
                'Real-time messaging',
                'Social interactions (likes, comments)',
                'Push notifications',
                'Offline support'
            ],
            github: '#',
            live: '#'
        },
        project4: {
            title: 'REST API Server',
            image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'A scalable REST API server built with Node.js and Express, featuring JWT authentication, rate limiting, and comprehensive documentation.',
            technologies: ['Node.js', 'Express', 'JWT', 'MongoDB', 'Swagger'],
            features: [
                'RESTful API design',
                'JWT authentication',
                'Rate limiting and security',
                'Input validation',
                'Comprehensive documentation',
                'Error handling and logging'
            ],
            github: '#',
            live: '#'
        }
    };

    const project = projectData[projectId];
    if (!project) return;

    modalBody.innerHTML = `
        <div class="modal-project">
            <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
            <h2 style="margin-bottom: 1rem; color: var(--text-dark);">${project.title}</h2>
            <p style="margin-bottom: 1.5rem; line-height: 1.6; color: var(--text-light);">${project.description}</p>
            
            <h3 style="margin-bottom: 0.5rem; color: var(--text-dark);">Technologies Used:</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            
            <h3 style="margin-bottom: 0.5rem; color: var(--text-dark);">Key Features:</h3>
            <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem; color: var(--text-light);">
                ${project.features.map(feature => `<li style="margin-bottom: 0.25rem;">${feature}</li>`).join('')}
            </ul>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <a href="${project.github}" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                    <i class="fab fa-github"></i> View Code
                </a>
                <a href="${project.live}" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Bio Toggle Function
function toggleBio() {
    const bioToggle = document.getElementById('bioToggle');
    if (bioToggle.style.display === 'none' || bioToggle.style.display === '') {
        bioToggle.style.display = 'block';
    } else {
        bioToggle.style.display = 'none';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function (e) {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Smooth scroll for all internal links
document.addEventListener('click', function (e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', function () {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(function () {
        // Additional scroll-based animations can go here
    }, 10);
});

// Initialize theme toggle (optional enhancement)
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
}

// Add resize handler for responsive floating elements
window.addEventListener('resize', function () {
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(element => {
        // Reset position if element is outside viewport after resize
        const rect = element.getBoundingClientRect();
        if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
            element.style.left = '';
            element.style.top = '';
            element.style.right = '';
            element.style.bottom = '';
        }
    });
});

// Offerings Setup
function setupOfferings() {
    const headers = document.querySelectorAll('.category-header');

    headers.forEach(header => {
        header.addEventListener('click', function () {
            const details = this.nextElementSibling;
            details.classList.toggle('expanded');
        });
    });
}
