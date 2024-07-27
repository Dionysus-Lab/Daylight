document.addEventListener('DOMContentLoaded', () => {
    // Add to cart functionality
    window.addToCart = function (productName, productPrice, productImage) {
        let quantity = parseInt(document.querySelector(`input[name='${productName}']`).value) || 1;
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push({ name: productName, price: productPrice, image: productImage, quantity: quantity });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert(`${productName} added to cart`);
    };

    // Checkout functionality
    window.checkout = function () {
        window.location.href = 'checkout.html';
    };

    // Display cart items on cart page
    if (document.getElementById('cart')) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let cartItemsContainer = document.querySelector('.cart-items');
        let totalPrice = 0;
        cartItems.forEach((item, index) => {
            let cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <p>${item.name}</p>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
            totalPrice += item.price * item.quantity;
        });
        let totalDiv = document.createElement('div');
        totalDiv.textContent = `Total: $${totalPrice}`;
        cartItemsContainer.appendChild(totalDiv);
    }

    // Display checkout items on checkout page
    if (document.getElementById('checkout')) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let checkoutItemsContainer = document.querySelector('.checkout-items');
        let totalPrice = 0;
        cartItems.forEach(item => {
            let checkoutItemDiv = document.createElement('div');
            checkoutItemDiv.classList.add('checkout-item');
            checkoutItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <p>${item.name}</p>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
            `;
            checkoutItemsContainer.appendChild(checkoutItemDiv);
            totalPrice += item.price * item.quantity;
        });
        document.getElementById('total-price').value = `$${totalPrice}`;

        document.getElementById('checkout-form').addEventListener('submit', function (event) {
            event.preventDefault();
            localStorage.removeItem('cartItems');
            window.location.href = 'finish-payment.html';
        });
    }

    // Handle review form submission
    if (document.getElementById('review-form')) {
        document.getElementById('review-form').addEventListener('submit', function (event) {
            event.preventDefault();
            alert('Thank you for your review!');
            window.location.href = 'index.html';
        });
    }

    // Remove item from cart
    window.removeFromCart = function (index) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        location.reload();
    };

    // Update quantity of an item in the cart
    window.updateQuantity = function (index, quantity) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems[index].quantity = parseInt(quantity);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        location.reload();
    };
});
