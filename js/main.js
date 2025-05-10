/**
 * BBIG Designs Website - Main JavaScript
 * Handles common functionality across the website
 */

document.addEventListener('DOMContentLoaded', function() {
    /**
     * Initialize Bootstrap components
     */
    // Initialize all tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize all popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  
    /**
     * Header behavior on scroll
     */
    const header = document.querySelector('header');
    
    if (header) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }
      });
      
      // Check initial scroll position
      if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
      }
    }
  
    /**
     * Active link highlighting
     */
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
      // Get the link's href attribute
      const linkPath = link.getAttribute('href');
      
      // Check if the current page matches the link path
      if (currentPage === linkPath || 
          (linkPath !== '/' && currentPage.startsWith(linkPath))) {
        link.classList.add('active');
      }
    });
  
    /**
     * Back to top button
     */
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
          backToTopButton.classList.add('show');
        } else {
          backToTopButton.classList.remove('show');
        }
      });
      
      backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  
    /**
     * Product image gallery
     */
    const productThumbnails = document.querySelectorAll('.thumbnail-image');
    const mainProductImage = document.getElementById('mainProductImage');
    
    if (productThumbnails.length && mainProductImage) {
      productThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
          // Update main image source
          mainProductImage.src = this.src;
          
          // Update active state of thumbnails
          productThumbnails.forEach(thumb => thumb.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }
  
    /**
     * Newsletter signup form
     */
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (isValidEmail(email)) {
          // In a real implementation, you'd submit this via AJAX
          // For now, show a success message
          newsletterForm.innerHTML = `
            <div class="alert alert-success" role="alert">
              <i class="fas fa-check-circle me-2"></i> Thank you for subscribing! We've sent a confirmation email to ${email}.
            </div>
          `;
        } else {
          // Show error
          const errorMessage = document.createElement('div');
          errorMessage.classList.add('invalid-feedback', 'd-block');
          errorMessage.textContent = 'Please enter a valid email address.';
          
          // Remove any existing error message
          const existingError = newsletterForm.querySelector('.invalid-feedback');
          if (existingError) {
            existingError.remove();
          }
          
          // Add error class and message
          emailInput.classList.add('is-invalid');
          emailInput.after(errorMessage);
        }
      });
    }
  
    /**
     * Contact form validation
     */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check form validity
        if (this.checkValidity()) {
          // In a real implementation, you'd submit this via AJAX
          // For now, show a success message
          contactForm.innerHTML = `
            <div class="alert alert-success text-center py-5" role="alert">
              <i class="fas fa-check-circle fa-3x mb-3"></i>
              <h4 class="alert-heading">Message Sent!</h4>
              <p>Thank you for contacting BBIG Designs. We've received your message and will respond within 1-2 business days.</p>
            </div>
          `;
        } else {
          // Trigger browser validation
          this.reportValidity();
        }
      });
    }
  
    /**
     * Product filtering
     */
    const categoryFilter = document.getElementById('categoryFilter');
    const productItems = document.querySelectorAll('.product-item');
    
    if (categoryFilter && productItems.length) {
      categoryFilter.addEventListener('change', function() {
        const selectedCategory = this.value;
        
        productItems.forEach(item => {
          if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
  
    /**
     * Search functionality
     */
    const searchForm = document.getElementById('searchForm');
    
    if (searchForm) {
      searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchQuery = this.querySelector('input[name="search"]').value.trim();
        
        if (searchQuery) {
          // In a real implementation, you'd redirect to a search results page
          // or perform an AJAX search
          window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
      });
    }
  
    /**
     * Add Current Year to Footer
     */
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
      element.textContent = currentYear;
    });
  
    /**
     * Helper function to validate email
     */
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });