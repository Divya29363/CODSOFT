// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-item a').forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navigation section display functionality
    const navLinks = document.querySelectorAll('.nav-item a');
    const sections = document.querySelectorAll('section');
    
    // Function to show the selected section
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active-section');
        });
        
        // Show the selected section
        const activeSection = document.querySelector(sectionId);
        if (activeSection) {
            activeSection.classList.add('active-section');
        }
        
        // Update active state in navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === sectionId) {
                link.classList.add('active');
            }
        });
        
        // Scroll to top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Set up click event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href');
            showSection(sectionId);
            
            // Update URL without reloading page
            history.pushState(null, null, sectionId);
        });
    });
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', function() {
        const sectionId = window.location.hash || '#home';
        showSection(sectionId);
    });
    
    // Initialize page - show the section based on URL hash or default to home
    const initialSectionId = window.location.hash || '#home';
    showSection(initialSectionId);
    
    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Set up click events for slider controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            let index = currentSlide - 1;
            if (index < 0) {
                index = testimonials.length - 1;
            }
            showTestimonial(index);
        });
        
        nextBtn.addEventListener('click', function() {
            let index = currentSlide + 1;
            if (index >= testimonials.length) {
                index = 0;
            }
            showTestimonial(index);
        });
        
        // Set up dots click events
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showTestimonial(index);
            });
        });
        
        // Auto-advance the testimonial slider every 5 seconds
        setInterval(function() {
            let index = currentSlide + 1;
            if (index >= testimonials.length) {
                index = 0;
            }
            showTestimonial(index);
        }, 5000);
    }
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For this demo, we'll just show an alert
            alert(`Thank you ${name} for your message! We'll get back to you soon regarding ${service} services.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
   // Add animation on scroll
   window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Add animation to elements when they come into view
    document.querySelectorAll('.service-card, .about-content, .testimonial').forEach(element => {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition > elementPosition - windowHeight + 100) {
            element.classList.add('animate');
        }
    });
});

// Smooth scroll for internal links (like "Learn More" buttons)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').length > 1) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // If we're using section toggle, show the section
                showSection(targetId);
            } else {
                // Otherwise, just scroll to the element
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        }
    });
});

// Add some basic form validation
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateInput(this);
    });
});

function validateInput(input) {
    if (input.hasAttribute('required') && input.value.trim() === '') {
        input.classList.add('error');
        return false;
    } else if (input.type === 'email' && input.value.trim() !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value)) {
            input.classList.add('error');
            return false;
        }
    }
    
    input.classList.remove('error');
    return true;
}

// Add CSS for form validation
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #ff3860;
        box-shadow: 0 0 0 2px rgba(255, 56, 96, 0.25);
    }
    
    .service-card,
    .about-content,
    .testimonial {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-card.animate,
    .about-content.animate,
    .testimonial.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Add staggered animation delay for service cards */
    .service-card:nth-child(1) { transition-delay: 0.1s; }
    .service-card:nth-child(2) { transition-delay: 0.3s; }
    .service-card:nth-child(3) { transition-delay: 0.5s; }
`;

document.head.appendChild(style);

// Add resize event handler for responsive design
window.addEventListener('resize', function() {
    // Reset mobile menu when window is resized to desktop size
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Preload animations - trigger initial animations
setTimeout(function() {
    // Manually trigger scroll event to initialize animations
    window.dispatchEvent(new Event('scroll'));
}, 500);
});

// Add this to your existing JavaScript file

// Counter animation for statistics
function startCounterAnimation() {
    const counterElements = document.querySelectorAll('.stat-number');
    
    counterElements.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 20); // Update every 20ms
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Check if stats section is in viewport and start animation
function checkStatsVisibility() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    const isVisible = (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
    
    if (isVisible && !statsSection.classList.contains('animated')) {
        statsSection.classList.add('animated');
        startCounterAnimation();
    }
}

// Add scroll event listener for counter animation
window.addEventListener('scroll', checkStatsVisibility);
window.addEventListener('load', checkStatsVisibility);

// Handle quick enrollment form submission
const quickForm = document.querySelector('.quick-form');
if (quickForm) {
    quickForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('select').value;
        
        // Display a thank you message
        const formParent = this.parentElement;
        this.style.display = 'none';
        
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = 'thank-you-message';
        thankYouMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Thank you, ${name}!</h3>
            <p>We'll contact you shortly about your free ${subject} consultation.</p>
            <button class="btn secondary-btn reset-form">Submit another request</button>
        `;
        
        formParent.appendChild(thankYouMessage);
        
        // Add the following CSS for the thank you message
        const style = document.createElement('style');
        style.textContent = `
            .thank-you-message {
                text-align: center;
                padding: 20px;
                animation: fadeIn 0.5s ease;
            }
            
            .thank-you-message i {
                font-size: 50px;
                color: #2bd69e;
                margin-bottom: 15px;
            }
            
            .thank-you-message h3 {
                color: var(--primary-color);
                margin-bottom: 10px;
            }
            
            .thank-you-message p {
                margin-bottom: 20px;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
        
        // Allow submitting another request
        const resetButton = thankYouMessage.querySelector('.reset-form');
        resetButton.addEventListener('click', function() {
            thankYouMessage.remove();
            quickForm.reset();
            quickForm.style.display = 'block';
        });
    });
}

// Add a subtle parallax effect to the hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < 600) { // Only apply effect near the top of the page
            heroSection.style.backgroundPositionY = scrollPosition * 0.2 + 'px';
        }
    });
}

// Add hover effect to feature items
const featureItems = document.querySelectorAll('.feature-item');
featureItems.forEach(item => {
    item.addEventListener('mouseover', function() {
        // Gently animate the icon
        const icon = this.querySelector('.feature-icon i');
        icon.style.transform = 'scale(1.2)';
        icon.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseout', function() {
        const icon = this.querySelector('.feature-icon i');
        icon.style.transform = 'scale(1)';
    });
});