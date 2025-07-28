document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close mobile menu when clicking on the Book Now button
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission handling with EmailJS
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formStatus = document.getElementById('form-status');
      
      // Show loading state
      formStatus.textContent = 'Sending...';
      formStatus.style.color = 'var(--medium-gray)';
      
      // Send email using EmailJS
      emailjs.sendForm('service_2662886', 'template_hem2gqe', '#contact-form')
        .then(function() {
          formStatus.textContent = 'Message sent successfully!';
          formStatus.style.color = 'green';
          contactForm.reset();
          
          // Clear status after 5 seconds
          setTimeout(() => {
            formStatus.textContent = '';
          }, 5000);
        }, function(error) {
          formStatus.textContent = 'Failed to send message. Please try again.';
          formStatus.style.color = 'red';
          
          // Clear error after 5 seconds
          setTimeout(() => {
            formStatus.textContent = '';
          }, 5000);
        });
    });
  }
  
  // Form validation
  const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select');
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (!this.checkValidity()) {
        this.style.borderColor = 'red';
      } else {
        this.style.borderColor = '#ddd';
      }
    });
  });
  
  // Animation on scroll with debounce
  let scrollTimeout;
  const animateOnScroll = function() {
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (sectionTop < windowHeight - 100) {
        section.classList.add('visible');
      }
    });
  };

  // Initialize sections with fade-in effect
  document.querySelectorAll('section').forEach(section => {
    section.classList.remove('visible');
  });

  // Run once on load
  animateOnScroll();

  // Debounced scroll event
  window.addEventListener('scroll', function() {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(animateOnScroll, 10);
  });
  
  // Scroll to calendar function
  window.scrollToCalendar = function() {
    const calendarSection = document.querySelector('.calendar-section');
    if (calendarSection) {
      calendarSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
});
