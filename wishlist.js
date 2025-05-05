function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function renderWishlist() {
  const tbody = document.getElementById("wishlist-body");
  const wishlist = getWishlist();
  tbody.innerHTML = "";

  if (wishlist.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Your wishlist is empty!</td></tr>`;
    return;
  }

  wishlist.forEach(prod => {
    const tr = document.createElement("tr");
    tr.innerHTML = tr.innerHTML = `
    <td><img src="${prod.image}" alt="${prod.name}" width="50"></td>
    <td>${prod.name}</td>
    <td>${prod.desc}</td>
    <td>₹${prod.price}</td>
    <td><button class="checkout-btn"><i class="fas fa-shopping-cart"></i> Checkout</button></td>
    <td><button class="remove-btn" data-id="${prod.id}"><i class="fas fa-trash"></i> Remove</button></td>
  `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => removeFromWishlist(btn.dataset.id));
  });
}

function removeFromWishlist(id) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(prod => prod.id != id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
}

// Dropdown toggle (same like shop)
const userDropdown = document.querySelector(".user-dropdown");
userDropdown.addEventListener("click", () => {
  userDropdown.classList.toggle("active");
});

renderWishlist();
