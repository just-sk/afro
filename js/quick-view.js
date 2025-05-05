document.addEventListener('DOMContentLoaded', function() {
    // Get product data from localStorage
    const productData = JSON.parse(localStorage.getItem('quickViewProduct'));
    
    if (!productData) {
        window.location.href = '../html/shop.html';
        return;
    }

    // DOM Elements
    const mainImage = document.getElementById('main-product-image');
    const thumbnailContainer = document.getElementById('thumbnail-container');
    const productTitle = document.getElementById('product-title');
    const productPrice = document.getElementById('product-price');
    const productDescription = document.getElementById('product-description');
    const sizeOptionsContainer = document.getElementById('size-options');
    const detailsList = document.getElementById('product-details-list');
    const addToCartBtn = document.getElementById('add-to-cart');
    const closeBtn = document.querySelector('.close-btn');

    // Populate product data
    productTitle.textContent = productData.name;
    productPrice.textContent = `$${productData.price.toFixed(2)}`;
    productDescription.textContent = productData.description;

    // Set main image
    mainImage.src = productData.images[0];
    mainImage.alt = productData.name;

    // Create thumbnails
    productData.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image}" alt="${productData.name} view ${index + 1}">`;
        thumbnailContainer.appendChild(thumbnail);

        // Thumbnail click event
        thumbnail.addEventListener('click', function() {
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            mainImage.src = image;
        });
    });

    // Create size options
    productData.sizes.forEach((size, index) => {
        const sizeOption = document.createElement('button');
        sizeOption.className = `size-option ${index === 0 ? 'active' : ''}`;
        sizeOption.textContent = size;
        sizeOptionsContainer.appendChild(sizeOption);

        // Size selection event
        sizeOption.addEventListener('click', function() {
            document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Create product details
    Object.entries(productData.details).forEach(([key, value]) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${key}:</strong> ${value}`;
        detailsList.appendChild(li);
    });

    // Add to cart functionality
    addToCartBtn.addEventListener('click', function() {
        const selectedSize = document.querySelector('.size-option.active').textContent;
        
        // Get existing cart or create new one
        let cart = JSON.parse(localStorage.getItem('afroCart')) || [];
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => 
            item.id === productData.id && 
            item.size === selectedSize
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productData.id,
                name: productData.name,
                price: productData.price,
                size: selectedSize,
                image: productData.images[0],
                quantity: 1
            });
        }

        // Save to localStorage
        localStorage.setItem('afroCart', JSON.stringify(cart));
        
        // Update cart count in shop page if it's open
        // Replace the notification line with:
if (window.opener) {
    try {
        window.opener.postMessage({ type: 'cartUpdate' }, '*');
    } catch (e) {
        console.log("Couldn't communicate with parent window");
    }
}
        // Show confirmation
        alert(`${productData.name} (Size: ${selectedSize}) added to cart!`);
    });

    // Close button functionality
    closeBtn.addEventListener('click', function() {
        window.history.back();
    });
});