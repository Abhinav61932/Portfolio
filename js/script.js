// --- Navbar Scroll Effect ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Mobile Menu Toggle ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// --- Scroll Reveal Animations (Intersection Observer) ---
document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
});

// --- Scroll Progress Bar ---
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // Prevent divide by 0 issues
    if(totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    if(scrollProgress) scrollProgress.style.width = `${progress}%`;
});

// --- Custom Cursor ---
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const interactiveElements = document.querySelectorAll('a, .btn, .project-card, .hamburger, .skill-tag');

if(window.matchMedia("(min-width: 769px)").matches) {
    document.addEventListener('mousemove', (e) => {
        if(cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
        if(cursorFollower) {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(cursorFollower) cursorFollower.classList.add('cursor-hover');
            if(cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            if(cursorFollower) cursorFollower.classList.remove('cursor-hover');
            if(cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// --- 3D Hover Tilt Effect for Project Cards ---
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
    // Only apply on non-touch screens
    if(window.matchMedia("(min-width: 769px)").matches) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angle constraint to max 10 degrees
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none'; // remove transition for smooth tracking
        });
    }
});

// --- Typing Animation on Hero Subtitle ---
const typingTextElement = document.getElementById('typing-text');
if (typingTextElement && typingTextElement.innerHTML.trim() === '') {
    const textToType = "I build stunning, creative, and dynamic web experiences.";
    let charIndex = 0;
    function type() {
        if (charIndex <= textToType.length) {
            const currentText = textToType.substring(0, charIndex);
            typingTextElement.innerHTML = currentText + '<span class="typing-cursor"></span>';
            charIndex++;
            // Generate a slightly random delay for realistic typing
            const delay = Math.random() * 30 + 40; 
            setTimeout(type, delay);
        } else {
            // Blink cursor forever at the end
            typingTextElement.innerHTML = textToType + '<span class="typing-cursor"></span>';
        }
    }
    
    // Start typing after initial fade-in (e.g. 1.2 seconds)
    setTimeout(type, 1200);
}
