// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const subject = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Validate form
        if (!name || !email || !phone || !subject || !message) {
            showNotification('Please fill all fields', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Your message has been sent! We will contact you soon.', 'success');
        this.reset();
    });
}

// Equipment search functionality
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-box input');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        
        if (!searchTerm) {
            showNotification('Please enter your Aadhaar number or mobile number', 'error');
            return;
        }
        
        // Simulate search
        showNotification('Searching for your equipment...', 'info');
        
        // Simulate search result after 2 seconds
        setTimeout(() => {
            showNotification('Your tractor has been successfully distributed. Tracking Number: TRK' + Math.floor(Math.random() * 10000), 'success');
        }, 2000);
    });
    
    // Allow search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number[data-target]');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
};

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            if (!element.classList.contains('animated')) {
                element.classList.add('animated');
                animateCounter(element);
            }
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// Donation modal functionality
const donationModal = document.getElementById('donationModal');
const donateButtons = document.querySelectorAll('.donate-modal-btn');
const closeModal = document.querySelector('.close');
const donationAmounts = document.querySelectorAll('.donation-amount');
const customAmountDiv = document.querySelector('.custom-amount');
const customAmountInput = document.querySelector('.custom-amount input');
const donateNowBtn = document.querySelector('.donate-now');

// Open modal
donateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        donationModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    donationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === donationModal) {
        donationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle donation amount selection
let selectedAmount = 0;

donationAmounts.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        donationAmounts.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const amount = btn.getAttribute('data-amount');
        
        if (amount === 'custom') {
            customAmountDiv.style.display = 'block';
            customAmountInput.focus();
        } else {
            customAmountDiv.style.display = 'none';
            selectedAmount = parseInt(amount);
        }
    });
});

// Handle custom amount input
if (customAmountInput) {
    customAmountInput.addEventListener('input', (e) => {
        selectedAmount = parseInt(e.target.value) || 0;
    });
}

// Handle donate now button
if (donateNowBtn) {
    donateNowBtn.addEventListener('click', () => {
        if (selectedAmount === 0) {
            showNotification('Please select donation amount', 'error');
            return;
        }
        
        showNotification(`Donation of ₹${selectedAmount.toLocaleString()} successful! Thank you.`, 'success');
        donationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form
        donationAmounts.forEach(b => b.classList.remove('active'));
        customAmountDiv.style.display = 'none';
        if (customAmountInput) customAmountInput.value = '';
        selectedAmount = 0;
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
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
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.scheme-card, .transparency-item, .equipment-stat, .contact-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Scheme status indicators
const schemeCards = document.querySelectorAll('.scheme-card');

schemeCards.forEach(card => {
    const status = card.querySelector('.scheme-status');
    const link = card.querySelector('.scheme-link');
    
    if (link) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const schemeName = card.querySelector('h3').textContent;
            showNotification(`Details of ${schemeName} scheme will be available soon`, 'info');
        });
    }
});

// Equipment tracking simulation
function simulateEquipmentTracking() {
    const equipmentTypes = ['Tractors', 'Sprayers', 'Seed Drills', 'Harvesters'];
    const statuses = ['Distributed', 'In Process', 'Application Approved'];
    
    setInterval(() => {
        const randomType = equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Update random equipment stat
        const equipmentStats = document.querySelectorAll('.equipment-stat .stat-number');
        if (equipmentStats.length > 0) {
            const randomStat = equipmentStats[Math.floor(Math.random() * equipmentStats.length)];
            const currentValue = parseInt(randomStat.textContent.replace(/,/g, ''));
            const newValue = currentValue + Math.floor(Math.random() * 5) + 1;
            randomStat.textContent = newValue.toLocaleString() + '+';
        }
    }, 30000); // Update every 30 seconds
}

// Initialize equipment tracking simulation
simulateEquipmentTracking();

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Add smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Handle form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#f44336';
            isValid = false;
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });
    
    return isValid;
}

// Add form validation to all forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        if (!validateForm(form)) {
            e.preventDefault();
            showNotification('Please fill all required fields', 'error');
        }
    });
});

// Add hover effects for interactive elements
document.querySelectorAll('.btn, .scheme-card, .transparency-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'translateY(-2px)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translateY(0)';
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Bharatiya Krishi Foundation website loaded successfully');
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome! Join us in providing direct benefits of government schemes to farmers.', 'info');
    }, 2000);
});
