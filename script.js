// ===== COMPLETE FUNCTIONAL PORTFOLIO JAVASCRIPT =====

// Global Variables
let isDarkMode = false;
let typingSpeed = 50;
let currentTypingIndex = 0;

// Typing texts for the hero section
const typingTexts = [
    'Full Stack Developer',
    'Web Developer',
    'Backend Specialist',
    'Problem Solver',
    'Tech Enthusiast'
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
console.log('✅ Portfolio loaded successfully');
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupMobileMenu();
    setupSmoothScrolling();
    setupTypingAnimation();
    setupScrollAnimations();
    setupProjectFilters();
    setupStatsCounter();
    setupContactForm();
    // setupServiceModal(); // Commented out to use the new inquiry form
    setupBioToggle();
    setupNavbarScroll();
}

// Global function for onclick
function openServiceModal(service) {
    const modal = document.getElementById('serviceModal');
    if (!modal) return;
    
    const serviceDefaults = {
        'Web Development': {
            projectType: 'web-app',
            title: 'Business Website / Web Application',
            stack: 'HTML, CSS, JavaScript / React, Node.js',
            description: 'Need a professional web solution with responsive UI, clean design, and required business functionality.'
        },
        'Mobile Apps': {
            projectType: 'mobile-app',
            title: 'Mobile Application Development',
            stack: 'React Native / Flutter',
            description: 'Need a mobile application with user-friendly design, smooth performance, and essential app features.'
        },
        'Backend APIs': {
            projectType: 'api-backend',
            title: 'Backend API Development',
            stack: 'Node.js, Express / Python, Flask',
            description: 'Need secure and scalable backend APIs with database integration, authentication, and clean architecture.'
        },
        'Full Stack': {
            projectType: 'full-stack',
            title: 'Full Stack Project Development',
            stack: 'MERN / Python Full Stack',
            description: 'Need a complete frontend, backend, and database solution for an end-to-end application.'
        },
        'Database': {
            projectType: 'other',
            title: 'Database Design / Optimization',
            stack: 'MySQL / MongoDB / PostgreSQL',
            description: 'Need database design, schema planning, query optimization, and data handling support.'
        },
        'Deployment': {
            projectType: 'other',
            title: 'Deployment & Cloud Setup',
            stack: 'Docker, AWS / Azure / Vercel',
            description: 'Need deployment support, hosting setup, and production-ready configuration for the project.'
        }
    };
    
    const title = document.getElementById('serviceModalTitle');
    const subtitle = document.getElementById('serviceModalSubtitle');
    const typeInput = document.getElementById('serviceType');
    const projectType = document.getElementById('projectType');
    const projectTitle = document.getElementById('serviceProjectTitle');
    const projectStack = document.getElementById('serviceTechStack');
    const projectDescription = document.getElementById('serviceProjectDescription');
    const defaults = serviceDefaults[service];
    
    if (title) title.textContent = service;
    if (subtitle) subtitle.textContent = `Let's discuss your ${service} project`;
    if (typeInput) typeInput.value = service;

    if (defaults) {
        if (projectType) projectType.value = defaults.projectType;
        if (projectTitle) projectTitle.value = defaults.title;
        if (projectStack) projectStack.value = defaults.stack;
        if (projectDescription) projectDescription.value = defaults.description;
    }
    
    modal.style.display = 'flex';
    modal.style.visibility = 'visible';
    modal.style.zIndex = '2000';
}

function showFreelanceInquiry() {
    const inquirySection = document.getElementById('freelance-inquiry');
    if (inquirySection) {
        inquirySection.style.display = 'block';
        inquirySection.scrollIntoView({ behavior: 'smooth' });
        console.log('Freelance inquiry section shown');
    } else {
        console.log('Freelance inquiry section not found');
    }
}

function hideFreelanceInquiry() {
    const inquirySection = document.getElementById('freelance-inquiry');
    if (inquirySection) {
        inquirySection.style.display = 'none';
        console.log('Freelance inquiry section hidden');
    }
}

// ===== NAVBAR & NAVIGATION =====
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Active link highlighting on scroll
    window.addEventListener('scroll', () => {
        updateActiveLink();
    });
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
}

function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollTop = window.pageYOffset;
    });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#serviceModal') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===== TYPING ANIMATION =====
function setupTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = typingTexts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            setTimeout(type, 500);
            return;
        }
        
        setTimeout(type, isDeleting ? 25 : 50);
    }
    
    type();
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const elements = document.querySelectorAll('.project-card, .cert-card, .experience-item, .skill-item, .education-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ===== STATS COUNTER ANIMATION =====
function setupStatsCounter() {
    const statElements = document.querySelectorAll('.anim-count');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statElements.forEach(el => observer.observe(el));
}

function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== PROJECT FILTERING =====
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else if (card.dataset.category.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// ===== CONTACT FORM =====
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const subject = document.getElementById('subject')?.value;
        const message = document.getElementById('message')?.value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showAlert('Please fill all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-loader"></span>';
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate sending with delay
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.display = 'none';
            const successMessage = document.getElementById('contactSuccessMessage');
            document.getElementById('confirmEmail').textContent = email;
            successMessage.style.display = 'block';
            successMessage.classList.add('show-success');
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Reset form for next use (optional)
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ===== SERVICE/FREELANCE MODAL =====
function setupServiceModal() {
    const modal = document.getElementById('serviceModal');
    const serviceHireBtns = document.querySelectorAll('.service-hire-btn');
    const closeBtn = document.getElementById('closeServiceModal');
    const serviceForm = document.getElementById('serviceForm');
    
    // Debug logging
    console.log('🔧 Service Modal Setup:');
    console.log('   Modal element:', modal ? '✓ Found' : '✗ NOT FOUND');
    console.log('   Hire buttons found:', serviceHireBtns.length);
    console.log('   Close button:', closeBtn ? '✓ Found' : '✗ NOT FOUND');
    console.log('   Service form:', serviceForm ? '✓ Found' : '✗ NOT FOUND');
    
    if (!modal) {
        console.error('❌ Service modal not found! Modal functionality disabled.');
        return;
    }
    
    const serviceDefaults = {
        'Web Development': {
            projectType: 'web-app',
            title: 'Business Website / Web Application',
            stack: 'HTML, CSS, JavaScript / React, Node.js',
            description: 'Need a professional web solution with responsive UI, clean design, and required business functionality.'
        },
        'Mobile Apps': {
            projectType: 'mobile-app',
            title: 'Mobile Application Development',
            stack: 'React Native / Flutter',
            description: 'Need a mobile application with user-friendly design, smooth performance, and essential app features.'
        },
        'Backend APIs': {
            projectType: 'api-backend',
            title: 'Backend API Development',
            stack: 'Node.js, Express / Python, Flask',
            description: 'Need secure and scalable backend APIs with database integration, authentication, and clean architecture.'
        },
        'Full Stack': {
            projectType: 'full-stack',
            title: 'Full Stack Project Development',
            stack: 'MERN / Python Full Stack',
            description: 'Need a complete frontend, backend, and database solution for an end-to-end application.'
        },
        'Database': {
            projectType: 'other',
            title: 'Database Design / Optimization',
            stack: 'MySQL / MongoDB / PostgreSQL',
            description: 'Need database design, schema planning, query optimization, and data handling support.'
        },
        'Deployment': {
            projectType: 'other',
            title: 'Deployment & Cloud Setup',
            stack: 'Docker, AWS / Azure / Vercel',
            description: 'Need deployment support, hosting setup, and production-ready configuration for the project.'
        }
    };

    // Open modal - with improved event handling
    serviceHireBtns.forEach((btn, index) => {
        console.log(`   Button ${index + 1}: ${btn.dataset.service}`);
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log(`✅ Clicked: ${btn.dataset.service}`);
            
            const service = btn.dataset.service;
            const title = document.getElementById('serviceModalTitle');
            const subtitle = document.getElementById('serviceModalSubtitle');
            const typeInput = document.getElementById('serviceType');
            const projectType = document.getElementById('projectType');
            const projectTitle = document.getElementById('serviceProjectTitle');
            const projectStack = document.getElementById('serviceTechStack');
            const projectDescription = document.getElementById('serviceProjectDescription');
            const defaults = serviceDefaults[service];
            
            if (title) title.textContent = service;
            if (subtitle) subtitle.textContent = `Let's discuss your ${service} project`;
            if (typeInput) typeInput.value = service;

            if (defaults) {
                if (projectType) projectType.value = defaults.projectType;
                if (projectTitle) projectTitle.value = defaults.title;
                if (projectStack) projectStack.value = defaults.stack;
                if (projectDescription) projectDescription.value = defaults.description;
            }
            
            // Show modal
            modal.style.display = 'flex';
            modal.style.visibility = 'visible';
            modal.style.zIndex = '2000';
            console.log('✅ Modal displayed');
        });
    });
    
    // Close modal - improved handlers
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            modal.style.display = 'none';
            console.log('✅ Modal closed via close button');
        });
    }
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            e.preventDefault();
            e.stopPropagation();
            modal.style.display = 'none';
            console.log('✅ Modal closed via background click');
        }
    });
    
    // Form submission with logging
    if (serviceForm) {
        serviceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('📝 Service form submitted');

            // Collect form data
            const formData = new FormData(serviceForm);
            const inquiryData = {
                serviceType: formData.get('serviceType'),
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                projectType: formData.get('projectType'),
                title: formData.get('title'),
                stack: formData.get('stack'),
                description: formData.get('description'),
                duration: formData.get('duration'),
                budget: formData.get('budget'),
                priority: formData.get('priority'),
                deadline: formData.get('deadline'),
                requirements: formData.get('requirements'),
                additionalNotes: formData.get('additionalNotes'),
                files: formData.getAll('files')
            };

            // Validate required fields
            const requiredFields = ['name', 'email', 'projectType', 'title', 'stack', 'description', 'duration', 'budget', 'priority'];
            const missingFields = requiredFields.filter(field => !inquiryData[field]);

            if (missingFields.length > 0) {
                console.warn('⚠️ Missing fields:', missingFields);
                showAlert(`Please fill in all required fields: ${missingFields.join(', ')}`, 'error');
                return;
            }

            // Show loading state
            const submitBtn = serviceForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="btn-text">Submitting...</span><span class="btn-loader"></span>';
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate submission
            setTimeout(() => {
                // Log the inquiry data (in a real application, this would be sent to a server)
                console.log('✅ Service Inquiry Submitted:', inquiryData);

                // Show success message
                showAlert(`Thank you ${inquiryData.name}! Your ${inquiryData.serviceType} inquiry for "${inquiryData.title}" has been captured successfully. I will review your project details and contact you within 24 hours at ${inquiryData.email}.`, 'success');

                // Reset form and close modal
                serviceForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                modal.style.display = 'none';
                console.log('✅ Modal closed after submission');
            }, 1500);
        });
    }
}

