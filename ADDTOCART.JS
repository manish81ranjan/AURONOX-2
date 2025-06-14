let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("active");
    renderCart();
  }

  function showToast(msg = "Item added to cart") {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.className = "show";
    setTimeout(() => toast.className = toast.className.replace("show", ""), 3000);
  }

  function addToCart(product) {
    const index = cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
    showToast();
  }

  function renderCart() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    container.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;
      container.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" />
          <div class="cart-item-details">
            <p><strong>${item.name}</strong></p>
            <p>₹${item.price} × ${item.quantity}</p>
            <button onclick="changeQty('${item.id}', 1)">+</button>
            <button onclick="changeQty('${item.id}', -1)">−</button>
            <button onclick="removeItem('${item.id}')">Remove</button>
          </div>
        </div>
      `;
    });

    totalEl.innerText = total;
  }

  function updateCartCount() {
    document.getElementById("cart-count").innerText =
      cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function changeQty(id, change) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
      cart[index].quantity += change;
      if (cart[index].quantity <= 0) cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCart();
    }
  }

  function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }

  updateCartCount();
  localStorage.removeItem('cart');
