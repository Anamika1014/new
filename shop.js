const products = Array.from({ length: 30 }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    desc: "High quality electronic product",
    price: `${(Math.random() * 900 + 100).toFixed(0)}`,
    image: "https://via.placeholder.com/200x150?text=Product+" + (i + 1),
    rating: Math.floor(Math.random() * 5) + 1
  }));
  
  let currentPage = 1;
  const productsPerPage = 9;
  
  function renderProducts() {
    const container = document.getElementById("products-container");
    container.innerHTML = "";
  
    const start = (currentPage - 1) * productsPerPage;
    const currentProducts = products.slice(start, start + productsPerPage);
  
    currentProducts.forEach(prod => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <i class="fas fa-heart wishlist-btn" data-id="${prod.id}"></i>
        <img src="${prod.image}" alt="${prod.name}">
        <div class="product-info">
          <h3>${prod.name}</h3>
          <p>${prod.desc}</p>
          <div class="rating">${"★".repeat(prod.rating)}${"☆".repeat(5 - prod.rating)}</div>
          <div class="price">₹${prod.price}</div>
          <button class="cart-btn">Add to Cart</button>
        </div>
      `;
      container.appendChild(card);
    });
  
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      const id = btn.dataset.id;
      if (getWishlist().some(item => item.id == id)) {
        btn.classList.add("active");
      }
      btn.addEventListener("click", () => toggleWishlist(id));
    });
  }
  
  function toggleWishlist(id) {
    const product = products.find(p => p.id == id);
    let wishlist = getWishlist();
    const index = wishlist.findIndex(p => p.id == id);
  
    if (index >= 0) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(product);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    renderProducts();
  }
  
  function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  }
  
  document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentPage * productsPerPage < products.length) {
      currentPage++;
      updatePageIndicator();
      renderProducts();
    }
  });
  
  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePageIndicator();
      renderProducts();
    }
  });
  
  function updatePageIndicator() {
    document.getElementById("pageIndicator").textContent = currentPage;
  }
  
  renderProducts();
  updatePageIndicator();
  
// Dropdown toggle
const userDropdown = document.querySelector(".user-dropdown");
userDropdown.addEventListener("click", () => {
  userDropdown.classList.toggle("active");
});