// ===== BIO TOGGLE =====
function setupBioToggle() {
    const bioToggle = document.getElementById('bioToggle');
    const moreInfoBtn = document.querySelector('[onclick="toggleBio()"]');
    
    if (moreInfoBtn) {
        moreInfoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (bioToggle) {
                bioToggle.style.display = bioToggle.style.display === 'none' ? 'block' : 'none';
                this.textContent = bioToggle.style.display === 'none' ? 'More Info ▼' : 'More Info ▲';
            }
        });
    }
}

// Global function for toggleBio (for onclick support)
function toggleBio() {
    const bioToggle = document.getElementById('bioToggle');
    if (bioToggle) {
        bioToggle.style.display = bioToggle.style.display === 'none' ? 'block' : 'none';
    }
}

// ===== PROJECT MODAL =====
function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const projectData = getProjectData(projectId);
    
    if (!projectData) return;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h2>${projectData.title}</h2>
        <p>${projectData.description}</p>
        <p><strong>Technologies:</strong> ${projectData.technologies}</p>
        <p><strong>Features:</strong></p>
        <ul>
            ${projectData.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <div style="margin-top: 20px;">
            <a href="${projectData.github}" target="_blank" class="btn btn-primary" style="margin-right: 10px;">
                <i class="fab fa-github"></i> View Code
            </a>
            <a href="${projectData.live}" target="_blank" class="btn btn-secondary">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
}

