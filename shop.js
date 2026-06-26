const CART_KEY = "hirono_cart_v1";

function loadCart(){
  try{
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch(e){
    return {};
  }
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

let cart = loadCart();
let currentFilter = "showcase";
let searchTerm = "";

function buildSidebar(){
  const sidebar = document.getElementById("seriesSidebar");
  if(!sidebar) return;

  sidebar.innerHTML = `<p class="sidebar-label">Series</p>` +
    SERIES_ORDER.map(slug => {
      const active = slug === currentFilter ? " active" : "";
      return `<button type="button" class="chip${active}" data-filter="${slug}">${SERIES_INFO[slug].label}</button>`;
    }).join("");

  sidebar.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      currentFilter = chip.dataset.filter;
      searchTerm = "";
      const searchInput = document.getElementById("searchInput");
      if(searchInput) searchInput.value = "";
      buildSidebar();
      renderShop();
      document.getElementById("shop").scrollIntoView({ behavior:"smooth", block:"start" });
    });
  });
}

function renderCardList(list){
  const grid = document.getElementById("productGrid");
  if(!grid) return;

  if(list.length === 0){
    grid.innerHTML = `<p class="no-results">No figures match that search. Try a different name or series.</p>`;
    return;
  }

  grid.innerHTML = list.map((p, i) => `
    <div class="card" style="animation-delay:${i * 0.05}s">
      <div class="box">
        <img class="img-front" src="${p.img}" alt="${p.name}">
        <img class="img-back" src="${p.imgAlt}" alt="${p.name} alternate view">
      </div>
      <div class="card-body">
        <div class="card-tag">${p.tag}</div>
        <h4 class="card-name">${p.name}</h4>
        <p class="card-desc">${p.desc}</p>
        <div class="card-bottom">
          <div class="card-price">₱${p.price.toFixed(2)}</div>
          <button class="add-btn" onclick="addToCart(${p.id})">Add to bag</button>
        </div>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("touchstart", () => card.classList.add("peek"));
  });
}

function renderShop(){
  const head = document.getElementById("pageHead");
  if(!head) return;

  const term = searchTerm.trim();
  let list;

  if(term !== ""){
    const lower = term.toLowerCase();
    list = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(lower) || p.tag.toLowerCase().includes(lower)
    );
    document.getElementById("breadcrumb").innerText = "Search";
    document.getElementById("pageTitle").innerText = `Results for "${term}"`;
    document.getElementById("pageBlurb").innerText = `${list.length} figure${list.length === 1 ? "" : "s"} found.`;
  } else {
    list = currentFilter === "showcase"
      ? PRODUCTS.filter(p => p.featured)
      : PRODUCTS.filter(p => p.series === currentFilter);
    const info = SERIES_INFO[currentFilter];
    document.getElementById("breadcrumb").innerText = "Shop";
    document.getElementById("pageTitle").innerText = info.title;
    document.getElementById("pageBlurb").innerText = info.blurb;
  }

  renderCardList(list);
}

function addToCart(id){
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
  renderCart();
  showToast("Added to your bag");
}

function changeQty(id, delta){
  if(!cart[id]) return;
  cart[id] += delta;
  if(cart[id] <= 0) delete cart[id];
  saveCart(cart);
  renderCart();
}

function removeItem(id){
  delete cart[id];
  saveCart(cart);
  renderCart();
}

function renderCart(){
  const itemsEl = document.getElementById("drawerItems");
  if(!itemsEl) return;

  const ids = Object.keys(cart);
  let count = 0;
  let subtotal = 0;

  if(ids.length === 0){
    itemsEl.innerHTML = `<p class="empty-msg">Nothing here yet. Pick a box to begin.</p>`;
  } else {
    itemsEl.innerHTML = ids.map(id => {
      const p = PRODUCTS.find(p => p.id === parseInt(id));
      if(!p) return "";
      const qty = cart[id];
      count += qty;
      subtotal += p.price * qty;
      return `
        <div class="drawer-item">
          <div class="drawer-item-left">
            <div class="drawer-item-thumb"><img src="${p.img}" alt="${p.name}"></div>
            <div>
              <div class="drawer-item-name">${p.name}</div>
              <div class="drawer-item-meta">₱${p.price.toFixed(2)} each</div>
              <button class="remove-btn" onclick="removeItem(${p.id})">Remove</button>
            </div>
          </div>
          <div class="drawer-item-right">
            <div class="qty-pill">
              <button onclick="changeQty(${p.id}, -1)">−</button>
              <span>${qty}</span>
              <button onclick="changeQty(${p.id}, 1)">+</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  document.getElementById("cartCount").innerText = count;
  document.getElementById("subtotalVal").innerText = "₱" + subtotal.toFixed(2);
  document.getElementById("totalVal").innerText = "₱" + subtotal.toFixed(2);
}

function openCart(){
  document.getElementById("drawer").classList.add("open");
  document.getElementById("overlay").classList.add("open");
}

function closeCart(){
  document.getElementById("drawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("open");
}

function checkout(){
  if(Object.keys(cart).length === 0){
    showToast("Your bag is empty");
    return;
  }

  const ids = Object.keys(cart);
  let total = 0;
  const itemsEl = document.getElementById("receiptItems");

  itemsEl.innerHTML = ids.map(id => {
    const p = PRODUCTS.find(p => p.id === parseInt(id));
    if(!p) return "";
    const qty = cart[id];
    const lineTotal = p.price * qty;
    total += lineTotal;
    return `<div class="receipt-line"><span>${p.name} x${qty}</span><span>₱${lineTotal.toFixed(2)}</span></div>`;
  }).join("");

  document.getElementById("receiptTotal").innerText = "₱" + total.toFixed(2);
  document.getElementById("receiptOrderNo").innerText = "order no. " + String(Math.floor(Math.random() * 9000) + 1000);

  cart = {};
  saveCart(cart);
  renderCart();
  closeCart();
  openReceipt();
}

function openReceipt(){
  document.getElementById("receiptOverlay").classList.add("open");
}

function closeReceipt(){
  document.getElementById("receiptOverlay").classList.remove("open");
}

let toastTimer;
function showToast(msg){
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  if(page === "shop"){
    buildSidebar();
    renderShop();
    document.getElementById("searchInput").addEventListener("input", (e) => {
      searchTerm = e.target.value;
      renderShop();
    });
  } else if(page === "home"){
    renderCardList(PRODUCTS.filter(p => p.featured));
  }

  renderCart();
});