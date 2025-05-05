document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your service ID
    emailjs.init("-QRPT7s95QDtYlBeJ"); // Replace with your actual EmailJS user ID

    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem('afroCart')) || [];
    const cartItemsContainer = document.getElementById('cart-items-container');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const placeOrderBtn = document.getElementById('place-order-btn');

    // Render cart items
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <p>Your cart is empty</p>
                    <a href="shop.html" style="color: var(--red);">Continue Shopping</a>
                </div>
            `;
            placeOrderBtn.disabled = true;
            return;
        }

        let subtotal = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>${item.description || ''}</p>
                    <div class="item-attributes">
                        <div>Size: ${item.size || 'M'}</div>
                        <div>Qty: ${item.quantity}</div>
                    </div>
                </div>
                <div class="item-price">GH₵${itemTotal.toFixed(2)}</div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        const shipping = 5.00;
        const total = subtotal + shipping;

        subtotalElement.textContent = `GH₵${subtotal.toFixed(2)}`;
        shippingElement.textContent = `GH₵${shipping.toFixed(2)}`;
        totalElement.textContent = `GH₵${total.toFixed(2)}`;
    }

    // Function to send emails via EmailJS
    async function sendOrderEmails(orderData) {
        try {
            // Generate order number
            const orderNumber = `ORD-${Date.now()}`;
            
            // Customer email
            const customerEmailParams = {
                to_name: orderData.customer.name,
                to_email: orderData.customer.email,
                order_number: orderNumber,
                order_date: new Date().toLocaleDateString(),
                items: orderData.items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price.toFixed(2),
                    total: (item.price * item.quantity).toFixed(2)
                })),
                subtotal: orderData.subtotal.toFixed(2),
                shipping: orderData.shipping.toFixed(2),
                total: orderData.total.toFixed(2),
                delivery_address: `${orderData.customer.address.street}, ${orderData.customer.address.city}, ${orderData.customer.address.country}`
            };

            // Store owner email
            const storeEmailParams = {
                customer_name: orderData.customer.name,
                customer_email: orderData.customer.email,
                customer_phone: orderData.customer.phone,
                order_number: orderNumber,
                order_date: new Date().toLocaleDateString(),
                items: orderData.items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price.toFixed(2),
                    total: (item.price * item.quantity).toFixed(2)
                })),
                subtotal: orderData.subtotal.toFixed(2),
                shipping: orderData.shipping.toFixed(2),
                total: orderData.total.toFixed(2),
                delivery_address: `${orderData.customer.address.street}, ${orderData.customer.address.city}, ${orderData.customer.address.country}`,
                special_instructions: orderData.customer.instructions || 'None'
            };

            // Send both emails
            await Promise.all([
                emailjs.send("service_bs0h6wg", "customer_order_confirm", customerEmailParams),
                emailjs.send("service_bs0h6wg", "store_new_order", storeEmailParams)
            ]);

            return orderNumber; // Return the order number for confirmation page
        } catch (error) {
            console.error('Failed to send emails:', error);
            throw error; // Re-throw the error to handle in the calling function
        }
    }

    // Handle place order
    placeOrderBtn.addEventListener('click', async function() {
        // Validate form
        const name = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone-number').value.trim();
        const country = document.getElementById('country').value;
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();

        if (!name || !email || !country || !address || !city || !phone) {
            alert('Please fill in all required fields');
            return;
        }

        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }

        // Prepare order data
        const orderData = {
            customer: {
                name,
                email,
                phone,
                address: {
                    country,
                    street: address,
                    city,
                    zip: document.getElementById('zip').value.trim()
                },
                instructions: document.getElementById('instructions').value.trim()
            },
            items: cart,
            subtotal: parseFloat(subtotalElement.textContent.replace('GH₵', '')),
            shipping: parseFloat(shippingElement.textContent.replace('GH₵', '')),
            total: parseFloat(totalElement.textContent.replace('GH₵', ''))
        };

        // Disable button to prevent multiple submissions
        placeOrderBtn.disabled = true;
        placeOrderBtn.textContent = 'Processing...';

        try {
            // Send emails and get order number
            const orderNumber = await sendOrderEmails(orderData);
            
            // Clear the cart
            localStorage.removeItem('afroCart');
            
            // Redirect to confirmation page with order number
            window.location.href = `order-confirmation.html?order=${orderNumber}`;
        } catch (error) {
            console.error('Order processing error:', error);
            alert('Order was placed but we encountered an issue sending confirmation emails. Please contact support with your order details.');
            placeOrderBtn.disabled = false;
            placeOrderBtn.textContent = 'Place Order Securely';
            
            // Still clear cart but show error
            localStorage.removeItem('afroCart');
            window.location.href = 'index.html';
        }
    });

    // Initial render
    renderCartItems();
});