function getProjectData(projectId) {
    const projects = {
        project1: {
            title: 'E-commerce Platform',
            description: 'Full-stack e-commerce solution with modern technologies. A complete marketplace for buying and selling products online.',
            technologies: 'React, Node.js, Express.js, MongoDB, Stripe',
            features: [
                'User authentication & authorization',
                'Product catalog with filtering',
                'Shopping cart & checkout',
                'Payment integration',
                'Order management',
                'Admin dashboard'
            ],
            github: 'https://github.com/khanisherigidindla',
            live: '#'
        },
        project2: {
            title: 'AI Powered Chatbot',
            description: 'Intelligent chatbot using advanced NLP capabilities. Provides smart responses and helps with customer service.',
            technologies: 'Python, Flask, TensorFlow, NLP',
            features: [
                'Natural language processing',
                'Machine learning model training',
                'Real-time conversation',
                'Intent recognition',
                'Entity extraction',
                'Multi-language support'
            ],
            github: 'https://github.com/khanisherigidindla/InterviewcoachAI-Project',
            live: '#'
        },
        project3: {
            title: 'Quiz Management System',
            description: 'Comprehensive quiz platform for creating and managing online quizzes with real-time results.',
            technologies: 'Python, SQL, Flask, MySQL',
            features: [
                'Quiz creation interface',
                'Multiple question types',
                'Real-time scoring',
                'User progress tracking',
                'Detailed analytics',
                'Certificate generation'
            ],
            github: 'https://github.com/khanisherigidindla/Quiz_Management_System',
            live: '#'
        },
        project4: {
            title: 'Task Management System',
            description: 'Full-stack task management application with collaboration features.',
            technologies: 'React, Node.js, MongoDB, Express.js',
            features: [
                'Task creation & organization',
                'Team collaboration',
                'Real-time updates',
                'Deadline management',
                'Progress tracking',
                'Notification system'
            ],
            github: 'https://github.com/khanisherigidindla',
            live: '#'
        },
        project5: {
            title: 'Student Management System',
            description: 'Comprehensive system for managing student information and academic records.',
            technologies: 'Python, Flask, MySQL, HTML, CSS, JS',
            features: [
                'Student profile management',
                'Grade tracking',
                'Attendance management',
                'Report generation',
                'Parent portal',
                'Admin dashboard'
            ],
            github: 'https://github.com/khanisherigidindla',
            live: '#'
        },
        project6: {
            title: 'TO_DO List',
            description: 'Modern responsive todo application with drag & drop functionality.',
            technologies: 'HTML, CSS, JavaScript, React',
            features: [
                'Task creation & deletion',
                'Priority levels',
                'Drag & drop organization',
                'Local storage persistence',
                'Search functionality',
                'Dark mode support'
            ],
            github: 'https://github.com/khanisherigidindla',
            live: '#'
        },
        project7: {
            title: 'Online Grocery Store',
            description: 'Complete MERN stack grocery e-commerce platform with inventory management.',
            technologies: 'MongoDB, Express.js, React, Node.js',
            features: [
                'Product catalog',
                'Shopping cart',
                'Order management',
                'Inventory tracking',
                'Payment processing',
                'Delivery tracking'
            ],
            github: 'https://github.com/khanisherigidindla/grocery-store',
            live: '#'
        },
        project8: {
            title: 'Student Management System 2',
            description: 'Advanced student management system with comprehensive features.',
            technologies: 'Python, Flask, MySQL',
            features: [
                'Advanced student profiles',
                'Grade analytics',
                'Automated reports',
                'Parent dashboard',
                'Multi-admin support',
                'Data export'
            ],
            github: 'https://github.com/khanisherigidindla/Student_Management_System',
            
        },
        project9: {
            title: 'QR Code Generator',
            description: 'Full-featured QR code generation API service.',
            technologies: 'Node.js, Express, MongoDB',
            features: [
                'Dynamic QR generation',
                'Database storage',
                'Custom QR designs',
                'Analytics tracking',
                'API endpoints',
                'Download options'
            ],
            github: 'https://github.com/khanisherigidindla/QRCode-generator',
            live: '#'
        }
    };
    
    return projects[projectId];

}

// Close modal on background click
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// ===== UTILITY FUNCTIONS =====
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 5000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// ===== SCROLL TO TOP BUTTON =====
window.addEventListener('scroll', () => {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    }
});

