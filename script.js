document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
      });
      
      // Close mobile menu when clicking on links
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.add('hidden');
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
    
    // Form submission handler
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = this;
        const formData = new FormData(form);
        
        fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        })
        .then(response => {
          if (response.ok) {
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(error => {
          alert('Oops! There was a problem submitting your form. Please try again later.');
          console.error(error);
        });
      });
    }
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
      skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (barPosition < screenPosition) {
          bar.style.width = bar.parentElement.getAttribute('data-progress') || '0%';
        }
      });
    }
    
    // Initial call to animate skill bars
    animateSkillBars();
    
    // Animate skill bars on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // Initialize skill bars with proper width
    skillBars.forEach(bar => {
      const parentWidth = bar.style.width;
      bar.parentElement.setAttribute('data-progress', parentWidth);
      bar.style.width = '0';
      
      // Trigger animation after a short delay
      setTimeout(() => {
        bar.style.width = parentWidth;
      }, 500);
    });
  });