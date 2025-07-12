// Language Management
let currentLanguage = 'ar';

// Language data
const translations = {
    ar: {
        dir: 'rtl',
        lang: 'ar',
        fontFamily: "'Tajawal', sans-serif"
    },
    en: {
        dir: 'ltr', 
        lang: 'en',
        fontFamily: "'Inter', sans-serif"
    }
};

// Toggle Language Function
function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    
    // Update document attributes
    document.documentElement.setAttribute('lang', translations[currentLanguage].lang);
    document.documentElement.setAttribute('dir', translations[currentLanguage].dir);
    document.body.setAttribute('dir', translations[currentLanguage].dir);
    
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-ar][data-en]');
    elements.forEach(element => {
        const text = currentLanguage === 'ar' ? element.getAttribute('data-ar') : element.getAttribute('data-en');
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update language button text
    const langText = document.getElementById('lang-text');
    if (langText) {
        langText.textContent = currentLanguage === 'ar' ? 'English' : 'العربية';
    }
    
    // Save language preference
    localStorage.setItem('preferred-language', currentLanguage);
    
    // Update page title
    updatePageTitle();
    
    // Force page refresh to apply all changes
    setTimeout(() => {
        location.reload();
    }, 100);
}

// Update page title based on current language
function updatePageTitle() {
    const titles = {
        'index.html': {
            ar: 'كلية ابن سيرين للعلوم الطبية والتقنية',
            en: 'Ibn Sirin College for Medical and Technical Sciences'
        },
        'faculty.html': {
            ar: 'كادر الكلية - كلية ابن سيرين للعلوم الطبية والتقنية',
            en: 'Faculty Staff - Ibn Sirin College for Medical and Technical Sciences'
        },
        'regulations.html': {
            ar: 'لوائح الكلية - كلية ابن سيرين للعلوم الطبية والتقنية',
            en: 'College Regulations - Ibn Sirin College for Medical and Technical Sciences'
        }
    };
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (titles[currentPage]) {
        document.title = titles[currentPage][currentLanguage];
    }
}

// Initialize language on page load
function initializeLanguage() {
    // Get saved language preference or default to Arabic
    const savedLanguage = localStorage.getItem('preferred-language') || 'ar';
    
    if (savedLanguage !== currentLanguage) {
        currentLanguage = savedLanguage;
        toggleLanguage();
    }
    
    updatePageTitle();
}

// Mobile Menu Functions
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileMenu && hamburger) {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileMenu && hamburger) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// FAQ Functions
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Smooth Scrolling for Anchor Links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll Animation Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-menu a, .mobile-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${currentSection}` || 
            (currentSection === 'home' && href === '#home') ||
            (currentSection === '' && href === '#home')) {
            link.classList.add('active');
        }
    });
}

// Form Validation (for future contact forms)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Search Functionality (for future implementation)
function searchContent(query) {
    const searchableElements = document.querySelectorAll('h1, h2, h3, p, .specialty-item span');
    const results = [];
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            results.push({
                element: element,
                text: element.textContent,
                section: element.closest('section')?.id || 'unknown'
            });
        }
    });
    
    return results;
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance Optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            updateActiveNavLink();
        }, 10);
    });
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            // Handle responsive adjustments
            if (window.innerWidth > 1200) {
                closeMobileMenu();
            }
        }, 250);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    initializeLanguage();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Optimize performance
    optimizePerformance();
    
    // Event Listeners
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu
    const closeMenu = document.querySelector('.close-menu');
    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const mobileMenu = document.querySelector('.mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // FAQ toggles
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => toggleFAQ(question));
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            if (target !== '#') {
                smoothScroll(target);
                closeMobileMenu(); // Close mobile menu if open
            }
        });
    });
    
    // Language toggle button
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
    
    // Initial active nav link update
    updateActiveNavLink();
    
    // Add loading animation completion
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Export functions for global access
window.toggleLanguage = toggleLanguage;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.toggleFAQ = toggleFAQ;
window.smoothScroll = smoothScroll;

