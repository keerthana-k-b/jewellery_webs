import os

# Define folders to make sure assets exist
os.makedirs("assets/images/products", exist_ok=True)
os.makedirs("assets/images/collections", exist_ok=True)
os.makedirs("assets/images/categories", exist_ok=True)
os.makedirs("assets/images/world", exist_ok=True)
os.makedirs("assets/images/reels", exist_ok=True)
os.makedirs("assets/images/gender", exist_ok=True)
os.makedirs("assets/images/experience", exist_ok=True)
os.makedirs("assets/images/banners", exist_ok=True)

# List of pages to generate and their respective templates

# 1. CATEGORY PAGES TEMPLATE (Loads dynamic grid and filter logic)
def get_category_page_html(title, category, subcategory=None, material=None):
    sub_attr = f'data-subcategory="{subcategory}"' if subcategory else ''
    mat_attr = f'data-material="{material}"' if material else ''
    
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Aurelia Fine Jewellery</title>
  <link rel="icon" type="image/png" href="assets/images/aurelia_logo.png">
  <link rel="stylesheet" href="styles.css?v=1.1">
</head>
<body>

  <div id="header-container"></div>

  <main class="container">
    <div class="section-spacer" style="margin-bottom: 20px;">
      <div class="section-title-wrapper" style="text-align: left; border-bottom: 1px solid var(--border-light); padding-bottom: 20px;">
        <h1 class="section-title" style="font-size: 42px;">{title}</h1>
        <p class="section-subtitle">Exquisite designs curated for you</p>
      </div>
    </div>

    <!-- Category Rendering Root -->
    <div class="category-page-container" id="category-page-root" data-category="{category}" {sub_attr} {mat_attr}>
      <!-- Sidebar Filters -->
      <aside class="filter-sidebar">
        <div class="filter-group">
          <h4>Metal Color</h4>
          <div class="filter-options">
            <label class="filter-checkbox-label">
              <input type="checkbox" class="filter-checkbox-input filter-material" value="Yellow Gold"> Yellow Gold
            </label>
            <label class="filter-checkbox-label">
              <input type="checkbox" class="filter-checkbox-input filter-material" value="Rose Gold"> Rose Gold
            </label>
            <label class="filter-checkbox-label">
              <input type="checkbox" class="filter-checkbox-input filter-material" value="White Gold"> White Gold
            </label>
            <label class="filter-checkbox-label">
              <input type="checkbox" class="filter-checkbox-input filter-material" value="Platinum"> Platinum
            </label>
          </div>
        </div>

        <div class="filter-group">
          <h4>Price Range</h4>
          <div class="filter-options">
            <label class="filter-checkbox-label">
              <input type="checkbox" class="filter-checkbox-input filter-price" value="under-25k"> Under ₹25,000
            </label>
            <label class="filter-checkbox-label">
              <input type="checkbox" class="filter-checkbox-input filter-price" value="25k-50k"> ₹25,000 - ₹50,000
            </label>
            <label class="filter-checkbox-label">
              <input type="checkbox" class="filter-checkbox-input filter-price" value="above-50k"> Above ₹50,000
            </label>
          </div>
        </div>
      </aside>

      <!-- Products Grid Main -->
      <section>
        <div class="grid-top-bar">
          <span class="grid-top-bar-count" id="category-product-count">0 items found</span>
          <div class="grid-top-bar-controls">
            <div class="grid-layout-buttons">
              <span class="grid-layout-btn active" id="layout-grid-btn">Grid</span>
              <span class="grid-layout-btn" id="layout-list-btn">List</span>
            </div>
            <div>
              <label for="category-sort" style="font-size:12px; margin-right:8px; font-weight:600;">Sort By</label>
              <select id="category-sort" class="sort-select">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        <div class="products-grid-layout" id="category-grid-items">
          <!-- Injected dynamically by script.js -->
        </div>
      </section>
    </div>
  </main>

  <div id="footer-container"></div>

  <script src="assets/data/products.js"></script>
  <script src="script.js"></script>
  <script>
    // Grid list view toggle helper
    document.getElementById("layout-list-btn").addEventListener("click", () => {{
      document.getElementById("category-grid-items").classList.add("list-view");
      document.getElementById("layout-list-btn").classList.add("active");
      document.getElementById("layout-grid-btn").classList.remove("active");
    }});
    document.getElementById("layout-grid-btn").addEventListener("click", () => {{
      document.getElementById("category-grid-items").classList.remove("list-view");
      document.getElementById("layout-grid-btn").classList.add("active");
      document.getElementById("layout-list-btn").classList.remove("active");
    }});
  </script>
</body>
</html>"""


# 2. PRODUCT DETAILS PAGE TEMPLATE (Loads gallery, zoom, pricing details, reviews)
def get_product_details_html():
    return """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jewellery Details | Aurelia Fine Jewellery</title>
  <link rel="icon" type="image/png" href="assets/images/aurelia_logo.png">
  <link rel="stylesheet" href="styles.css?v=1.1">
