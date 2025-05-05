document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('afroCart')) || [];
    const cartContainer = document.getElementById('cart-items-container');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    // Render cart items
    function renderCart() {
        cartContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <p>Your cart is empty</p>
                    <a href="../html/shop.html" class="btn">Continue Shopping</a>
                </div>
            `;
            subtotalElement.textContent = '$0.00';
            totalElement.textContent = '$0.00';
            checkoutBtn.disabled = true;
            updateCartCount();
            return;
        }
        
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='../Photos/default-product.jpg'">
                </div>
                <div class="item-details">
                    <div class="item-info">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-size">Size: ${item.size}</p>
                        <p class="item-price">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="item-controls">
                        <div class="quantity-selector">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                        <p class="item-total">$${itemTotal.toFixed(2)}</p>
                        <button class="remove-item" data-index="${index}">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `;
            cartContainer.appendChild(itemElement);
        });
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${subtotal.toFixed(2)}`;
        checkoutBtn.disabled = false;
        updateCartCount();
        
        // Add event listeners
        setupCartEventListeners();
    }
    
    function setupCartEventListeners() {
        // Quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const isMinus = this.classList.contains('minus');
                updateQuantity(index, isMinus ? -1 : 1);
            });
        });
        
        // Quantity inputs
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.closest('.cart-item').querySelector('.remove-item').dataset.index);
                const newValue = parseInt(this.value);
                if (!isNaN(newValue) && newValue > 0) {
                    updateQuantity(index, 0, newValue);
                } else {
                    this.value = 1;
                }
            });
        });
        
        // Remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                removeItem(index);
            });
        });
        
        // Checkout button
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                window.location.href = '../html/checkout.html';
            }
        });
    }
    
    function updateQuantity(index, change, newValue) {
        if (newValue !== undefined) {
            cart[index].quantity = newValue;
        } else {
            cart[index].quantity += change;
        }
        
        // Ensure quantity is at least 1
        if (cart[index].quantity < 1) cart[index].quantity = 1;
        
        saveCart();
        renderCart();
    }
    
    function removeItem(index) {
        if (confirm('Are you sure you want to remove this item from your cart?')) {
            cart.splice(index, 1);
            saveCart();
            renderCart();
        }
    }
    
    function saveCart() {
        localStorage.setItem('afroCart', JSON.stringify(cart));
        updateCartCount();
    }
    
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElements.forEach(el => {
            el.textContent = count;
        });
    }
    
    // Initial render
    renderCart();
});