// Header functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation link functionality
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Here you can add navigation logic
            console.log(`Navigating to: ${this.textContent}`);
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    // Search button click event
    searchBtn.addEventListener('click', function() {
        performSearch();
    });
    
    // Search on Enter key press
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Search function
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm === '') {
            alert('Please enter a search term');
            return;
        }
        
        // Here you can add your search logic
        console.log(`Searching for: ${searchTerm}`);
        
        // Example: You could redirect to a search results page
        // window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
        
        // For demo purposes, just show an alert
        alert(`Searching for: "${searchTerm}"`);
    }
    
    // Search input focus effects
    searchInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
    
    // Logo click functionality
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            // Navigate to home page
            console.log('Navigating to home page');
            // window.location.href = 'index.html';
        });
        
        // Make logo clickable with cursor pointer
        logo.style.cursor = 'pointer';
    }
    
    // Smooth scrolling for navigation (if needed)
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Add hover effects for better UX
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Search container animation
    const searchContainer = document.querySelector('.search-container');
    
    searchContainer.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    searchContainer.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Header scroll effect (optional)
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add transition for header scroll effect
    header.style.transition = 'transform 0.3s ease-in-out';
});