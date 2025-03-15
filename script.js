// Mobile menu functionality
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

mobileMenu.addEventListener('click', toggleMenu);

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            toggleMenu();
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !e.target.closest('.nav-links') && !e.target.closest('.mobile-menu')) {
        toggleMenu();
    }
});

// Handle navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Text animation for hero section
const useCases = ["Article", "Blog Post", "Speech", "Newsletter", "Essay", "Presentation"];
const changingText = document.getElementById('changing-text');
const cursor = document.getElementById('cursor');
let currentIndex = 0;
let currentText = '';
let isDeleting = false;
let typeTimeout;

function typeEffect() {
    const fullText = useCases[currentIndex];
    
    if (isDeleting) {
        // Deleting text
        currentText = fullText.substring(0, currentText.length - 1);
    } else {
        // Typing text
        currentText = fullText.substring(0, currentText.length + 1);
    }
    
    changingText.textContent = currentText;
    
    let typeSpeed = isDeleting ? 100 : 200;
    
    // If it's complete
    if (!isDeleting && currentText === fullText) {
        // Pause at complete word
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && currentText === '') {
        isDeleting = false;
        // Move to next word
        currentIndex = (currentIndex + 1) % useCases.length;
        // Pause before typing new word
        typeSpeed = 500;
    }
    
    clearTimeout(typeTimeout);
    typeTimeout = setTimeout(typeEffect, typeSpeed);
}

// Start the animation when the page loads
window.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});

// Animate elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to observe
const elements = document.querySelectorAll('.feature-card, .legal-content');
elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
