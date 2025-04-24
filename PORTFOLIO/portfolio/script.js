// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scrolling for navigation
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill out all fields');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For now, just show a success message
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
// Animate skill bars on scroll
const skillSection = document.querySelector('.skills');
const progressBars = document.querySelectorAll('.progress-bar');

function animateSkillBars() {
    if (skillSection) {
        const sectionPos = skillSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;
        
        if (sectionPos < screenPos) {
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                    bar.style.transition = 'width 1s ease';
                }, 100);
            });
            
            // Remove event listener after animation
            window.removeEventListener('scroll', animateSkillBars);
        }
    }
}

window.addEventListener('scroll', animateSkillBars);

// Add active class to current section in navigation
const sections = document.querySelectorAll('section');

function highlightNav() {
    let scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// Typing animation for hero section
const typingText = document.querySelector('.hero-content h1');

if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < text.length) {
            typingText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Uncomment the line below if you want to enable the typing effect
    // typeWriter();
}
});