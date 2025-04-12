// Product Data (in real project, load from products.json)
const products = [
    {
        id: "resist-hoodie",
        name: "Resist Hoodie",
        price: 64.00,
        images: ["hoodie-1.jpg", "hoodie-2.jpg"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Red"],
        description: "Organic cotton hoodie with screen-printed protest art. Made ethically in unionized factories.",
        details: {
            "Material": "100% organic cotton",
            "Care": "Machine wash cold",
            "Ethical Rating": "5/5 Fair Wear Foundation"
        }
    },
    {
        id: "protest-tee",
        name: "Protest Tee",
        price: 29.00,
        images: ["tee-1.jpg"],
        sizes: ["XS", "S", "M", "L"],
        colors: ["White", "Black"],
        description: "Recycled cotton t-shirt featuring iconic protest imagery. 10% of proceeds go to activist organizations.",
        details: {
            "Material": "100% recycled cotton",
            "Care": "Machine wash cold",
            "Printed With": "Eco-friendly inks"
        }
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

function addToCart(productId, size) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => 
        item.id === productId && 
        item.size === size
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            size: size,
            image: product.images[0],
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} (Size: ${size}) added to cart!`);
}

// Quick View Modal
function setupQuickView() {
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const product = products.find(p => p.id === productId);
            
            if (!product) return;
            
            // Populate modal
            document.querySelector('.modal-product-content').innerHTML = `
                <div class="modal-product-gallery">
                    <img src="images/${product.images[0]}" alt="${product.name}">
                </div>
                <div class="modal-product-info">
                    <h2>${product.name}</h2>
                    <div class="modal-price">$${product.price.toFixed(2)}</div>
                    <p class="modal-description">${product.description}</p>
                    
                    <div class="size-selector">
                        <h3>Size:</h3>
                        <div class="size-options">
                            ${product.sizes.map(size => `
                                <button class="size-option" data-size="${size}">${size}</button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <button class="modal-add-to-cart" data-product-id="${product.id}">
                        Add to Cart
                    </button>
                    
                    <div class="product-details">
                        <h3>Details</h3>
                        <ul>
                            ${Object.entries(product.details).map(([key, value]) => `
                                <li><strong>${key}:</strong> ${value}</li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
            
            // Size selection
            document.querySelectorAll('.size-option').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.size-option').forEach(b => {
                        b.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });
            
            // Add to cart
            document.querySelector('.modal-add-to-cart').addEventListener('click', () => {
                const selectedSize = document.querySelector('.size-option.active')?.dataset.size;
                if (!selectedSize) {
                    alert("Please select a size first");
                    return;
                }
                addToCart(product.id, selectedSize);
            });
            
            // Show modal
            document.getElementById('quickViewModal').style.display = 'block';
        });
    });
}

// Close modal
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('quickViewModal').style.display = 'none';
});

// Close when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('quickViewModal')) {
        document.getElementById('quickViewModal').style.display = 'none';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    setupQuickView();
});