</head>
<body>

  <div id="header-container"></div>

  <main class="container">
    <div class="product-details-container" id="product-details-root">
      
      <!-- Gallery Left -->
      <section class="product-gallery-section">
        <div class="product-gallery-thumbnails">
          <img class="thumbnail-img active" src="" alt="View 1" onerror="this.src='data:image/svg+xml;utf8,<svg width=\\'70\\' height=\\'70\\'></svg>'">
          <img class="thumbnail-img" src="" alt="View 2" onerror="this.src='data:image/svg+xml;utf8,<svg width=\\'70\\' height=\\'70\\'></svg>'">
          <img class="thumbnail-img" src="" alt="View 3" onerror="this.src='data:image/svg+xml;utf8,<svg width=\\'70\\' height=\\'70\\'></svg>'">
        </div>
        <div class="product-gallery-main">
          <img id="det-main-img" src="" alt="Main Image">
        </div>
      </section>

      <!-- Meta Info Right -->
      <section>
        <span class="product-meta-sku" id="det-sku">SKU-00000</span>
        <h1 class="product-meta-title" id="det-title">Loading Product Title...</h1>
        
        <div class="product-meta-rating">
          <span class="stars">★★★★★</span>
          <span id="det-reviews-count">(0 reviews)</span>
        </div>

        <div class="product-meta-price-box">
          <span class="detail-price" id="det-price">₹0</span>
          <span class="detail-original-price" id="det-original-price">₹0</span>
          <span class="badge badge-offer" id="det-offer-badge" style="background-color:#E25C5C; color:white;">0% OFF</span>
          <br>
          <span class="price-breakdown-btn" id="price-breakdown-trigger">View Detailed Price Breakdown & Taxes</span>
        </div>

        <p class="product-description" id="det-description" style="color:var(--text-muted); margin-bottom: 24px; font-size:14px;"></p>

        <!-- Variant Configurator Selectors -->
        <div class="variant-selector-group">
          <h5>Metal Type</h5>
          <div class="variant-options">
            <button class="variant-option-btn metal-option active" data-value="18KT Yellow Gold">18KT Gold</button>
            <button class="variant-option-btn metal-option" data-value="22KT Gold">22KT Gold</button>
            <button class="variant-option-btn metal-option" data-value="18KT Rose Gold">Rose Gold</button>
            <button class="variant-option-btn metal-option" data-value="Platinum">Platinum</button>
          </div>
        </div>

        <div class="variant-selector-group">
          <h5>Ring Size (Standard Indian)</h5>
          <div class="variant-options">
            <button class="variant-option-btn size-option" data-value="10">10</button>
            <button class="variant-option-btn size-option active" data-value="12">12</button>
            <button class="variant-option-btn size-option" data-value="14">14</button>
            <button class="variant-option-btn size-option" data-value="16">16</button>
          </div>
        </div>

        <!-- Pincode Checker -->
        <div class="pincode-checker-box">
          <h5>Check Delivery Availability</h5>
          <div class="pincode-checker-input-wrap">
            <input type="text" placeholder="Enter 6-digit Pincode" id="pincode-input" maxlength="6">
            <button class="btn btn-primary" id="pincode-btn">Check</button>
          </div>
          <div id="pincode-status" style="margin-top:10px; font-size:12px;"></div>
        </div>

        <!-- Add Actions -->
        <div style="display:flex; gap:16px;">
          <button class="btn btn-primary" id="det-buy-btn" style="flex:1; padding:16px;">Add To Shopping Bag</button>
          <button class="btn btn-secondary" onclick="alert('Product added to Compare queue!')" style="padding:16px;">Compare</button>
        </div>
      </section>
    </div>

    <!-- Specs & Reviews Tabs -->
    <div class="product-tabs-wrapper">
      <div class="tabs-nav">
        <button class="tab-nav-btn active" data-target="spec-panel">Product Specifications</button>
        <button class="tab-nav-btn" data-target="review-panel">Reviews & Ratings</button>
      </div>
      <div class="tab-panel active" id="spec-panel">
        <table class="spec-table">
          <tbody id="spec-table-body">
            <!-- Injected by script.js -->
          </tbody>
        </table>
      </div>
      <div class="tab-panel" id="review-panel">
        <div id="reviews-list-container">
          <!-- Injected by script.js -->
        </div>
      </div>
    </div>
  </main>

  <div id="footer-container"></div>

  <script src="assets/data/products.js"></script>
  <script src="script.js"></script>
</body>
</html>"""


# 3. SHOPPING / CART PAGES
def get_cart_html():
    return """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shopping Bag | Aurelia Fine Jewellery</title>
  <link rel="icon" type="image/png" href="assets/images/aurelia_logo.png">
  <link rel="stylesheet" href="styles.css?v=1.1">
</head>
<body>
  <div id="header-container"></div>

  <main class="container">
    <div class="section-spacer">
      <div class="section-title-wrapper" style="text-align:left;">
        <h1 class="section-title">My Shopping Bag</h1>
      </div>

      <div style="display:grid; grid-template-columns: 1.3fr 0.7fr; gap:40px; margin-top:30px;">
        <div id="cart-page-list-container" style="background-color:white; border-radius:var(--radius-lg); border:1px solid var(--border-light); padding:24px;">
          <!-- Injected dynamically -->
        </div>

        <div style="background-color:white; border-radius:var(--radius-lg); border:1px solid var(--border-light); padding:24px; height:max-content;">
          <h3 style="font-size:20px; font-weight:600; margin-bottom:20px; border-bottom:1px solid var(--border-light); padding-bottom:10px;">Order Summary</h3>
          <div style="display:flex; justify-content:space-between; margin-bottom:12px; color:var(--text-muted);">
            <span>Bag Subtotal</span>
            <strong id="cart-summary-subtotal">₹0</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:12px; color:var(--text-muted);">
            <span>Shipping & Delivery</span>
            <strong style="color:var(--brand-teal);">FREE</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:20px; color:var(--text-muted); border-bottom:1px solid var(--border-light); padding-bottom:15px;">
            <span>Estimated GST (3%)</span>
            <strong id="cart-summary-gst">₹0</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:25px; font-size:18px; font-weight:700;">
            <span>Total Payable</span>
            <strong id="cart-summary-total" style="color:var(--brand-maroon);">₹0</strong>
          </div>
          <a href="checkout.html" class="btn btn-primary" style="width:100%; padding:14px;">Proceed to Secure Checkout</a>
        </div>
      </div>
    </div>
  </main>

  <div id="footer-container"></div>

  <script src="assets/data/products.js"></script>
  <script src="script.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      renderCartPage();
    });

    function renderCartPage() {
      const container = document.getElementById("cart-page-list-container");
      const subtotalEl = document.getElementById("cart-summary-subtotal");
      const gstEl = document.getElementById("cart-summary-gst");
      const totalEl = document.getElementById("cart-summary-total");
      
      const cartItems = JSON.parse(localStorage.getItem("aurelia_cart")) || [];

      if (cartItems.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:50px 0; color:var(--text-muted);">
            <p style="font-size:48px; margin-bottom:15px;">🛍️</p>
            <p>Your shopping bag is empty.</p>
            <a href="collections.html" class="btn btn-primary" style="margin-top:20px;">Continue Shopping</a>
          </div>
        `;
        subtotalEl.textContent = "₹0";
        gstEl.textContent = "₹0";
        totalEl.textContent = "₹0";
        return;
      }

      container.innerHTML = cartItems.map(item => {
        const prod = window.products.find(p => p.id === item.productId);
        if (!prod) return "";
        return `
          <div class="cart-drawer-item" style="padding:24px 0; align-items:center;">
            <img src="${prod.image}" alt="${prod.name}" style="width:90px; height:90px;">
            <div class="cart-drawer-item-info">
              <h5 style="font-size:18px; font-weight:600;">${prod.name}</h5>
              <p>${item.metal || "18KT Yellow Gold"} | Ring Size: ${item.size || "12"}</p>
              <div style="font-size:16px; font-weight:700; color:var(--brand-maroon); margin-top:8px;">₹${(prod.price * item.quantity).toLocaleString("en-IN")}</div>
              <div class="cart-drawer-item-controls" style="margin-top:12px; width:220px;">
                <div class="quantity-selector">
                  <button class="quantity-btn" onclick="updateCartPageQty(${prod.id}, -1)">-</button>
                  <input type="text" value="${item.quantity}" class="quantity-input" readonly>
                  <button class="quantity-btn" onclick="updateCartPageQty(${prod.id}, 1)">+</button>
                </div>
                <button class="cart-remove-btn" onclick="removeFromCartPage(${prod.id})">Remove Item</button>
              </div>
            </div>
          </div>
        `;
      }).join("");

      const subtotal = cartItems.reduce((sum, item) => {
        const prod = window.products.find(p => p.id === item.productId);
        return sum + (prod ? prod.price * item.quantity : 0);
      }, 0);

      const gst = Math.round(subtotal * 0.03);
      const total = subtotal + gst;

      subtotalEl.textContent = "₹" + subtotal.toLocaleString("en-IN");
      gstEl.textContent = "₹" + gst.toLocaleString("en-IN");
      totalEl.textContent = "₹" + total.toLocaleString("en-IN");
    }

    window.updateCartPageQty = function(productId, delta) {
      window.updateCartQty(productId, delta);
      renderCartPage();
    };

    window.removeFromCartPage = function(productId) {
      window.removeFromCart(productId);
      renderCartPage();
    };
  </script>
</body>
</html>"""


# 4. WISHLIST PAGE
def get_wishlist_html():
    return """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Wishlist | Aurelia Fine Jewellery</title>
  <link rel="icon" type="image/png" href="assets/images/aurelia_logo.png">
  <link rel="stylesheet" href="styles.css?v=1.1">
</head>
<body>
  <div id="header-container"></div>

  <main class="container">
    <div class="section-spacer">
      <div class="section-title-wrapper" style="text-align:left; border-bottom:1px solid var(--border-light); padding-bottom:20px;">
        <h1 class="section-title">My Wishlist</h1>
        <p class="section-subtitle">Designs saved for your future orders</p>
      </div>

      <div class="products-grid-layout" id="wishlist-page-grid" style="margin-top:30px;">
        <!-- Dynamic cards injected here -->
      </div>
    </div>
  </main>

  <div id="footer-container"></div>

  <script src="assets/data/products.js"></script>
  <script src="script.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      renderWishlistPage();
    });

    function renderWishlistPage() {
      const container = document.getElementById("wishlist-page-grid");
      if (!container) return;

      const wishlistItems = JSON.parse(localStorage.getItem("aurelia_wishlist")) || [];

      if (wishlistItems.length === 0) {
        container.style.gridTemplateColumns = "1fr";
        container.innerHTML = `
          <div style="text-align:center; padding:80px 0; color:var(--text-muted);">
            <p style="font-size:48px; margin-bottom:15px;">🤍</p>
            <p>You have no saved items in your wishlist.</p>
            <a href="collections.html" class="btn btn-primary" style="margin-top:20px;">Explore Products</a>
          </div>
        `;
        return;
      }

      container.style.gridTemplateColumns = "repeat(4, 1fr)";
      container.innerHTML = wishlistItems.map(productId => {
        const p = window.products.find(item => item.id === productId);
        if (!p) return "";
        return `
          <div class="product-card">
            <div class="product-card-img-wrap">
              <a href="product-details.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a>
              <button class="product-card-wishlist-btn active" onclick="removeFromWishlistPage(${p.id})">
                <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </button>
            </div>
            <div class="product-card-info">
              <span class="product-card-sku">${p.sku}</span>
              <h4 class="product-card-name">${p.name}</h4>
              <div class="product-card-price-row">
                <span class="product-card-price">₹${p.price.toLocaleString("en-IN")}</span>
              </div>
              <div style="display:flex; gap:10px; margin-top:15px;">
                <button class="btn btn-primary" onclick="moveToBagPage(${p.id})" style="flex:1; font-size:10px; padding:8px 0;">Add to Bag</button>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }

    window.removeFromWishlistPage = function(productId) {
      window.removeFromWishlist(productId);
      renderWishlistPage();
    };

    window.moveToBagPage = function(productId) {
      window.moveToCart(productId);
      window.removeFromWishlist(productId);
      renderWishlistPage();
    };
  </script>
</body>
</html>"""


# 5. CHECKOUT PAGE
def get_checkout_html():
    return """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Secure Checkout | Aurelia Fine Jewellery</title>
  <link rel="icon" type="image/png" href="assets/images/aurelia_logo.png">
  <link rel="stylesheet" href="styles.css?v=1.1">
</head>
<body>
  <div id="header-container"></div>

  <main class="container">
    <div class="checkout-layout" id="checkout-root">
      
      <!-- Left side wizard steps -->
      <section class="checkout-steps-wrapper">
        <div class="checkout-tabs">
          <div class="checkout-tab-step active" id="step-tab-0">
            <div class="step-number">1</div>
            <span class="step-label">Shipping</span>
          </div>
          <div class="checkout-tab-step" id="step-tab-1">
            <div class="step-number">2</div>
            <span class="step-label">Billing</span>
          </div>
          <div class="checkout-tab-step" id="step-tab-2">
            <div class="step-number">3</div>
            <span class="step-label">Payment</span>
          </div>
        </div>

        <!-- Step 1 Shipping Panel -->
        <div class="checkout-step-panel active" id="step-panel-0">
          <h3 style="font-size:24px; font-weight:600; margin-bottom:20px;">Shipping Address</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>First Name</label>
              <input type="text" placeholder="John" required>
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Doe" required>
            </div>
            <div class="form-group form-full">
              <label>Street Address</label>
              <input type="text" placeholder="House no, Building, Street name" required>
            </div>
            <div class="form-group">
              <label>Pincode</label>
              <input type="text" placeholder="400001" required>
            </div>
            <div class="form-group">
              <label>City</label>
              <input type="text" placeholder="Mumbai" required>
            </div>
            <div class="form-group">
              <label>State</label>
              <input type="text" placeholder="Maharashtra" required>
            </div>
            <div class="form-group">
              <label>Mobile Phone Number</label>
              <input type="tel" placeholder="+91 98765 43210" required>
            </div>
          </div>
          <div class="form-actions">
            <span></span>
            <button class="btn btn-primary checkout-next-btn" data-next-step="1">Continue to Billing</button>
          </div>
        </div>

        <!-- Step 2 Billing Panel -->
        <div class="checkout-step-panel" id="step-panel-1">
          <h3 style="font-size:24px; font-weight:600; margin-bottom:20px;">Billing Address</h3>
          <label style="display:flex; align-items:center; gap:10px; margin-bottom:20px; font-size:13px; cursor:pointer;">
            <input type="checkbox" checked onchange="document.getElementById('billing-form-wrapper').style.display = this.checked ? 'none' : 'block'"> Same as Shipping Address
          </label>
          <div class="form-grid" id="billing-form-wrapper" style="display:none;">
            <div class="form-group form-full">
              <label>Billing Address</label>
              <input type="text" placeholder="Enter billing address">
            </div>
          </div>
          <div class="form-actions">
            <button class="btn btn-secondary checkout-prev-btn" data-prev-step="0">Back to Shipping</button>
            <button class="btn btn-primary checkout-next-btn" data-next-step="2">Continue to Payment</button>
          </div>
        </div>

        <!-- Step 3 Payment Panel -->
        <div class="checkout-step-panel" id="step-panel-2">
          <h3 style="font-size:24px; font-weight:600; margin-bottom:20px;">Secure Payment Options</h3>
          <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:30px;">
            <label style="border:1px solid var(--border-light); padding:16px; border-radius:var(--radius-md); display:flex; align-items:center; gap:15px; cursor:pointer;">
              <input type="radio" name="payment_method" checked>
              <strong>Credit / Debit Card (100% Insured Gateway)</strong>
            </label>
            <label style="border:1px solid var(--border-light); padding:16px; border-radius:var(--radius-md); display:flex; align-items:center; gap:15px; cursor:pointer;">
              <input type="radio" name="payment_method">
              <strong>Net Banking / UPI Options</strong>
            </label>
            <label style="border:1px solid var(--border-light); padding:16px; border-radius:var(--radius-md); display:flex; align-items:center; gap:15px; cursor:pointer;">
              <input type="radio" name="payment_method">
              <strong>Easy Monthly EMI Schemes</strong>
            </label>
          </div>
          <div class="form-actions">
            <button class="btn btn-secondary checkout-prev-btn" data-prev-step="1">Back to Billing</button>
            <button class="btn btn-primary checkout-next-btn" data-next-step="3" style="background-color:var(--brand-teal);">Authorize Payment</button>
          </div>
        </div>
      </section>

      <!-- Right side summary review -->
      <section style="background-color:white; border-radius:var(--radius-lg); border:1px solid var(--border-light); padding:32px; height:max-content;">
        <h3 style="font-size:20px; font-weight:600; margin-bottom:20px; border-bottom:1px solid var(--border-light); padding-bottom:10px;">Order Details</h3>
        <div id="checkout-sidebar-items-list" style="margin-bottom:20px;">
          <!-- Items will list here -->
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:13px; color:var(--text-muted);">
          <span>Delivery Charges</span>
          <span style="color:var(--brand-teal);">FREE</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:18px; font-weight:700; margin-top:20px; border-top:1px solid var(--border-light); padding-top:15px;">
          <span>Grand Total</span>
          <span id="checkout-grand-total">₹0</span>
        </div>
      </section>
    </div>
  </main>

  <div id="footer-container"></div>

  <script src="assets/data/products.js"></script>
  <script src="script.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const listEl = document.getElementById("checkout-sidebar-items-list");
      const totalEl = document.getElementById("checkout-grand-total");
      
      const cartItems = JSON.parse(localStorage.getItem("aurelia_cart")) || [];
      if (cartItems.length === 0) {
        listEl.innerHTML = `<p style="color:var(--text-muted);">No items in cart.</p>`;
        return;
      }

      listEl.innerHTML = cartItems.map(item => {
        const prod = window.products.find(p => p.id === item.productId);
        if (!prod) return "";
        return `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; font-size:13px;">
            <span>${prod.name} <strong>x${item.quantity}</strong></span>
            <span>₹${(prod.price * item.quantity).toLocaleString("en-IN")}</span>
          </div>
        `;
      }).join("");

      const subtotal = cartItems.reduce((sum, item) => {
        const prod = window.products.find(p => p.id === item.productId);
        return sum + (prod ? prod.price * item.quantity : 0);
      }, 0);
      
      const tax = Math.round(subtotal * 0.03);
      totalEl.textContent = "₹" + (subtotal + tax).toLocaleString("en-IN");
    });
  </script>
