



let cart = [];
let total = 0;
function addToCart(itemName, price) {
    const buttonClicked = event.target;
    const productContainer = buttonClicked.parentElement; 
    const quantityElement = productContainer.querySelector('.product-quantity'); 
    const quantity = parseInt(quantityElement.value); 
    const existingProductIndex = cart.findIndex(p => p.name === itemName);

    if (existingProductIndex > -1) { 
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({ name: itemName, price: price, quantity: quantity }); 
    }
    
    total += price * quantity;
    renderCart();
}
function removeFromCart(index) {
    total -= cart[index].price * cart[index].quantity;
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    
    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} (Cantidad: ${item.quantity}) - $${item.price * item.quantity}`;
       
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => removeFromCart(index);
        
        listItem.appendChild(removeButton);
        cartItems.appendChild(listItem);
    });

    totalPrice.textContent = total;
}

function finalizePurchase() {
    if(cart.length === 0) {
        alert('Tu carrito está vacío. Añade productos antes de finalizar la compra.');
        return;
    }
    alert('Compra finalizada. Gracias por tu pedido.');
    cart = []; 
    total = 0; 
    renderCart(); 
}

function filterByCategory() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const allProducts = document.querySelectorAll('.product');

    allProducts.forEach(product => {
        const productCategory = product.querySelector('.category').textContent.split(": ")[1];

        if (selectedCategory === "all" || productCategory === selectedCategory) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}
