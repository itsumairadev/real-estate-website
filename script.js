// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    // Smooth Scrolling
    setupSmoothScrolling();
    
    // Navbar Scroll Effect
    setupNavbarScroll();
    
    // Mobile Menu
    setupMobileMenu();
    
    // Search Tabs
    setupSearchTabs();
    
    // Property Filtering
    setupPropertyFilters();
    
    // Property Sorting
    setupPropertySorting();
    
    // Property Cards Animation
    setupPropertyCardAnimations();
    
    // Stats Counter Animation
    setupStatsCounter();
    
    // Contact Form
    setupContactForm();
    
    // Newsletter Form
    setupNewsletterForm();
    
    // Back to Top Button
    setupBackToTop();
    
    // Agent Contact Buttons
    setupAgentContactButtons();
    
    // Property View Details Buttons
    setupPropertyDetailButtons();
    
    // Login Button
    setupLoginButton();
    
    // Add Property Button
    setupAddPropertyButton();
}

// Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.querySelector('.mobile-menu').classList.remove('active');
            }
        });
    });
}

// Navbar Scroll Effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if(window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');
    
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        menuBtn.querySelector('i').classList.toggle('fa-bars');
        menuBtn.querySelector('i').classList.toggle('fa-times');
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if(!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
        }
    });
}

// Search Tabs
function setupSearchTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update search form based on tab
            const tabType = this.dataset.tab;
            updateSearchFormForTab(tabType);
        });
    });
}

function updateSearchFormForTab(tabType) {
    const priceRange = document.querySelector('#price-range');
    const propertyType = document.querySelector('#property-type');
    
    switch(tabType) {
        case 'rent':
            updateSelectOptions(priceRange, [
                {value: '', text: 'Monthly Rent'},
                {value: '0-30', text: 'Under 30,000'},
                {value: '30-50', text: '30,000 - 50,000'},
                {value: '50-100', text: '50,000 - 100,000'},
                {value: '100-200', text: '100,000 - 200,000'},
                {value: '200+', text: '200,000+'}
            ]);
            break;
            
        case 'commercial':
            updateSelectOptions(propertyType, [
                {value: '', text: 'Commercial Type'},
                {value: 'office', text: 'Office Space'},
                {value: 'shop', text: 'Shop'},
                {value: 'warehouse', text: 'Warehouse'},
                {value: 'showroom', text: 'Showroom'},
                {value: 'industrial', text: 'Industrial'}
            ]);
            break;
            
        default: // buy
            updateSelectOptions(priceRange, [
                {value: '', text: 'Price Range'},
                {value: '0-50', text: 'Under 50L'},
                {value: '50-100', text: '50L - 1Cr'},
                {value: '100-500', text: '1Cr - 5Cr'},
                {value: '500+', text: '5Cr+'}
            ]);
            
            updateSelectOptions(propertyType, [
                {value: '', text: 'Property Type'},
                {value: 'house', text: 'House'},
                {value: 'apartment', text: 'Apartment'},
                {value: 'villa', text: 'Villa'},
                {value: 'plot', text: 'Plot'},
                {value: 'commercial', text: 'Commercial'},
                {value: 'farmhouse', text: 'Farm House'}
            ]);
    }
}

function updateSelectOptions(selectElement, options) {
    selectElement.innerHTML = '';
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        selectElement.appendChild(opt);
    });
}

// Property Filtering
function setupPropertyFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterType = this.dataset.filter;
            
            // Filter properties
            propertyCards.forEach(card => {
                const cardType = card.dataset.type;
                
                if(filterType === 'all' || cardType === filterType) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Property Sorting
function setupPropertySorting() {
    const sortSelect = document.querySelector('#sort-by');
    const propertyGrid = document.querySelector('.properties-grid');
    
    sortSelect.addEventListener('change', function() {
        const sortType = this.value;
        const propertyCards = Array.from(document.querySelectorAll('.property-card'));
        
        propertyCards.sort((a, b) => {
            const priceA = parseFloat(a.dataset.price) || 0;
            const priceB = parseFloat(b.dataset.price) || 0;
            
            switch(sortType) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'newest':
                    return Math.random() - 0.5; // Simulate date sorting
                case 'popular':
                    return Math.random() - 0.5; // Simulate popularity sorting
                default:
                    return 0;
            }
        });
        
        // Reorder grid
        propertyCards.forEach(card => {
            propertyGrid.appendChild(card);
        });
    });
}

// Property Cards Animation
function setupPropertyCardAnimations() {
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach((card, index) => {
        // Stagger animation
        setTimeout(() => {
            card.style.animationDelay = `${index * 0.1}s`;
        }, 100);
        
        // Heart button functionality
        const heartBtn = card.querySelector('.action-btn:nth-child(1)');
        if(heartBtn) {
            heartBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
                this.innerHTML = this.classList.contains('active') 
                    ? '<i class="fas fa-heart" style="color: #ef4444;"></i>' 
                    : '<i class="fas fa-heart"></i>';
                
                // Show notification
                showNotification('Property added to favorites!', 'success');
            });
        }
        
        // Share button functionality
        const shareBtn = card.querySelector('.action-btn:nth-child(2)');
        if(shareBtn) {
            shareBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showNotification('Share link copied to clipboard!', 'info');
            });
        }
    });
}