</body>
</html>"""


# 6. MOCK PAGES GENERATOR FUNCTION (Used for basic visual forms, articles, support)
def get_mock_page_html(title, desc_headline, content_body):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Aurelia Fine Jewellery</title>
  <link rel="icon" type="image/png" href="assets/images/aurelia_logo.png">
  <link rel="stylesheet" href="styles.css?v=1.1">
</head>
<body>
  <div id="header-container"></div>

  <main class="container">
    <div class="section-spacer" style="max-width:800px; margin: 60px auto;">
      <div class="section-title-wrapper" style="text-align:left; border-bottom:1px solid var(--border-light); padding-bottom:20px; margin-bottom:30px;">
        <h1 class="section-title" style="font-size:48px;">{title}</h1>
        <p class="section-subtitle" style="font-size:18px; line-height:1.4; margin-top:10px; color:var(--brand-gold-dark); font-family:var(--font-heading); font-style:italic;">{desc_headline}</p>
      </div>

      <div style="font-size:15px; line-height:1.8; color:var(--text-dark);">
        {content_body}
      </div>
    </div>
  </main>

  <div id="footer-container"></div>

  <script src="assets/data/products.js"></script>
  <script src="script.js"></script>
</body>
</html>"""


# Define list of pages and write
pages_configs = [
    # Category landing lists
    ("collections.html", get_category_page_html("All Jewellery Collections", "all")),
    ("gold-jewellery.html", get_category_page_html("Gold Jewellery Collection", "all", material="Gold")),
    ("diamond-jewellery.html", get_category_page_html("Diamond Jewellery Collection", "all", material="Diamond")),
    ("earrings.html", get_category_page_html("Exquisite Earrings", "earrings")),
    ("rings.html", get_category_page_html("Timeless Rings", "rings")),
    ("necklaces.html", get_category_page_html("Imperial Necklaces", "necklaces")),
    ("pendants.html", get_category_page_html("Celeste Pendants", "pendants")),
    ("bangles.html", get_category_page_html("Ornate Bangles", "bangles")),
    ("bracelets.html", get_category_page_html("Graceful Bracelets", "bracelets")),
    ("chains.html", get_category_page_html("Sleek Gold Chains", "chains")),
    ("mangalsutra.html", get_category_page_html("Sacred Mangalsutra", "mangalsutra")),
    ("engagement-rings.html", get_category_page_html("Solitaire Engagement Rings", "rings", subcategory="engagement-rings")),
    ("bridal-rings.html", get_category_page_html("Bridal Rings Collection", "rings", subcategory="bridal-collection")),
    ("solitaire-rings.html", get_category_page_html("Elite Solitaire Rings", "rings", subcategory="solitaire-rings")),
    ("diamond-necklaces.html", get_category_page_html("Diamond Necklaces", "necklaces", material="Diamond")),
    ("diamond-earrings.html", get_category_page_html("Diamond Earrings", "earrings", material="Diamond")),
    ("diamond-pendants.html", get_category_page_html("Diamond Pendants", "pendants", material="Diamond")),
    ("gold-rings.html", get_category_page_html("Everyday Gold Rings", "rings", material="Gold")),
    ("gold-earrings.html", get_category_page_html("Pure Gold Earrings", "earrings", material="Gold")),
    ("gold-necklaces.html", get_category_page_html("Traditional Gold Necklaces", "necklaces", material="Gold")),
    ("new-arrivals.html", get_category_page_html("New Arrivals", "all", subcategory="trending-now")),
    ("trending-now.html", get_category_page_html("Trending Now Collection", "all", subcategory="trending-now")),
    ("bridal-collection.html", get_category_page_html("The Grand Bridal Suite", "all", subcategory="bridal-collection")),
    ("gifting.html", get_category_page_html("The Aurelia Gifting Suite", "all", subcategory="gifting")),
    ("gift-under-25000.html", get_category_page_html("Luxury Gifts Under ₹25,000", "all", subcategory="gift-under-25000")),
    ("gift-under-50000.html", get_category_page_html("Luxury Gifts Under ₹50,000", "all", subcategory="gift-under-50000")),
    ("category-grid.html", get_category_page_html("All Jewellery Grid", "all")),
    ("category-list.html", get_category_page_html("All Jewellery Listing", "all")),
    ("search-results.html", get_category_page_html("Search Results", "all")),

    # Core Detail layout page
    ("product-details.html", get_product_details_html()),
    ("product-quick-view.html", get_product_details_html()),

    # Shopping layouts
    ("cart.html", get_cart_html()),
    ("wishlist.html", get_wishlist_html()),
    ("checkout.html", get_checkout_html()),
    
    # Success template
    ("order-success.html", get_mock_page_html(
        "Order Confirmed!",
        "Thank you for purchasing from Aurelia Fine Jewellery.",
        """
        <div style="text-align:center; padding: 40px 0;">
          <p style="font-size:60px; margin-bottom:20px; color:var(--brand-teal);">✓</p>
          <h3 style="font-size:24px; font-weight:600; margin-bottom:10px;">Your Order #AR-2026-98431 is Confirmed!</h3>
          <p style="color:var(--text-muted); margin-bottom:30px;">A receipt has been sent to your email. Your gold shipment is 100% insured and will ship within 48 hours.</p>
          <a href="index.html" class="btn btn-primary">Continue Shopping</a>
        </div>
        """
    )),

    # Authenticate layouts
    ("login.html", get_mock_page_html(
        "Secure Login",
        "Sign in to access your orders, wishlist, and digital gold account",
        """
        <form style="max-width:400px; margin:0 auto; display:flex; flex-direction:column; gap:20px;" onsubmit="event.preventDefault(); alert('Logged in securely!'); window.location.href='my-account.html';">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="email@address.com" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required>
          </div>
          <p style="text-align:right; font-size:12px;"><a href="forgot-password.html" style="color:var(--brand-gold-dark);">Forgot Password?</a></p>
          <button type="submit" class="btn btn-primary">Login Account</button>
          <p style="text-align:center; font-size:13px; margin-top:10px;">New customer? <a href="register.html" style="color:var(--brand-maroon); font-weight:600;">Register Here</a></p>
        </form>
        """
    )),
    ("register.html", get_mock_page_html(
        "Register Account",
        "Create an account to join the Aurelia Circle Rewards program",
        """
        <form style="max-width:500px; margin:0 auto; display:flex; flex-direction:column; gap:20px;" onsubmit="event.preventDefault(); alert('Account registered!'); window.location.href='my-account.html';">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required>
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="email@address.com" required>
          </div>
          <div class="form-group">
            <label>Mobile Number</label>
            <input type="tel" placeholder="+91 99999 99999" required>
          </div>
          <div class="form-group">
            <label>Create Password</label>
            <input type="password" placeholder="••••••••" required>
          </div>
          <button type="submit" class="btn btn-primary">Create Account</button>
          <p style="text-align:center; font-size:13px; margin-top:10px;">Already have an account? <a href="login.html" style="color:var(--brand-maroon); font-weight:600;">Login here</a></p>
        </form>
        """
    )),
    ("forgot-password.html", get_mock_page_html(
        "Reset Password",
        "We will send you a secure link to recover your account credentials",
        """
        <form style="max-width:400px; margin:0 auto; display:flex; flex-direction:column; gap:20px;" onsubmit="event.preventDefault(); alert('Recovery link sent!'); window.location.href='login.html';">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="email@address.com" required>
          </div>
          <button type="submit" class="btn btn-primary">Send Secure Link</button>
        </form>
        """
    )),

    # Customer Center Layouts
    ("my-account.html", get_mock_page_html(
        "My Dashboard",
        "Manage your orders, profile, and digital gold portfolio",
        """
        <div style="display:grid; grid-template-columns: 200px 1fr; gap:40px;">
          <aside style="border-right:1px solid var(--border-light); padding-right:20px;">
            <ul style="display:flex; flex-direction:column; gap:16px; font-weight:600;">
              <li><a href="my-account.html" style="color:var(--brand-maroon)">Overview</a></li>
              <li><a href="my-orders.html">My Orders</a></li>
              <li><a href="addresses.html">Address Book</a></li>
              <li><a href="profile.html">Edit Profile</a></li>
              <li><a href="invest-in-gold.html">Digital Gold Ledger</a></li>
              <li><a href="login.html" style="color:#E25C5C;">Logout</a></li>
            </ul>
          </aside>
          <div>
            <h3>Welcome back, Vikram Malhotra!</h3>
            <p style="color:var(--text-muted); margin-bottom:30px;">Aurelia Circle Tier: <strong>Gold Elite Club</strong></p>
            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px;">
              <div style="border:1px solid var(--border-light); padding:20px; border-radius:var(--radius-md); text-align:center;">
                <h5>Active Orders</h5>
                <p style="font-size:28px; font-weight:700; color:var(--brand-maroon);">1</p>
              </div>
              <div style="border:1px solid var(--border-light); padding:20px; border-radius:var(--radius-md); text-align:center;">
                <h5>Saved Designs</h5>
                <p style="font-size:28px; font-weight:700; color:var(--brand-maroon);">4</p>
              </div>
              <div style="border:1px solid var(--border-light); padding:20px; border-radius:var(--radius-md); text-align:center;">
                <h5>Digital Gold</h5>
                <p style="font-size:28px; font-weight:700; color:var(--brand-teal);">1.45g</p>
              </div>
            </div>
          </div>
        </div>
        """
    )),
    ("my-orders.html", get_mock_page_html(
        "Order History",
        "View past transactions and track gold delivery statuses",
        """
        <div style="border:1px solid var(--border-light); border-radius:var(--radius-md); padding:24px; background-color:white; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="color:var(--brand-maroon);">Order #AR-2026-98431</strong>
            <p style="font-size:12px; color:var(--text-muted); margin-top:4px;">Placed on: 12th June, 2026 | Total: ₹88,579</p>
          </div>
          <span class="badge" style="background-color:var(--brand-teal); color:white;">In Transit</span>
          <a href="order-details.html" class="btn btn-secondary" style="font-size:11px; padding:6px 14px;">View Details</a>
        </div>
        """
    )),
    ("order-details.html", get_mock_page_html(
        "Order Summary Details",
        "Complete itemization, invoicing, and carrier delivery details",
        """
        <h3>Order #AR-2026-98431</h3>
        <p style="color:var(--text-muted); margin-bottom:20px;">Carrier: Blue Dart Secured Gold Courier | AWB: BD9024103</p>
        <table class="spec-table" style="margin-top:20px;">
          <tr><td>Classic Diamond Halo Solitaire Ring</td><td style="text-align:right;">₹85,999</td></tr>
          <tr><td>GST (3%)</td><td style="text-align:right;">₹2,580</td></tr>
          <tr style="font-weight:700; color:var(--brand-maroon);"><td>Total Paid</td><td style="text-align:right;">₹88,579</td></tr>
        </table>
        """
    )),
    ("addresses.html", get_mock_page_html(
        "Address Book",
        "Manage shipping and billing addresses for faster checkout experiences",
        """
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
          <div style="border:1px solid var(--border-light); padding:20px; border-radius:var(--radius-md); position:relative;">
            <span class="badge" style="background-color:var(--brand-maroon); color:white; position:absolute; top:15px; right:15px;">Primary</span>
            <strong>Vikram Malhotra</strong>
            <p style="font-size:13px; color:var(--text-muted); margin-top:8px;">Flat 402, Sunset Heights, Bandra West<br>Mumbai, Maharashtra - 400050<br>India</p>
          </div>
          <div style="border:1px dashed var(--brand-gold-light); padding:20px; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <strong style="color:var(--brand-gold-dark);">+ Add New Address</strong>
          </div>
        </div>
        """
    )),
    ("profile.html", get_mock_page_html(
        "Edit Profile Details",
        "Update security credentials, mobile phone numbers, and notification settings",
        """
        <form style="max-width:500px; display:flex; flex-direction:column; gap:20px;" onsubmit="event.preventDefault(); alert('Profile Saved!')">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" value="Vikram Malhotra">
          </div>
          <div class="form-group">
            <label>Mobile Number</label>
            <input type="tel" value="+91 98765 43210">
          </div>
          <div class="form-group">
            <label>Birthday</label>
            <input type="date" value="1994-08-25">
          </div>
          <button type="submit" class="btn btn-primary" style="width:max-content;">Save Changes</button>
        </form>
        """
    )),

    # Brand pages
    ("about-us.html", get_mock_page_html(
        "About Aurelia",
        "A legacy of trust, artistic excellence, and luxurious jewellery designs",
        """
        <p>Aurelia Fine Jewellery, a proud TATA Enterprise, was founded with a singular vision: to create exquisite ornaments that merge India's majestic heritage craftsmanship with modern global designs. For decades, we have been the ultimate symbol of trust, quality, and celebration in millions of households.</p>
        <p style="margin-top:20px;">Every single gemstone is conflict-free, every diamond is GIA/IGI certified, and every gram of gold is hallmarked by the Bureau of Indian Standards (BIS) to ensure you carry only pure excellence.</p>
        """
    )),
    ("craftsmanship.html", get_mock_page_html(
        "The Art of Craftsmanship",
        "Celebrating the Karigars who transform raw gold into poetry",
        """
        <p>At Aurelia, the heart of our jewellery lies in the hands of our Karigars (master craftspeople). Representing generations of heritage, they use age-old metalworking methods like filigree, Kundan settings, and antique etching alongside high-precision modern machinery to bring detailed drawings to life.</p>
        <p style="margin-top:20px;">It takes up to 100 hours of detailed work to craft a single choker set, ensuring each piece is a unique artwork ready to be cherished for generations.</p>
        """
    )),
    ("assurance.html", get_mock_page_html(
        "Tanishq Assurance Plan",
        "Ten points of trust that define gold purchasing transparency",
        """
        <p>Our Assurance policy is built on complete transparency and absolute quality. When you purchase from Aurelia, you receive:
        <ul style="margin-top:20px; padding-left:20px; display:flex; flex-direction:column; gap:12px;">
          <li>✓ State-of-the-art Karatmeter purity check at every store.</li>
          <li>✓ Brand new, custom-boxed designs never worn before.</li>
          <li>✓ Transparent pricing structure based on real-time gold rates.</li>
          <li>✓ Insured door-to-door delivery in steel-lined transport cases.</li>
        </ul>
        </p>
        """
    )),
    ("exchange-program.html", get_mock_page_html(
        "Lifetime Exchange & Buyback",
        "Maximize value with our highly customer-centric exchange program",
        """
        <p>Jewellery is an investment. Our Lifetime Exchange policy allows you to trade in your old gold or diamond jewellery for our latest designs at modern gold rates, charging minimal melting loss fees. We assure you get 100% of the purity value of your assets.</p>
        """
    )),
    ("blogs.html", get_mock_page_html(
        "The Aurelia Blog",
        "Jewellery trends, styling guides, and diamond curation advice",
        """
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:30px;">
          <article style="border:1px solid var(--border-light); border-radius:var(--radius-md); overflow:hidden;">
            <div style="height:200px; background-color:var(--brand-teal);"></div>
            <div style="padding:20px;">
              <h4>Summer Wedding Jewellery Trends 2026</h4>
              <p style="font-size:12px; color:var(--text-muted); margin-top:8px;">Read time: 5 mins | Date: 12th June</p>
            </div>
          </article>
          <article style="border:1px solid var(--border-light); border-radius:var(--radius-md); overflow:hidden;">
            <div style="height:200px; background-color:var(--brand-gold);"></div>
            <div style="padding:20px;">
              <h4>Understanding the 4Cs of Solitaires</h4>
              <p style="font-size:12px; color:var(--text-muted); margin-top:8px;">Read time: 8 mins | Date: 8th June</p>
            </div>
          </article>
        </div>
        """
    )),
    ("store-locator.html", get_mock_page_html(
        "Boutique Locator",
        "Find an Aurelia store near you to experience jewellery in person",
        """
        <div class="pincode-checker-box" style="max-width:500px; margin:0 auto 40px;">
          <h5>Search Store by City or Pincode</h5>
          <div class="pincode-checker-input-wrap">
            <input type="text" placeholder="e.g. Mumbai or 400001" id="store-input">
            <button class="btn btn-primary" onclick="alert('Found 3 Aurelia Boutiques nearby!')">Search</button>
          </div>
        </div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
          <div style="border:1px solid var(--border-light); padding:20px; border-radius:var(--radius-md);">
            <h4>Aurelia Flagship - Bandra</h4>
            <p style="font-size:13px; color:var(--text-muted); margin-top:8px;">Linking Road, Opp National College, Bandra West, Mumbai - 400050<br>Phone: 022-26490321</p>
          </div>
          <div style="border:1px solid var(--border-light); padding:20px; border-radius:var(--radius-md);">
            <h4>Aurelia Boutique - Fort</h4>
            <p style="font-size:13px; color:var(--text-muted); margin-top:8px;">Horniman Circle, Near Reserve Bank of India, Fort, Mumbai - 400001<br>Phone: 022-22660142</p>
          </div>
        </div>
        """
    )),
    ("book-appointment.html", get_mock_page_html(
        "Book a Consultation",
        "Connect with a luxury jewellery consultant in-store or over high-definition video",
        """
        <form style="max-width:500px; margin:0 auto; display:flex; flex-direction:column; gap:20px;" onsubmit="event.preventDefault(); alert('Appointment Booked! We will contact you shortly.')">
          <div class="form-group">
            <label>Consultation Type</label>
            <select>
              <option>HD Video Call Consultation</option>
              <option>In-Store Boutique Visit</option>
            </select>
          </div>
          <div class="form-group">
            <label>Preferred Date</label>
            <input type="date" required>
          </div>
          <div class="form-group">
            <label>Preferred Time Slot</label>
            <select>
              <option>11:00 AM - 01:00 PM</option>
              <option>02:00 PM - 04:00 PM</option>
              <option>05:00 PM - 07:00 PM</option>
            </select>
          </div>
          <div class="form-group">
            <label>Specific Collection Interest</label>
            <input type="text" placeholder="e.g. Bridal Chokers, Solitaire Bands">
          </div>
          <button type="submit" class="btn btn-primary">Schedule Consultation</button>
        </form>
        """
    )),
    ("care-guide.html", get_mock_page_html(
        "Jewellery Care Guide",
        "Expert maintenance tips to preserve the brilliance of your metals and stones",
        """
        <p>Luxury jewellery requires delicate care to retain its luster. Read our guide to learn how to store, clean, and protect your precious assets.</p>
        """
    )),
    ("jewellery-care.html", get_mock_page_html(
        "Artisan Jewellery Care",
        "Preserving antique finishes and stone settings",
        """
        <p>Learn how to safely clean Kundan and enamel jewellery without damaging historical colored details or matte gold texturing.</p>
        """
    )),
    ("certificate-verification.html", get_mock_page_html(
        "Verify Certificate",
        "Online validation of GIA, IGI, and BIS hallmarks",
        """
        <div class="pincode-checker-box" style="max-width:500px; margin:0 auto;">
          <h5>Enter Certificate Report Number</h5>
          <div class="pincode-checker-input-wrap">
            <input type="text" placeholder="e.g. GIA-904321021">
            <button class="btn btn-primary" onclick="alert('Certificate verified: 100% Genuine Natural VVS1 Diamond!')">Verify</button>
          </div>
        </div>
        """
    )),
    ("invest-in-gold.html", get_mock_page_html(
        "Digital Gold Investment",
        "Save in 24KT 99.9% pure gold incrementally, from ₹100 onwards",
        """
        <p>Aurelia Digital Gold is an easy way to buy, sell, and accumulate 24KT pure gold online, fully backed by physical gold held securely in insured vaults. Redeem it anytime as physical coins or boutique jewellery.</p>
        """
    )),
    ("gold-rate.html", get_mock_page_html(
        "Live Gold Rate",
        "Real-time gold prices updated directly from gold markets",
        """
        <div style="border:1px solid var(--border-light); border-radius:var(--radius-lg); padding:32px; text-align:center; max-width:400px; margin: 0 auto;">
          <h4 style="color:var(--brand-maroon);">Live Rate (Per Gram)</h4>
          <p style="font-size:12px; color:var(--text-muted); margin-bottom:20px;">Last updated: Today, 12:50 PM</p>
          <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
            <span>22KT Yellow Gold</span>
            <strong>₹7,250</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span>24KT Pure Gold</span>
            <strong>₹7,910</strong>
          </div>
        </div>
        """
    )),

    # Support pages
    ("contact.html", get_mock_page_html(
        "Contact Us",
        "We are here to assist you with order inquiries, bespoke designs, or custom alterations",
        """
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px;">
          <div>
            <h4>Support Headquarters</h4>
            <p style="margin-top:10px; color:var(--text-muted);">Aurelia House, Corporate Park, BKC<br>Mumbai, Maharashtra - 400051</p>
            <p style="margin-top:15px;">Phone: 1800-296-6677 (Toll Free)<br>Email: support@aureliajewellers.com</p>
          </div>
          <form style="display:flex; flex-direction:column; gap:16px;" onsubmit="event.preventDefault(); alert('Message sent successfully!')">
            <div class="form-group">
              <label>Your Name</label>
              <input type="text" required>
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" required>
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea rows="4" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send Message</button>
          </form>
        </div>
        """
    )),
    ("faq.html", get_mock_page_html(
        "Help & FAQs",
        "Frequently asked questions regarding authentication, customization, and delivery",
        """
        <div style="display:flex; flex-direction:column; gap:20px;">
          <details style="border:1px solid var(--border-light); padding:16px; border-radius:var(--radius-md);">
            <summary style="font-weight:600; cursor:pointer;">Are your diamonds real and certified?</summary>
            <p style="margin-top:10px; font-size:13px; color:var(--text-muted);">Yes. 100% of our diamonds are natural, conflict-free, and come with independent third-party laboratory grading certificates from GIA or IGI.</p>
          </details>
          <details style="border:1px solid var(--border-light); padding:16px; border-radius:var(--radius-md);">
            <summary style="font-weight:600; cursor:pointer;">Can I return jewellery if the size is incorrect?</summary>
            <p style="margin-top:10px; font-size:13px; color:var(--text-muted);">Yes. We offer a 15-day free replacement policy for incorrect sizing, provided the tag remains attached and the piece is unworn.</p>
          </details>
        </div>
        """
    )),
    ("privacy-policy.html", get_mock_page_html("Privacy Policy", "Aurelia Data Encryption Guidelines", "<p>We protect your personal credentials and transaction logs using industry-grade SSL encryption algorithms.</p>")),
    ("terms.html", get_mock_page_html("Terms & Conditions", "E-commerce transactional policies", "<p>By utilizing this portal, you agree to our gold shipping, tax compliance, and refund policies.</p>")),
    ("shipping-policy.html", get_mock_page_html("Shipping Policy", "Insured cargo transport guidelines", "<p>We provide complimentary insured shipping for all products across India. International orders take 7-10 days.</p>")),
    ("returns.html", get_mock_page_html("Returns & Replacements", "15-day replacement terms", "<p>Returned jewellery items undergo a non-destructive quality check prior to buyback credit authorizations.</p>")),
    ("track-order.html", get_mock_page_html(
        "Track Shipment",
        "Enter your transaction number to check order updates",
        """
        <div class="pincode-checker-box" style="max-width:500px; margin:0 auto;">
          <h5>Order or Tracking ID</h5>
          <div class="pincode-checker-input-wrap">
            <input type="text" placeholder="e.g. AR-2026-98431" id="track-id-input">
            <button class="btn btn-primary" onclick="alert('Order status: Shipped. Estimated delivery: 18th June, 2026')">Track Order</button>
          </div>
        </div>
        """
    )),
    ("reviews.html", get_mock_page_html(
        "Customer Reviews",
        "Honest testimonials from thousands of families who trust Aurelia",
        """
        <p>Aurelia has an average rating of <strong>4.8 out of 5 stars</strong> across 15,000+ customer reviews.</p>
        """
    )),
    ("diamond-guide.html", get_mock_page_html(
        "The Diamond 4Cs Guide",
        "Learn about Carat, Cut, Color, and Clarity to make informed solitaire purchases",
        """
        <p>Buying diamond solitaire rings is simple once you know the 4Cs:
        <ul style="margin-top:20px; padding-left:20px; display:flex; flex-direction:column; gap:12px;">
          <li><strong>Carat:</strong> Measures the weight and size of the stone.</li>
          <li><strong>Color:</strong> Ranging from colorless (D-F) to light yellow tints (Z).</li>
          <li><strong>Clarity:</strong> Indicates presence of internal microscopic markings (FL to I).</li>
          <li><strong>Cut:</strong> Governs how light bounces and flashes inside the diamond.</li>
        </ul>
        </p>
        """
    ))
]

# Create all files
for filename, content in pages_configs:
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated {filename}")

print("Successfully generated all remaining HTML pages!")
