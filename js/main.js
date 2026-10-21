// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking a link (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Product Launch Form
const launchForm = document.getElementById('launchForm');
const launchMessage = document.getElementById('launchMessage');
const productsGrid = document.getElementById('productsGrid');

if (launchForm) {
    launchForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('productName').value.trim();
        const category = document.getElementById('productCategory').value;
        const price = document.getElementById('productPrice').value;
        const oldPrice = document.getElementById('productOldPrice').value;
        const link = document.getElementById('productLink').value.trim();
        const commission = document.getElementById('productCommission').value || '10';
        const desc = document.getElementById('productDesc').value.trim();

        if (!name || !price || !link) {
            showMessage('Please fill all required fields (*)', 'error');
            return;
        }

        // Create new product card
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-badge new">New Launch</div>
            <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop" alt="${name}">
            <div class="product-info">
                <span class="category">${category}</span>
                <h3>${name}</h3>
                <p class="price">₹${Number(price).toLocaleString('en-IN')}${oldPrice ? ` <span class="old-price">₹${Number(oldPrice).toLocaleString('en-IN')}</span>` : ''}</p>
                <p class="commission">Commission: ${commission}%</p>
                <a href="${link}" class="btn btn-buy" target="_blank" rel="noopener">Buy Now / Affiliate Link</a>
            </div>
        `;

        // Add to top of products grid
        productsGrid.insertBefore(card, productsGrid.firstChild);

        // Show success message
        showMessage(`✅ "${name}" successfully launched! Scroll up to see it in Featured Products.`, 'success');

        // Reset form
        launchForm.reset();

        // Smooth scroll to products
        setTimeout(() => {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        }, 800);
    });
}

function showMessage(text, type) {
    launchMessage.textContent = text;
    launchMessage.className = `launch-message ${type}`;

    // Hide after 5 seconds
    setTimeout(() => {
        launchMessage.style.display = 'none';
        launchMessage.className = 'launch-message';
    }, 5000);
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});