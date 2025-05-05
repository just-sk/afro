// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.main-nav').classList.toggle('active');
});

// Cart Functionality
let cartCount = 0;
const cartButtons = document.querySelectorAll('.add-to-cart');
const cartCountElement = document.querySelector('.cart-count');

cartButtons.forEach(button => {
    button.addEventListener('click', function() {
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Animation for visual feedback
        this.textContent = 'Added!';
        setTimeout(() => {
            this.textContent = 'Add to Cart';
        }, 1000);
    });
});

// Horizontal Scroller Functionality
const scrollContainer = document.querySelector('.scroller-container');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

if (scrollContainer) {
    // Scroll buttons functionality
    rightBtn?.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });

    leftBtn?.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });
}

// Email Subscription Form
document.getElementById('emailForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('email');
    const formMessage = document.getElementById('formMessage');
    const email = emailInput.value.trim();
    
    // Simple validation
    if (!validateEmail(email)) {
        formMessage.textContent = 'Please enter a valid email address';
        formMessage.className = 'form-message error';
        return;
    }
    
    if (!document.getElementById('privacy').checked) {
        formMessage.textContent = 'Please agree to the privacy policy';
        formMessage.className = 'form-message error';
        return;
    }
    
    simulateSubmission(email);
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function simulateSubmission(email) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = 'Subscribing...';
    formMessage.className = 'form-message';
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.textContent = 'Thank you for subscribing! Check your email for 10% off.';
        formMessage.className = 'form-message success';
        document.getElementById('emailForm').reset();
    }, 1500);
}