// ===== EXPERIENCE DETAIL MODAL =====
function openExperienceModal(experienceId) {
    const modal = document.getElementById('experienceModal');
    const modalBody = document.getElementById('experienceModalBody');

    const experienceData = {
'software-trainee': {
            title: 'Software Trainee',
            company: 'Koundinyasa Technology',
            duration: 'Feb 9, 2026 – Present',
            focus: 'Backend Developer • Database Design • API Systems',
            responsibilities: [
                {

                    title: 'Backend Developer (Node.js + Express + MongoDb)',
                    details: 'Built APIs using Node.js and Express. Added validation and middleware for secure backend.'

                },
                {
                    title: 'Authentication & Authorization',
                    details: 'Developed secure authentication flows: JWT token generation and validation, Role-based access control (RBAC). Implemented: Login / Signup systems, Password hashing (bcrypt), Token expiration and refresh strategies.'
                },
                {
                    title: 'Payment & Transaction Systems (High-Value Experience)',
                    details: 'Worked on wallet-to-wallet transaction systems. Integrated payment gateway flows, Hash generation for request validation, Payment request submission, Callback/response verification. Designed: Transaction logging system, Idempotency handling (to prevent duplicate transactions), Failure recovery flows.'
                },
                {
                    title: 'Database Design & Optimization (MongoDB)',
                    details: 'Designed normalized + scalable schema structures: Users, Wallets, Transactions, KYC data. Implemented: Indexing strategies for performance optimization, Aggregation pipelines for reporting (e.g., transaction summaries). Worked on: Pagination (skip/limit pattern), Filtering and sorting APIs.'
                },
                {
                    title: 'Admin Panel Backend Support',
                    details: 'Built APIs for: User management (CRUD), KYC approval/rejection, Wallet freeze/unfreeze, Transaction monitoring. Implemented audit logging for admin actions.'
                },
                {
                    title: 'Security & Best Practices',
                    details: 'Prevented: SQL/NoSQL injection, unauthorized access. Applied: Environment variable management, Secure API design principles. Structured code for maintainability and scalability.'
                }
            ]
        },

        'mern-internship': {
            title: 'MERN Stack Internship',
            company: 'Brain-O-Vision',
            duration: 'Dec 23, 2024 – Apr 12, 2025',
            focus: 'Full-Stack Development • API Integration • UI + Backend Coordination',
            responsibilities: [
                {
                    title: 'Full-Stack Application Development',
                    details: 'Built end-to-end applications using: MongoDB (Database), Express.js (Backend), React.js (Frontend), Node.js (Runtime). Developed reusable components in React: Forms, Dashboards, Data tables.'
                },
                {
                    title: 'API Development & Integration',
                    details: 'Created REST APIs and integrated them with frontend. Managed: Axios/fetch API calls, Error handling on UI. Implemented: Loading states, API response handling patterns.'
                },
                {
                    title: 'State Management',
                    details: 'Used: React hooks (useState, useEffect). Managed: Form state, Authentication state, API-driven UI updates.'
                },
                {
                    title: 'CRUD Operations (Core Industry Skill)',
                    details: 'Built full CRUD flows: Create → Insert data into DB, Read → Fetch & display data, Update → Modify records, Delete → Remove safely. Ensured: Data validation both frontend & backend.'
                },
                {
                    title: 'Authentication Flow (Frontend + Backend)',
                    details: 'Implemented: Login/Register UI, Token storage (localStorage/sessionStorage), Protected routes in React.'
                },
                {
                    title: 'UI/UX Implementation',
                    details: 'Built responsive layouts. Focused on: Clean UI structure, Component reusability, Form usability.'
                }
            ]
        },
        'web-development-intern': {
            title: 'Web Development Intern',
            company: 'Codsoft',
            duration: 'Aug 25, 2024 – Sep 25, 2024',
            focus: 'Frontend Fundamentals • Static + Dynamic Web Development',
            responsibilities: [
                {
                    title: 'Frontend Development',
                    details: 'Built websites using: HTML5, CSS3, JavaScript. Focused on: Semantic HTML, Responsive design (Flexbox/Grid).'
                },
                {
                    title: 'JavaScript Functionality',
                    details: 'Implemented: Form validation, DOM manipulation, Event handling. Built interactive UI components.'
                },
                {
                    title: 'Project-Based Learning',
                    details: 'Delivered mini-projects such as: Portfolio website, Landing pages, Interactive forms. Practiced: Code structuring, File organization.'
                },
                {
                    title: 'Version Control Basics',
                    details: 'Used Git for: Code tracking, Version management.'
                }
            ]
        }
    };

    const data = experienceData[experienceId];
    if (!data) return;

    modalBody.innerHTML = `
        <div class="experience-modal-header">
            <h2>${data.title}</h2>
            <div class="experience-modal-meta">
                <span class="company">${data.company}</span>
                <span class="duration">${data.duration}</span>
            </div>
            <div class="experience-focus">
                <strong>Core Role Focus:</strong> ${data.focus}
            </div>
        </div>
        <div class="experience-modal-content">
            ${data.responsibilities.map(resp => `
                <div class="experience-section">
                    <h3>${resp.title}</h3>
                    <p>${resp.details}</p>
                </div>
            `).join('')}
        </div>
    `;

    modal.classList.add('active');
}

function closeExperienceModal() {
    const modal = document.getElementById('experienceModal');
    modal.classList.remove('active');
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Close modal on ESC
    if (e.key === 'Escape') {
        const modal = document.getElementById('projectModal');
        const serviceModal = document.getElementById('serviceModal');
        const experienceModal = document.getElementById('experienceModal');
        if (modal) modal.classList.remove('active');
        if (serviceModal) serviceModal.style.display = 'none';
        if (experienceModal) experienceModal.classList.remove('active');
    }
});

console.log('✅ All JavaScript functionality initialized successfully!');
