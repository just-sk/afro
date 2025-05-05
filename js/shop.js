// Product Data
const products = [
    {
        id: "Afro-hoodie",
        name: "Afro Hoodie",
        price: 64.00,
        category: "hoodie",
        images: ["../Photos/Afro Hoodie.jpg", "../Photos/Afro Hoodie back .jpg" ,"../Photos/Afro hoodie fit female front 2.jpg", "../Photos/Afro hoodie fit male back.jpg"],
        sizes: ["S", "M", "L", "XL"," XXL"],
        description: "Organic cotton with screen-printed slogan",
        details: {
            "Material": "100% organic cotton",
            "Care": "Machine wash cold",
            "Ethical Rating": "5/5 Fair Wear Foundation"
        },
        badge: "Bestseller"
    },
    {
        id: "Afro-jersey-white",
        name: "Afro Jersey (White)",
        price: 54.00,
        category: "sweatshirt",
        images: ["../Photos/AFRODESIGN2.jpg","../Photos/Afro Jersey  White back.jpg", "../Photos/Afro Jersey white fit male 2.jpg", "../Photos/Afro Jersey white fit female 3.jpg"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Heavyweight fleece with embroidered design",
        details: {
            "Material": "Heavyweight fleece",
            "Care": "Machine wash cold"
        },
        badge: "New"
    },
    {
        id: "Afro-jersey-Black",
        name: "Afro Jersey (Black)",
        price: 58.00,
        category: "sweatshirt",
        images: ["../Photos/AFRODESIGN3.jpg", "../Photos/Afro Jersey back.jpg","../Photos/Afro Jersey black fit female back.jpg", "../Photos/Afro Jersey black fit male 2.jpg"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Sustainable cotton with hidden pockets",
        details: {
            "Material": "Sustainable cotton",
            "Care": "Machine wash cold"
        },
        badge: "New"
    },
    {
        id: "Afro-tee-black-culture-white",
        name: "Afro Tee (Black Culture, White)",
        price: 10.00,
        category: "sweatshirt",
        images: ["../Photos/Afro Tee White (Black culture).jpg"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Sustainable cotton with hidden pockets",
        details: {
            "Material": "Sustainable cotton",
            "Care": "Machine wash cold"
        },
        badge: "New"
    },
    {
        id: "Afro-tee-black-culture-black",
        name: "Afro Tee (Black Culture, Black)",
        price: 10.00,
        category: "sweatshirt",
        images: ["../Photos/Afro Tee Black (Black culture).jpg"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Sustainable cotton with hidden pockets",
        details: {
            "Material": "Sustainable cotton",
            "Care": "Machine wash cold"
        },
        badge: "New"
    },
    {
        id: "Afro-cap",
        name: "Afro Cap (White)",
        price: 25.00,
        category: "accessory",
        images: ["../Photos/Afro Cap WHite.jpg"],
        sizes: ["S", "M", "L", "XL","XXL"],
        description: "Comfy at the top",
        details: {
            "Material": "Sustainable cotton",
            "Care": "Machine wash cold"
        },
        badge: "New"
    },
    {
        id: "Afro-shorts",
        name: "Afro Shorts",
        price: 350.00,
        category: "pants",
        images: ["../Photos/short pants.jpg"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Classic fit with embroidered logo",
        details: {
            "Material": "Sustainable cotton",
            "Care": "Machine wash cold"
        },
        badge: "Pre Order"
    },
    {
        id: "Afro-pants-long",
        name: "Afro Pants (Long)",
        price: 350.00,
        category: "pants",
        images: ["../Photos/long pants.jpg"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Classic fit with embroidered logo",
        details: {
            "Material": "Sustainable cotton",
            "Care": "Machine wash cold"
        },
        badge: "Pre Order"

    },
    {
        id: "Afro-tee-normal-black",
        name: "Afro Tee (Normal, Black)",
        price: 300.00,
        category: "sweatshirt",
        images: ["../Photos/afro tee normal.jpg"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Sustainable with a comfy interior",
        details: {
            "Material": "Sustainable cotton",
            "Care": "Machine wash cold"
        },
        badge: "Pre Order"
    },
    {
        id: "Afro-tee-normal-white",
        name: "Afro Tee (Normal, White)",
        price: 300.00,
        category: "sweatshirt",
        images: ["../Photos/afro tee normal white.jpg"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Sustainable with a comfy interior",
        details: {
            "Material": "Sustainable cotton",
            "Care": "Machine wash cold"
        },
        badge: "Pre Order"   
    },
    // Add more products as needed
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('afroCart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

function addToCart(productId, size = "M") {
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
            description: product.description,
            quantity: 1
        });
    }

    localStorage.setItem('afroCart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} (Size: ${size}) added to cart!`);
}

// Render products dynamically
function renderProducts(filter = 'all') {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';

    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.category = product.category;

        productCard.innerHTML = `
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="product-overlay">
                    <button class="quick-view" data-product-id="${product.id}">Quick View</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="price">GH₵${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                    <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;

        productGrid.appendChild(productCard);
    });

    // Initialize all interactive elements
    setupAddToCartButtons();
    setupWishlist();
    setupQuickView();
}

// Setup quick view functionality (fixed version)
function setupQuickView() {
    const quickViewButtons = document.querySelectorAll('.quick-view');
    
    quickViewButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const productId = this.dataset.productId;
            const product = products.find(p => p.id === productId);
            
            if (!product) return;
            
            // Store product in localStorage
            localStorage.setItem('quickViewProduct', JSON.stringify(product));
            
            // Open quick view page
            window.open('quickview.html', '_self');
        });
    });
}

// Setup add to cart buttons
function setupAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.productId;
            addToCart(productId);
            
            // Visual feedback
            this.textContent = 'Added!';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
            }, 1000);
        });
    });
}

// Filter functionality
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            renderProducts(filter);
        });
    });
}

// Wishlist functionality
function setupWishlist() {
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#e63946';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        });
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    document.querySelector('.mobile-menu-btn')?.addEventListener('click', function() {
        document.querySelector('.main-nav').classList.toggle('active');
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupFilters();
    setupMobileMenu();
    updateCartCount();
});