// Stats Counter Animation
function setupStatsCounter() {
    const statItems = document.querySelectorAll('.stat-item h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                statItems.forEach(item => {
                    const target = parseInt(item.dataset.count);
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if(current >= target) {
                            item.textContent = target.toLocaleString();
                            clearInterval(timer);
                        } else {
                            item.textContent = Math.floor(current).toLocaleString();
                        }
                    }, 16);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.stats-counter'));
}

// Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData);
        
        // Validate form
        let isValid = true;
        const inputs = this.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if(input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                input.style.borderColor = '#e2e8f0';
            }
        });
        
        if(isValid) {
            // Show loading state
            const submitBtn = this.querySelector('.btn-submit-form');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! We\'ll contact you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
    });
}

// Newsletter Form
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const subscribeBtn = newsletterForm.querySelector('.btn-subscribe');
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    
    subscribeBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        if(!email) {
            showNotification('Please enter your email address.', 'error');
            emailInput.focus();
            return;
        }
        
        if(!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            emailInput.focus();
            return;
        }
        
        // Show loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        this.disabled = true;
        
        // Simulate subscription
        setTimeout(() => {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
            this.innerHTML = originalText;
            this.disabled = false;
        }, 1500);
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Back to Top Button
function setupBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if(window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Agent Contact Buttons
function setupAgentContactButtons() {
    const agentButtons = document.querySelectorAll('.btn-contact-agent');
    
    agentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const agentName = this.closest('.agent-info').querySelector('h3').textContent;
            showNotification(`Contact form will open for ${agentName}.`, 'info');
        });
    });
}

// Property View Details Buttons
function setupPropertyDetailButtons() {
    const viewButtons = document.querySelectorAll('.btn-view-details');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const propertyName = this.closest('.property-card').querySelector('h3').textContent;
            showNotification(`Opening details page for: ${propertyName}`, 'info');
        });
    });
    
    // Make entire property card clickable
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if(!e.target.closest('.action-btn') && !e.target.closest('.btn-view-details')) {
                const propertyName = this.querySelector('h3').textContent;
                showNotification(`Opening details page for: ${propertyName}`, 'info');
            }
        });
    });
}

// Login Button
function setupLoginButton() {
    const loginBtn = document.querySelector('.btn-login');
    
    loginBtn.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        this.disabled = true;
        
        setTimeout(() => {
            showNotification('Login feature will open a modal in the full version.', 'info');
            this.innerHTML = originalText;
            this.disabled = false;
        }, 1500);
    });
}

// Add Property Button
function setupAddPropertyButton() {
    const addPropertyBtn = document.querySelector('.btn-add-property');
    
    addPropertyBtn.addEventListener('click', function() {
        showNotification('Property submission form will open in the full version.', 'info');
    });
}

// Quick Filters
document.querySelectorAll('.quick-filter').forEach(filter => {
    filter.addEventListener('click', function() {
        const filterType = this.textContent.trim();
        showNotification(`Filtering properties by: ${filterType}`, 'info');
    });
});

// Search Button
const searchBtn = document.querySelector('.btn-search-advanced');
searchBtn.addEventListener('click', function() {
    const location = document.querySelector('.search-filters input').value;
    const propertyType = document.querySelector('#property-type').value;
    const priceRange = document.querySelector('#price-range').value;
    
    if(!location && !propertyType && !priceRange) {
        showNotification('Please select at least one search criteria.', 'error');
        return;
    }
    
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    this.disabled = true;
    
    setTimeout(() => {
        showNotification(`Searching properties with selected filters...`, 'info');
        this.innerHTML = originalText;
        this.disabled = false;
    }, 2000);
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if(existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
            border-left: 5px solid;
        }
        
        .notification-info { border-left-color: #3b82f6; }
        .notification-success { border-left-color: #10b981; }
        .notification-error { border-left-color: #ef4444; }
        .notification-warning { border-left-color: #f59e0b; }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification-info i { color: #3b82f6; }
        .notification-success i { color: #10b981; }
        .notification-error i { color: #ef4444; }
        .notification-warning i { color: #f59e0b; }
        
        .notification span {
            color: #1e293b;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            color: #64748b;
            font-size: 1rem;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if(notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}