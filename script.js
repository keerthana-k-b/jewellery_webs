// Aurelia Fine Jewellery - Global Frontend Controller

document.addEventListener("DOMContentLoaded", () => {
  // 1. STATE MANAGEMENT (Cart & Wishlist)
  initCartAndWishlistState();

  // 2. COMPONENT INJECTION (Inject header, footer, drawers, overlays)
  injectGlobalShellComponents();

  // 3. GLOBAL INTERACTIVE EVENTS (Header drawers, search, menus)
  initGlobalInteractions();

  // 4. CONDITIONAL PAGE CONTROLLERS (Details, Category Listing, Checkout, etc.)
  routePageControllers();

  // 5. HERO SLIDER AUTO-PLAY & CONTROLS
  initHeroSlider();
});

// --- State Setup ---
let cart = [];
let wishlist = [];

function initCartAndWishlistState() {
  try {
    cart = JSON.parse(localStorage.getItem("aurelia_cart")) || [];
    wishlist = JSON.parse(localStorage.getItem("aurelia_wishlist")) || [];
  } catch (e) {
    cart = [];
    wishlist = [];
  }
}

function saveCartState() {
  localStorage.setItem("aurelia_cart", JSON.stringify(cart));
  updateCartIndicators();
  renderCartDrawerItems();
}

function saveWishlistState() {
  localStorage.setItem("aurelia_wishlist", JSON.stringify(wishlist));
  updateWishlistIndicators();
  renderWishlistDrawerItems();
}

function updateCartIndicators() {
  const counts = document.querySelectorAll(".cart-count-badge");
  counts.forEach(badge => {
    badge.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  });
}

function updateWishlistIndicators() {
  const counts = document.querySelectorAll(".wishlist-count-badge");
  counts.forEach(badge => {
    badge.textContent = wishlist.length;
  });
}

// --- Global UI Shell Component Injections ---
function injectGlobalShellComponents() {
  const headerContainer = document.getElementById("header-container");
  const footerContainer = document.getElementById("footer-container");
  
  if (headerContainer) {
    headerContainer.innerHTML = getHeaderHTML();
  }
  if (footerContainer) {
    footerContainer.innerHTML = getFooterHTML();
  }

  // Inject drawers and overlays if not present
  if (!document.getElementById("search-overlay-container")) {
    const searchDiv = document.createElement("div");
    searchDiv.id = "search-overlay-container";
    searchDiv.innerHTML = getSearchOverlayHTML();
    document.body.appendChild(searchDiv);
  }

  if (!document.getElementById("cart-drawer-container")) {
    const cartDiv = document.createElement("div");
    cartDiv.id = "cart-drawer-container";
    cartDiv.innerHTML = getCartDrawerHTML();
    document.body.appendChild(cartDiv);
  }

  if (!document.getElementById("wishlist-drawer-container")) {
    const wishlistDiv = document.createElement("div");
    wishlistDiv.id = "wishlist-drawer-container";
    wishlistDiv.innerHTML = getWishlistDrawerHTML();
    document.body.appendChild(wishlistDiv);
  }

  if (!document.getElementById("toast-container")) {
    const toastDiv = document.createElement("div");
    toastDiv.id = "toast-container";
    toastDiv.className = "toast-container";
    document.body.appendChild(toastDiv);
  }

  if (!document.getElementById("quickview-modal-container")) {
    const modalDiv = document.createElement("div");
    modalDiv.id = "quickview-modal-container";
    modalDiv.className = "modal-overlay";
    modalDiv.innerHTML = getQuickViewModalHTML();
    document.body.appendChild(modalDiv);
  }

  // Sync badge displays on injected nodes
  updateCartIndicators();
  updateWishlistIndicators();
  renderCartDrawerItems();
  renderWishlistDrawerItems();
}

// --- Dynamic Search Bar Cycling Placeholder ---
let searchPlaceholders = [
  "Search for gold necklace...",
  "Search for diamond solitaire rings...",
  "Search for pendants...",
  "Search for bangles & bracelets...",
  "Search for mangalsutra..."
];
let currentSearchPlaceholderIndex = 0;

function initSearchPlaceholderCycling() {
  const searchInput = document.getElementById("global-search-input");
  if (searchInput) {
    setInterval(() => {
      currentSearchPlaceholderIndex = (currentSearchPlaceholderIndex + 1) % searchPlaceholders.length;
      searchInput.setAttribute("placeholder", searchPlaceholders[currentSearchPlaceholderIndex]);
    }, 4000);
  }
}

// --- Component HTML Templates ---
function getHeaderHTML() {
  return `
    <div class="header-main">
      <div class="header-logo">
        <a href="index.html">
          <img src="assets/images/aurelia_logo.png" alt="Aurelia Fine Jewellery" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\\'http://www.w3.org/2000/svg\\\' width=\\\'180\\\' height=\\\'48\\\'><rect width=\\\'180\\\' height=\\\'48\\\' fill=\\\'transparent\\\'/><text x=\\\'90\\\' y=\\\'28\\\' font-family=\\\'Cormorant Garamond\\\' font-weight=\\\'700\\\' font-size=\\\'20\\\' fill=\\\'%234A102A\\\' text-anchor=\\\'middle\\\'>AURELIA</text></svg>'">
        </a>
      </div>

      <div class="header-search-wrapper" id="search-bar-trigger">
        <div class="header-search-inner">
          <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
          <input type="text" placeholder="Search for engagement rings" id="global-search-input" readonly>
          <div class="search-icons-right">
            <svg viewBox="0 0 24 24" title="Search by Image"><path d="M9 12c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3zm12-7.03V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V4.97c0-1.1.9-2 2-2h3.17L10 1h4l1.83 1.97H19c1.1 0 2 .9 2 2zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
            <svg viewBox="0 0 24 24" title="Voice Search"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
          </div>
        </div>
      </div>

      <div class="header-icons">
        <a href="collections.html" class="header-icon-link" title="Diamond">
          <svg viewBox="0 0 24 24"><path d="M6 3h12l4 6-10 12L2 9z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M2 9h20M8 3l4 6 4-6" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
        </a>
        <a href="store-locator.html" class="header-icon-link" title="Stores">
          <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M9 22V12h6v10" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
        </a>
        <div class="header-icon-link" id="wishlist-drawer-trigger" title="Wishlist">
          <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
          <span class="counter wishlist-count-badge">0</span>
        </div>
        <a href="my-account.html" class="header-icon-link" title="My Account">
          <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
        </a>
        <div class="header-icon-link" id="cart-drawer-trigger" title="Shopping Cart">
          <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
          <span class="counter cart-count-badge">0</span>
        </div>
      </div>
    </div>

    <nav class="category-nav">
      <ul class="category-nav-list">
        <li class="category-nav-item">
          <a href="collections.html" class="category-nav-link">
            <svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6 4.8 2.3 7.3-6.3-4.7-6.3 4.7 2.3-7.3-6-4.8h7.6L12 2z" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>
            <span>All Jewellery</span>
          </a>
          ${getMegaMenuHTML("all")}
        </li>
        <li class="category-nav-item">
          <a href="gold-jewellery.html" class="category-nav-link">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M12 2v3M9.5 3.5l1.5 1.5M14.5 3.5L13 5" stroke="currentColor" stroke-width="1.2"/></svg>
            <span>Gold</span>
          </a>
          ${getMegaMenuHTML("gold")}
        </li>
        <li class="category-nav-item">
          <a href="diamond-jewellery.html" class="category-nav-link">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 12l10 10 10-10L12 2zm0 3.5l6.5 6.5-6.5 6.5-6.5-6.5L12 5.5z" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>
            <span>Diamond</span>
          </a>
          ${getMegaMenuHTML("diamond")}
        </li>
        <li class="category-nav-item">
          <a href="earrings.html" class="category-nav-link">
            <svg viewBox="0 0 24 24"><path d="M8 5c0 3 2 5 2 7s-1 3-1 5 1 2 2 2 2-1 2-2-1-3-1-5 2-4 2-7c0-2-1.5-3-2-3s-2 1-2 3z" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>
            <span>Earrings</span>
          </a>
          ${getMegaMenuHTML("earrings")}
        </li>
        <li class="category-nav-item">
          <a href="rings.html" class="category-nav-link">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="14" r="6" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M12 8l-2-3h4l-2 3z" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>
            <span>Rings</span>
          </a>
          ${getMegaMenuHTML("rings")}
        </li>
        <li class="category-nav-item">
          <a href="trending-now.html" class="category-nav-link">
            <svg viewBox="0 0 24 24"><path d="M17 8c-3.11 0-7 2.89-7 7 0 2 1.5 3 3 3 2.11 0 7-4.89 7-9 0-1.5-1.5-1-3-1zm-6-2C8.11 6 5 8.89 5 13c0 2 1.5 3 3 3 2.11 0 5-4.89 5-9 0-1.5-1.5-1-3-1z" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>
            <span>Daily Wear</span>
          </a>
          ${getMegaMenuHTML("all")}
        </li>
        <li class="category-nav-item">
          <a href="gold-jewellery.html" class="category-nav-link">
            <svg viewBox="0 0 24 24"><path d="M16 2H8L3 8l9 14 9-14-5-6zM12 5.2l3 3.6H9l3-3.6z" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>
            <span>Gemstone</span>
          </a>
          ${getMegaMenuHTML("all")}
        </li>
        <li class="category-nav-item">
          <a href="bridal-collection.html" class="category-nav-link">
            <svg viewBox="0 0 24 24"><path d="M2 22h20v-2H2v2zm0-4l3-8 5 4 4-6 4 6 5-4v10H2z" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>
            <span>Wedding</span>
          </a>
          ${getMegaMenuHTML("gold")}
        </li>
        <li class="category-nav-item">
          <a href="gifting.html" class="category-nav-link">
            <svg viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="11" rx="2" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M12 9V3M7.5 5.5S10 3 12 5.5M16.5 5.5S14 3 12 5.5M3 9h18" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>
            <span>Gifting</span>
          </a>
          ${getMegaMenuHTML("gifting")}
        </li>
        <li class="category-nav-item">
          <a href="assurance.html" class="category-nav-link">
            <svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="2" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="19" cy="12" r="2" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>
            <span>More</span>
          </a>
          ${getMegaMenuHTML("more")}
        </li>
      </ul>
    </nav>
  `;
}

function getMegaMenuHTML(type) {
  let list1 = "", list2 = "", list3 = "", bannerTitle = "", bannerText = "", bannerLink = "";
  if (type === "rings" || type === "all") {
    list1 = `
      <h4>By Style</h4>
      <ul>
        <li><a href="solitaire-rings.html">Solitaire Rings</a></li>
        <li><a href="engagement-rings.html">Engagement Rings</a></li>
        <li><a href="bridal-rings.html">Bridal Bands</a></li>
        <li><a href="gold-rings.html">Everyday Gold Rings</a></li>
      </ul>
    `;
    list2 = `
      <h4>By Material</h4>
      <ul>
        <li><a href="gold-rings.html">Yellow Gold Rings</a></li>
        <li><a href="gold-rings.html">Rose Gold Rings</a></li>
        <li><a href="diamond-jewellery.html">Platinum Diamond Rings</a></li>
        <li><a href="diamond-jewellery.html">White Gold Rings</a></li>
      </ul>
    `;
    list3 = `
      <h4>Trending</h4>
      <ul>
        <li><a href="trending-now.html">Multi-stone Rings</a></li>
        <li><a href="trending-now.html">Cluster Halo Rings</a></li>
        <li><a href="trending-now.html">Floral Stack Bands</a></li>
      </ul>
    `;
    bannerTitle = "The Solitaire Edit";
    bannerText = "Hand-selected D-FL GIA certified stones set in solid Platinum.";
  } else if (type === "gold" || type === "gold-jewellery") {
    list1 = `
      <h4>Traditional Gold</h4>
      <ul>
        <li><a href="gold-necklaces.html">Temple Gold Chokers</a></li>
        <li><a href="mangalsutra.html">Beaded Gold Mangalsutras</a></li>
        <li><a href="bangles.html">Kundan Enamel Bangles</a></li>
        <li><a href="gold-earrings.html">Antique Jhumka Studs</a></li>
      </ul>
    `;
    list2 = `
      <h4>Daily Wear</h4>
      <ul>
        <li><a href="chains.html">Sleek Link Chains</a></li>
        <li><a href="bracelets.html">Dainty Charm Bracelets</a></li>
        <li><a href="gold-rings.html">Plain Gold Rings</a></li>
      </ul>
    `;
    list3 = `
      <h4>Investment</h4>
      <ul>
        <li><a href="invest-in-gold.html">Digital Gold Accounts</a></li>
        <li><a href="gold-rate.html">Live Gold Rate (22KT/24KT)</a></li>
        <li><a href="gold-rate.html">Sovereign Gold Coins</a></li>
      </ul>
    `;
    bannerTitle = "BIS Hallmark Gold";
    bannerText = "100% verified 22KT gold hallmarked by Govt of India.";
  } else {
    // Default categories
    list1 = `
      <h4>Shop Categories</h4>
      <ul>
        <li><a href="earrings.html">Earrings</a></li>
        <li><a href="rings.html">Rings</a></li>
        <li><a href="necklaces.html">Necklaces</a></li>
        <li><a href="pendants.html">Pendants</a></li>
      </ul>
    `;
    list2 = `
      <h4>Special Filters</h4>
      <ul>
        <li><a href="new-arrivals.html">New Arrivals</a></li>
        <li><a href="trending-now.html">Trending Pieces</a></li>
        <li><a href="bridal-collection.html">Bridal Sets</a></li>
      </ul>
    `;
    list3 = `
      <h4>Gifting By Budget</h4>
      <ul>
        <li><a href="gift-under-25000.html">Gifts Under ₹25,000</a></li>
        <li><a href="gift-under-50000.html">Gifts Under ₹50,000</a></li>
      </ul>
    `;
    bannerTitle = "Aurelia Gifting";
    bannerText = "Hand-packed in luxury mahogany cases with custom cards.";
  }

  return `
    <div class="mega-menu">
      <div class="mega-menu-column">${list1}</div>
      <div class="mega-menu-column">${list2}</div>
      <div class="mega-menu-column">${list3}</div>
      <div class="mega-menu-column">
        <h4>Trust & Guides</h4>
        <ul>
          <li><a href="assurance.html">Tanishq Assurance</a></li>
          <li><a href="exchange-program.html">Lifetime Exchange Program</a></li>
          <li><a href="diamond-guide.html">4Cs Diamond Education Guide</a></li>
          <li><a href="craftsmanship.html">The Karigar Artistry</a></li>
        </ul>
      </div>
      <div class="mega-menu-featured">
        <img src="assets/images/mega-menu-featured.jpg" alt="Featured Collections" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\\'http://www.w3.org/2000/svg\\\' width=\\\'250\\\' height=\\\'140\\\'><rect width=\\\'250\\\' height=\\\'140\\\' fill=\\\'%230F4C43\\\'/><text x=\\\'125\\\' y=\\\'75\\\' font-family=\\\'Cormorant Garamond\\\' font-size=\\\'16\\\' fill=\\\'%23FFFFFF\\\' text-anchor=\\\'middle\\\'>Featured Collection</text></svg>'">
        <h5>${bannerTitle}</h5>
        <p>${bannerText}</p>
        <a href="collections.html" class="btn btn-secondary" style="font-size:10px; padding:6px 16px;">Explore Now</a>
      </div>
    </div>
  `;
}

function getFooterHTML() {
  return `
    <svg class="footer-wave" viewBox="0 0 1440 32" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 32 L0 16 Q360 -10 720 16 Q1080 -10 1440 16 L1440 32 Z" />
    </svg>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-column">
          <div class="footer-logo">
            <img src="assets/images/aurelia_logo.png" alt="Aurelia" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\\'http://www.w3.org/2000/svg\\\' width=\\\'180\\\' height=\\\'48\\\'><rect width=\\\'180\\\' height=\\\'48\\\' fill=\\\'%235A1833\\\'/><text x=\\\'90\\\' y=\\\'28\\\' font-family=\\\'Cormorant Garamond\\\' font-weight=\\\'700\\\' font-size=\\\'20\\\' fill=\\\'%23FFFDFC\\\' text-anchor=\\\'middle\\\'>AURELIA</text></svg>'">
          </div>
          <p>Download the Aurelia App for exclusive launches, video appointments, and digital gold savings accounts.</p>
          <div class="qr-code-box">
            <img src="assets/images/qr-code.png" alt="Scan to Download" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\\'http://www.w3.org/2000/svg\\\' width=\\\'100\\\' height=\\\'100\\\'><rect width=\\\'100\\\' height=\\\'100\\\' fill=\\\'%23FFFFFF\\\'/><text x=\\\'50\\\' y=\\\'55\\\' font-family=\\\'Montserrat\\\' font-size=\\\'10\\\' fill=\\\'%23000000\\\' text-anchor=\\\'middle\\\'>QR CODE</text></svg>'">
            <div class="app-store-buttons">
              <a href="#" class="app-btn">
                <span>Play Store</span>
              </a>
              <a href="#" class="app-btn">
                <span>App Store</span>
              </a>
            </div>
          </div>
        </div>

        <div class="footer-column">
          <h4>Useful Links</h4>
          <ul>
            <li><a href="shipping-policy.html">Delivery & Shipping Information</a></li>
            <li><a href="shipping-policy.html">International Shipping</a></li>
            <li><a href="terms.html">Payment Options</a></li>
            <li><a href="track-order.html">Track your Order</a></li>
            <li><a href="returns.html">Returns & Replacement Policy</a></li>
            <li><a href="store-locator.html">Find a Boutique</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4>Information</h4>
          <ul>
            <li><a href="blogs.html">Blogs</a></li>
            <li><a href="new-arrivals.html">Offers & Contest Details</a></li>
            <li><a href="faq.html">Help & FAQs</a></li>
            <li><a href="about-us.html">About Aurelia</a></li>
            <li><a href="craftsmanship.html">The Art of Craftsmanship</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4>Contact Us</h4>
          <p>Toll Free Support helpline:<br><strong>1800-296-6677</strong></p>
          <h4>Chat With Us</h4>
          <p>WhatsApp support:<br><strong>+91 8147349242</strong></p>
          <div class="chat-icons">
            <a href="https://wa.me/918147349242" class="chat-icon-link" title="WhatsApp Chat">
              💬
            </a>
            <a href="mailto:support@aureliajewellers.com" class="chat-icon-link" title="Send Email">
              ✉️
            </a>
            <a href="book-appointment.html" class="chat-icon-link" title="Video Consultation">
              📹
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 Aurelia Fine Jewellery. A TATA Enterprise Product. All Rights Reserved.</p>
        <div class="social-links">
          <h5>Social Links</h5>
          <a href="#" class="social-link">IG</a>
          <a href="#" class="social-link">X</a>
          <a href="#" class="social-link">FB</a>
          <a href="#" class="social-link">YT</a>
        </div>
      </div>
    </div>
  `;
}

function getSearchOverlayHTML() {
  return `
    <div class="search-overlay" id="search-overlay-box">
      <div class="search-overlay-content">
        <div class="search-overlay-inner">
          <div class="search-overlay-input-wrap-new">
            <div class="search-pill-box">
              <svg class="search-icon-left" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
              <input type="text" placeholder="Search for engagement rings" id="search-overlay-input" autofocus>
              <div class="search-icons-right">
                <svg viewBox="0 0 24 24" title="Search by Image"><path d="M9 12c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3zm12-7.03V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V4.97c0-1.1.9-2 2-2h3.17L10 1h4l1.83 1.97H19c1.1 0 2 .9 2 2zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/></svg>
                <svg viewBox="0 0 24 24" title="Voice Search"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>
              </div>
            </div>
            <span class="search-overlay-close-btn-new" id="search-overlay-close-btn">&times;</span>
          </div>
          <div class="search-suggestions-box">
            <div class="suggestion-column">
              <h5>Popular Searches</h5>
              <div class="popular-tags">
                <a href="#" class="popular-tag search-tag-click">Solitaire Ring</a>
                <a href="#" class="popular-tag search-tag-click">Gold Kada Bangle</a>
                <a href="#" class="popular-tag search-tag-click">Diamond Choker</a>
                <a href="#" class="popular-tag search-tag-click">Mangalsutra</a>
                <a href="#" class="popular-tag search-tag-click">Rose Gold Chains</a>
              </div>
            </div>
            <div class="suggestion-column">
              <h5>Suggested Products</h5>
              <div class="live-search-results-list" id="search-results-container">
                <!-- Injected via JS -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getCartDrawerHTML() {
  return `
    <div class="drawer-backdrop" id="cart-drawer-backdrop"></div>
    <div class="drawer" id="cart-drawer">
      <div class="drawer-header">
        <h3>Shopping Bag</h3>
        <span class="drawer-close" id="cart-drawer-close">&times;</span>
      </div>
      <div class="drawer-content" id="cart-drawer-items-list">
        <!-- Injected dynamically -->
      </div>
      <div class="drawer-footer">
        <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-weight:600;">
          <span>Subtotal</span>
          <span id="cart-drawer-subtotal">₹0</span>
        </div>
        <a href="cart.html" class="btn btn-secondary" style="width:100%; margin-bottom:10px;">View Bag Details</a>
        <a href="checkout.html" class="btn btn-primary" style="width:100%;">Proceed to Checkout</a>
      </div>
    </div>
  `;
}

function getWishlistDrawerHTML() {
  return `
    <div class="drawer-backdrop" id="wishlist-drawer-backdrop"></div>
    <div class="drawer" id="wishlist-drawer">
      <div class="drawer-header">
        <h3>My Wishlist</h3>
        <span class="drawer-close" id="wishlist-drawer-close">&times;</span>
      </div>
      <div class="drawer-content" id="wishlist-drawer-items-list">
        <!-- Injected dynamically -->
      </div>
      <div class="drawer-footer">
        <a href="wishlist.html" class="btn btn-primary" style="width:100%;">View Full Wishlist</a>
      </div>
    </div>
  `;
}

function getQuickViewModalHTML() {
  return `
    <div class="modal-box">
      <span class="modal-close" id="quickview-modal-close">&times;</span>
      <div class="modal-body" id="quickview-modal-body">
        <!-- Injected dynamically based on selected product -->
      </div>
    </div>
  `;
}

// --- Dynamic Suggestions Injector ---
function initGlobalInteractions() {
  const searchTrigger = document.getElementById("search-bar-trigger");
  const searchOverlay = document.getElementById("search-overlay-box");
  const searchClose = document.getElementById("search-overlay-close-btn");
  const searchInput = document.getElementById("search-overlay-input");
  
  if (searchTrigger && searchOverlay) {
    searchTrigger.addEventListener("click", () => {
      searchOverlay.classList.add("active");
      if (searchInput) {
        searchInput.focus();
        renderLiveSearchResults(""); // initial load
      }
    });
  }

  if (searchClose && searchOverlay) {
    searchClose.addEventListener("click", () => {
      searchOverlay.classList.remove("active");
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderLiveSearchResults(e.target.value);
    });
  }

  // Tag clicks inside search suggestions
  document.querySelectorAll(".search-tag-click").forEach(tag => {
    tag.addEventListener("click", (e) => {
      e.preventDefault();
      if (searchInput) {
        searchInput.value = tag.textContent;
        renderLiveSearchResults(tag.textContent);
      }
    });
  });

  // Drawer toggles
  const cartTrigger = document.getElementById("cart-drawer-trigger");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartClose = document.getElementById("cart-drawer-close");
  const cartBackdrop = document.getElementById("cart-drawer-backdrop");

  if (cartTrigger && cartDrawer) {
    cartTrigger.addEventListener("click", () => {
      cartDrawer.classList.add("active");
      cartBackdrop.classList.add("active");
    });
  }

  if (cartClose && cartDrawer) {
    const closeFn = () => {
      cartDrawer.classList.remove("active");
      cartBackdrop.classList.remove("active");
    };
    cartClose.addEventListener("click", closeFn);
    cartBackdrop.addEventListener("click", closeFn);
  }

  const wishlistTrigger = document.getElementById("wishlist-drawer-trigger");
  const wishlistDrawer = document.getElementById("wishlist-drawer");
  const wishlistClose = document.getElementById("wishlist-drawer-close");
  const wishlistBackdrop = document.getElementById("wishlist-drawer-backdrop");

  if (wishlistTrigger && wishlistDrawer) {
    wishlistTrigger.addEventListener("click", () => {
      wishlistDrawer.classList.add("active");
      wishlistBackdrop.classList.add("active");
    });
  }

  if (wishlistClose && wishlistDrawer) {
    const closeWishFn = () => {
      wishlistDrawer.classList.remove("active");
      wishlistBackdrop.classList.remove("active");
    };
    wishlistClose.addEventListener("click", closeWishFn);
    wishlistBackdrop.addEventListener("click", closeWishFn);
  }

  // Quickview Modal Close
  const modalClose = document.getElementById("quickview-modal-close");
  const modalOverlay = document.getElementById("quickview-modal-container");
  if (modalClose) {
    modalClose.addEventListener("click", () => {
      modalOverlay.classList.remove("active");
    });
  }

  // Escape key listener to close active overlays/drawers
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (searchOverlay) searchOverlay.classList.remove("active");
      if (cartDrawer) {
        cartDrawer.classList.remove("active");
        if (cartBackdrop) cartBackdrop.classList.remove("active");
      }
      if (wishlistDrawer) {
        wishlistDrawer.classList.remove("active");
        if (wishlistBackdrop) wishlistBackdrop.classList.remove("active");
      }
      if (modalOverlay) modalOverlay.classList.remove("active");
    }
  });

  initSearchPlaceholderCycling();
}

function renderLiveSearchResults(query) {
  const container = document.getElementById("search-results-container");
  if (!container) return;

  const filtered = window.products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    (p.subcategories && p.subcategories.some(s => s.toLowerCase().includes(query.toLowerCase())))
  ).slice(0, 4);

  if (filtered.length === 0) {
    container.innerHTML = `<p style="padding:10px; color:var(--text-muted);">No products match your query.</p>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <a href="product-details.html?id=${p.id}" class="live-search-item">
      <img src="${p.image}" alt="${p.name}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\\'http://www.w3.org/2000/svg\\\' width=\\\'50\\\' height=\\\'50\\\'><rect width=\\\'50\\\' height=\\\'50\\\' fill=\\\'%230F4C43\\\'/></svg>'">
      <div class="live-search-info">
        <h6>${p.name}</h6>
        <p>₹${p.price.toLocaleString("en-IN")}</p>
      </div>
    </a>
  `).join("");
}

// --- Cart and Wishlist Drawer Rendering & Actions ---
function renderCartDrawerItems() {
  const container = document.getElementById("cart-drawer-items-list");
  const subtotalEl = document.getElementById("cart-drawer-subtotal");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 0; color:var(--text-muted);">
        <p style="font-size:32px; margin-bottom:10px;">🛍️</p>
        <p>Your bag is empty.</p>
        <a href="collections.html" class="btn btn-primary" style="margin-top:20px; font-size:11px; padding:8px 20px;">Shop Now</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = "₹0";
    return;
  }

  container.innerHTML = cart.map(item => {
    const prod = window.products.find(p => p.id === item.productId);
    if (!prod) return "";
    return `
      <div class="cart-drawer-item">
        <img src="${prod.image}" alt="${prod.name}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\\'http://www.w3.org/2000/svg\\\' width=\\\'70\\\' height=\\\'70\\\'><rect width=\\\'70\\\' height=\\\'70\\\' fill=\\\'%230F4C43\\\'/></svg>'">
        <div class="cart-drawer-item-info">
          <h5>${prod.name}</h5>
          <p>${item.metal || "Standard"} | Size: ${item.size || "Standard"}</p>
          <div class="cart-drawer-item-price">₹${(prod.price * item.quantity).toLocaleString("en-IN")}</div>
          <div class="cart-drawer-item-controls">
            <div class="quantity-selector">
              <button class="quantity-btn" onclick="updateCartQty(${prod.id}, -1)">-</button>
              <input type="text" value="${item.quantity}" class="quantity-input" readonly>
              <button class="quantity-btn" onclick="updateCartQty(${prod.id}, 1)">+</button>
            </div>
            <button class="cart-remove-btn" onclick="removeFromCart(${prod.id})">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  const subtotal = cart.reduce((sum, item) => {
    const prod = window.products.find(p => p.id === item.productId);
    return sum + (prod ? prod.price * item.quantity : 0);
  }, 0);

  if (subtotalEl) subtotalEl.textContent = "₹" + subtotal.toLocaleString("en-IN");
}

function renderWishlistDrawerItems() {
  const container = document.getElementById("wishlist-drawer-items-list");
  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 0; color:var(--text-muted);">
        <p style="font-size:32px; margin-bottom:10px;">🤍</p>
        <p>Your wishlist is empty.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = wishlist.map(productId => {
    const prod = window.products.find(p => p.id === productId);
    if (!prod) return "";
    return `
      <div class="cart-drawer-item">
        <img src="${prod.image}" alt="${prod.name}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\\'http://www.w3.org/2000/svg\\\' width=\\\'70\\\' height=\\\'70\\\'><rect width=\\\'70\\\' height=\\\'70\\\' fill=\\\'%230F4C43\\\'/></svg>'">
        <div class="cart-drawer-item-info">
          <h5>${prod.name}</h5>
          <div class="cart-drawer-item-price">₹${prod.price.toLocaleString("en-IN")}</div>
          <div style="display:flex; gap:10px; margin-top:10px;">
            <button class="btn btn-primary" onclick="moveToCart(${prod.id})" style="font-size:10px; padding:6px 12px; letter-spacing:0.5px;">Add to Bag</button>
            <button class="cart-remove-btn" onclick="removeFromWishlist(${prod.id})">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Global actions linked to window for easy access in HTML onclick attributes
window.updateCartQty = function(productId, delta) {
  const item = cart.find(i => i.productId === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.productId !== productId);
    }
    saveCartState();
  }
};

window.removeFromCart = function(productId) {
  cart = cart.filter(i => i.productId !== productId);
  saveCartState();
  showToastNotification(null, "Product removed from cart");
};

window.addToCart = function(productId, quantity = 1, metal = "18KT Gold", size = "12") {
  const existing = cart.find(i => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity, metal, size });
  }
  saveCartState();
  const prod = window.products.find(p => p.id === productId);
  showToastNotification(prod, "Added to Shopping Bag");
};

window.addToWishlist = function(productId) {
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
    saveWishlistState();
    showToastNotification(null, "Removed from Wishlist");
  } else {
    wishlist.push(productId);
    saveWishlistState();
    const prod = window.products.find(p => p.id === productId);
    showToastNotification(prod, "Added to Wishlist");
  }
};

window.removeFromWishlist = function(productId) {
  wishlist = wishlist.filter(id => id !== productId);
  saveWishlistState();
};

window.moveToCart = function(productId) {
  window.addToCart(productId);
  window.removeFromWishlist(productId);
};

// --- Toast notifications ---
function showToastNotification(product, message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";

  if (product) {
    toast.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\\'http://www.w3.org/2000/svg\\\' width=\\\'40\\\' height=\\\'40\\\'><rect width=\\\'40\\\' height=\\\'40\\\' fill=\\\'%23FFFFFF\\\'/></svg>'">
      <div class="toast-content">
        <h5>${product.name}</h5>
        <p>${message}</p>
      </div>
    `;
  } else {
    toast.innerHTML = `
      <div class="toast-content">
        <h5>Aurelia Update</h5>
        <p>${message}</p>
      </div>
    `;
  }

  container.appendChild(toast);
  setTimeout(() => toast.classList.add("active"), 100);

  setTimeout(() => {
    toast.classList.remove("active");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// --- Quick View Modal Controller ---
window.openQuickView = function(productId) {
  const modal = document.getElementById("quickview-modal-container");
  const modalBody = document.getElementById("quickview-modal-body");
  if (!modal || !modalBody) return;

  const prod = window.products.find(p => p.id === productId);
  if (!prod) return;

  modalBody.innerHTML = `
    <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:30px;">
      <div style="aspect-ratio:1; border-radius:var(--radius-md); overflow:hidden; background-color:var(--brand-teal);">
        <img src="${prod.image}" alt="${prod.name}" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div>
        <h4 style="font-size:24px; font-weight:600; margin-bottom:10px;">${prod.name}</h4>
        <div style="font-size:18px; font-weight:700; color:var(--brand-maroon); margin-bottom:15px;">
          ₹${prod.price.toLocaleString("en-IN")}
          <span style="font-size:13px; text-decoration:line-through; color:var(--text-muted); margin-left:10px;">₹${prod.originalPrice.toLocaleString("en-IN")}</span>
        </div>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:20px;">${prod.description}</p>
        <button class="btn btn-primary" onclick="addToCart(${prod.id}); document.getElementById('quickview-modal-container').classList.remove('active');" style="width:100%;">Add to Bag</button>
        <a href="product-details.html?id=${prod.id}" class="btn btn-secondary" style="width:100%; margin-top:10px; border:none;">View Details Page</a>
      </div>
    </div>
  `;

  modal.classList.add("active");
};

// --- Dynamic Page Routing & Initializer Controllers ---
function routePageControllers() {
  if (document.getElementById("category-page-root")) {
    initCategoryPageController();
  }
  if (document.getElementById("product-details-root")) {
    initProductDetailsController();
  }
  if (document.getElementById("checkout-root")) {
    initCheckoutController();
  }
  if (document.getElementById("reels-slider-viewport")) {
    initReelsSlider();
  }
  
  // Custom Dynamic list loaders for specific sections
  if (document.getElementById("trending-products-home")) {
    renderGridProducts("trending-products-home", window.products.slice(0, 3));
  }
  if (document.getElementById("new-arrivals-home")) {
    renderGridProducts("new-arrivals-home", window.products.slice(3, 5), true); // large card layout
  }
}

// --- Category Page Controller ---
function initCategoryPageController() {
  const root = document.getElementById("category-page-root");
  const category = root.getAttribute("data-category");
  const subcategory = root.getAttribute("data-subcategory");
  const material = root.getAttribute("data-material");

  let filteredProducts = window.products;

  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (subcategory) {
    filteredProducts = filteredProducts.filter(p => p.subcategories && p.subcategories.includes(subcategory));
  }

  if (material) {
    filteredProducts = filteredProducts.filter(p => p.material.toLowerCase().includes(material.toLowerCase()));
  }

  // Bind Grid controls
  const gridContainer = document.getElementById("category-grid-items");
  const productCount = document.getElementById("category-product-count");
  const sortSelect = document.getElementById("category-sort");

  const renderCurrentGrid = () => {
    if (!gridContainer) return;
    
    // Sort
    const sortVal = sortSelect ? sortSelect.value : "featured";
    let sorted = [...filteredProducts];
    if (sortVal === "price-low") {
      sorted.sort((a,b) => a.price - b.price);
    } else if (sortVal === "price-high") {
      sorted.sort((a,b) => b.price - a.price);
    } else if (sortVal === "rating") {
      sorted.sort((a,b) => b.rating - a.rating);
    }

    if (productCount) {
      productCount.textContent = `${sorted.length} Jewellery items found`;
    }

    gridContainer.innerHTML = sorted.map(p => `
      <div class="product-card">
        <div class="product-card-img-wrap">
          <a href="product-details.html?id=${p.id}">
            <img src="${p.image}" alt="${p.name}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\\'http://www.w3.org/2000/svg\\\' width=\\\'300\\\' height=\\\'300\\\'><rect width=\\\'300\\\' height=\\\'300\\\' fill=\\\'%230F4C43\\\'/><text x=\\\'150\\\' y=\\\'155\\\' font-family=\\\'Cormorant Garamond\\\' font-size=\\\'18\\\' fill=\\\'%23FFFFFF\\\' text-anchor=\\\'middle\\\'>${p.category.toUpperCase()}</text></svg>'">
          </a>
          <button class="product-card-wishlist-btn ${wishlist.includes(p.id) ? 'active' : ''}" onclick="addToWishlist(${p.id}); this.classList.toggle('active')">
            <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </button>
          ${p.offerBadge ? `<span class="product-card-badge badge badge-offer">${p.offerBadge}</span>` : ''}
          <div class="product-card-actions">
            <button class="product-card-btn product-card-btn-quickview" onclick="openQuickView(${p.id})">Quick View</button>
            <button class="product-card-btn product-card-btn-add" onclick="addToCart(${p.id})">Add To Bag</button>
          </div>
        </div>
        <div class="product-card-info">
          <span class="product-card-sku">${p.sku}</span>
          <a href="product-details.html?id=${p.id}">
            <h4 class="product-card-name">${p.name}</h4>
          </a>
          <div class="product-card-price-row">
            <span class="product-card-price">₹${p.price.toLocaleString("en-IN")}</span>
            <span class="product-card-price-original">₹${p.originalPrice.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    `).join("");
  };

  if (sortSelect) {
    sortSelect.addEventListener("change", renderCurrentGrid);
  }

  // Bind Sidebar Filter clicks
  document.querySelectorAll(".filter-checkbox-input").forEach(cb => {
    cb.addEventListener("change", () => {
      // Basic mockup filter logic
      let activeMaterials = Array.from(document.querySelectorAll(".filter-material:checked")).map(el => el.value);
      let activePrices = Array.from(document.querySelectorAll(".filter-price:checked")).map(el => el.value);

      let working = filteredProducts;

      if (activeMaterials.length > 0) {
        working = working.filter(p => activeMaterials.some(m => p.material.toLowerCase().includes(m.toLowerCase())));
      }

      if (activePrices.length > 0) {
        working = working.filter(p => {
          return activePrices.some(range => {
            if (range === "under-25k") return p.price < 25000;
            if (range === "25k-50k") return p.price >= 25000 && p.price <= 50000;
            if (range === "above-50k") return p.price > 50000;
            return true;
          });
        });
      }

      // Re-render
      const renderCustomFilteredGrid = (customList) => {
        if (!gridContainer) return;
        gridContainer.innerHTML = customList.map(p => `
          <div class="product-card">
            <!-- Reuse card layout -->
            <div class="product-card-img-wrap">
              <a href="product-details.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a>
              <button class="product-card-wishlist-btn" onclick="addToWishlist(${p.id})">🤍</button>
              <div class="product-card-actions">
                <button class="product-card-btn product-card-btn-quickview" onclick="openQuickView(${p.id})">Quick View</button>
                <button class="product-card-btn product-card-btn-add" onclick="addToCart(${p.id})">Add To Bag</button>
              </div>
            </div>
            <div class="product-card-info">
              <span class="product-card-sku">${p.sku}</span>
              <a href="product-details.html?id=${p.id}"><h4 class="product-card-name">${p.name}</h4></a>
              <div class="product-card-price-row">
                <span class="product-card-price">₹${p.price.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        `).join("");
      };
      
      renderCustomFilteredGrid(working);
    });
  });

  renderCurrentGrid();
}

function renderGridProducts(containerId, list, isLarge = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = list.map(p => `
    <div class="${isLarge ? 'new-arrival-card' : 'product-card'}">
      <div class="product-card-img-wrap" style="height: ${isLarge ? '100%' : 'auto'};">
        <a href="product-details.html?id=${p.id}">
          <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </a>
        <button class="product-card-wishlist-btn ${wishlist.includes(p.id) ? 'active' : ''}" onclick="addToWishlist(${p.id}); this.classList.toggle('active')">
          <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>
      </div>
      ${!isLarge ? `
      <div class="product-card-info">
        <span class="product-card-sku">${p.sku}</span>
        <h4 class="product-card-name">${p.name}</h4>
        <div class="product-card-price-row">
          <span class="product-card-price">₹${p.price.toLocaleString("en-IN")}</span>
        </div>
      </div>
      ` : ''}
    </div>
  `).join("");
}

// --- Product Details Page Controller ---
function initProductDetailsController() {
  const urlParams = new URLSearchParams(window.location.search);
  let productId = parseInt(urlParams.get("id")) || 1;
  const prod = window.products.find(p => p.id === productId);

  if (!prod) {
    document.getElementById("product-details-root").innerHTML = `
      <div style="text-align:center; padding: 100px 0;">
        <h2>Product Not Found</h2>
        <a href="collections.html" class="btn btn-primary" style="margin-top:20px;">View All Collections</a>
      </div>
    `;
    return;
  }

  // Dynamically populate fields
  document.getElementById("det-sku").textContent = prod.sku;
  document.getElementById("det-title").textContent = prod.name;
  document.getElementById("det-price").textContent = "₹" + prod.price.toLocaleString("en-IN");
  document.getElementById("det-original-price").textContent = "₹" + prod.originalPrice.toLocaleString("en-IN");
  document.getElementById("det-offer-badge").textContent = prod.offerBadge;
  document.getElementById("det-description").textContent = prod.description;
  document.getElementById("det-reviews-count").textContent = `(${prod.reviewsCount || 0} customer reviews)`;

  const mainImg = document.getElementById("det-main-img");
  mainImg.src = prod.image;

  // Add event for buy
  const buyBtn = document.getElementById("det-buy-btn");
  if (buyBtn) {
    buyBtn.addEventListener("click", () => {
      const activeMetal = document.querySelector(".metal-option.active")?.dataset.value || "18KT Gold";
      const activeSize = document.querySelector(".size-option.active")?.dataset.value || "12";
      window.addToCart(prod.id, 1, activeMetal, activeSize);
    });
  }

  // Thumbnails event binding
  const thumbnails = document.querySelectorAll(".thumbnail-img");
  thumbnails.forEach(thumb => {
    thumb.addEventListener("click", () => {
      thumbnails.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      mainImg.src = thumb.src;
    });
  });

  // Variant Options click listeners
  bindOptionButtons(".metal-option");
  bindOptionButtons(".size-option");
  bindOptionButtons(".diamond-option");

  // Tab control selectors
  const tabBtns = document.querySelectorAll(".tab-nav-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabPanels.forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const targetPanel = document.getElementById(btn.dataset.target);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });

  // Specs Table Builder
  const specBody = document.getElementById("spec-table-body");
  if (specBody && prod.specifications) {
    specBody.innerHTML = Object.entries(prod.specifications).map(([key, val]) => `
      <tr>
        <td>${key}</td>
        <td>${val}</td>
      </tr>
    `).join("");
  }

  // Review List Builder
  const reviewsContainer = document.getElementById("reviews-list-container");
  if (reviewsContainer) {
    if (prod.reviews && prod.reviews.length > 0) {
      reviewsContainer.innerHTML = prod.reviews.map(r => `
        <div style="border-bottom:1px solid var(--border-light); padding:16px 0;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
            <strong>${r.author}</strong>
            <span style="color:var(--brand-gold)">${"★".repeat(r.rating)}</span>
          </div>
          <p style="font-size:13px; color:var(--text-muted);">${r.comment}</p>
        </div>
      `).join("");
    } else {
      reviewsContainer.innerHTML = `<p style="color:var(--text-muted); padding:10px 0;">No reviews yet. Be the first to review this product!</p>`;
    }
  }

  // Pincode Validator mock action
  const pinInput = document.getElementById("pincode-input");
  const pinBtn = document.getElementById("pincode-btn");
  const pinStatus = document.getElementById("pincode-status");
  if (pinBtn && pinInput && pinStatus) {
    pinBtn.addEventListener("click", () => {
      const val = pinInput.value.trim();
      if (/^\d{6}$/.test(val)) {
        pinStatus.innerHTML = `<span style="color:var(--brand-teal); font-weight:600;">✓ Delivery is available at ${val}. Expected delivery: 3-5 business days.</span>`;
      } else {
        pinStatus.innerHTML = `<span style="color:#E25C5C; font-weight:600;">✗ Please enter a valid 6-digit postal code.</span>`;
      }
    });
  }

  // Dynamic price breakdown calculator logic
  const breakdownBtn = document.getElementById("price-breakdown-trigger");
  if (breakdownBtn) {
    breakdownBtn.addEventListener("click", () => {
      // Recalculate components based on product price
      const goldCharge = Math.round(prod.price * 0.55);
      const diamondCharge = prod.diamondWeight !== "N/A" ? Math.round(prod.price * 0.30) : 0;
      const makingCharges = Math.round(prod.price * 0.12);
      const gst = Math.round((goldCharge + diamondCharge + makingCharges) * 0.03);
      
      const modal = document.getElementById("quickview-modal-container");
      const modalBody = document.getElementById("quickview-modal-body");
      if (modal && modalBody) {
        modalBody.innerHTML = `
          <h4 style="font-size:26px; font-weight:600; text-align:center; margin-bottom:20px; border-bottom:1px solid var(--border-light); padding-bottom:10px;">Detailed Price Breakdown</h4>
          <table class="spec-table">
            <tr><td>Gold Metal Charge (${prod.goldWeight || 'N/A'})</td><td style="text-align:right;">₹${goldCharge.toLocaleString("en-IN")}</td></tr>
            ${diamondCharge > 0 ? `<tr><td>Diamond Charge (${prod.diamondWeight || 'N/A'})</td><td style="text-align:right;">₹${diamondCharge.toLocaleString("en-IN")}</td></tr>` : ''}
            <tr><td>Making & Artistry Charges</td><td style="text-align:right;">₹${makingCharges.toLocaleString("en-IN")}</td></tr>
            <tr><td>GST (3%)</td><td style="text-align:right;">₹${gst.toLocaleString("en-IN")}</td></tr>
            <tr style="font-weight:700; color:var(--brand-maroon); font-size:16px;"><td>Total Price (Inclusive of all taxes)</td><td style="text-align:right;">₹${(goldCharge + diamondCharge + makingCharges + gst).toLocaleString("en-IN")}</td></tr>
          </table>
          <button class="btn btn-primary" onclick="document.getElementById('quickview-modal-container').classList.remove('active')" style="width:100%; margin-top:20px;">Close Price Details</button>
        `;
        modal.classList.add("active");
      }
    });
  }
}

function bindOptionButtons(selector) {
  const btns = document.querySelectorAll(selector);
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      // Trigger price fluctuation mock calculation
      const basePrice = document.getElementById("det-price");
      if (basePrice) {
        const delta = Math.floor(Math.random() * 5000) - 2500;
        // Mock adjustments based on variant selection
      }
    });
  });
}

// --- Reels 3D Deck Slider Controller ---
function initReelsSlider() {
  const cards = Array.from(document.querySelectorAll(".reel-card"));
  const prevBtn = document.getElementById("reels-prev");
  const nextBtn = document.getElementById("reels-next");
  if (cards.length === 0) return;

  let positions = ["pos-left-far", "pos-left", "pos-center", "pos-right", "pos-right-far"];
  
  const updateCardPositions = () => {
    cards.forEach((card, idx) => {
      positions.forEach(p => card.classList.remove(p));
      card.classList.add(positions[idx]);
    });
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const last = positions.pop();
      positions.unshift(last);
      updateCardPositions();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const first = positions.shift();
      positions.push(first);
      updateCardPositions();
    });
  }

  updateCardPositions();
}

// --- Multi-step Checkout Controller ---
function initCheckoutController() {
  const stepPanels = document.querySelectorAll(".checkout-step-panel");
  const stepTabs = document.querySelectorAll(".checkout-tab-step");
  const nextBtns = document.querySelectorAll(".checkout-next-btn");
  const prevBtns = document.querySelectorAll(".checkout-prev-btn");

  const gotoStep = (stepIdx) => {
    stepPanels.forEach(p => p.classList.remove("active"));
    stepTabs.forEach(t => t.classList.remove("active"));
    
    stepPanels[stepIdx].classList.add("active");
    stepTabs[stepIdx].classList.add("active");
  };

  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const nextStep = parseInt(btn.dataset.nextStep);
      
      // Simple mock checkout validation
      if (nextStep === 3) {
        // Clear cart on final success
        localStorage.removeItem("aurelia_cart");
        window.location.href = "order-success.html";
        return;
      }
      gotoStep(nextStep);
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const prevStep = parseInt(btn.dataset.prevStep);
      gotoStep(prevStep);
    });
  });
}

// --- Hero Fade Slider Auto-play and Interactive Controllers ---
let currentHeroSlide = 0;
let heroSlideInterval = null;

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const indicators = document.querySelectorAll(".hero-indicator");
  if (slides.length === 0) return;

  // Window-bound global function called by indicator onclick attributes
  window.goToHeroSlide = function(index) {
    currentHeroSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, idx) => {
      if (idx === currentHeroSlide) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    indicators.forEach((indicator, idx) => {
      if (idx === currentHeroSlide) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  };

  // Autoplay control functions
  const startAutoplay = () => {
    stopAutoplay();
    heroSlideInterval = setInterval(() => {
      window.goToHeroSlide(currentHeroSlide + 1);
    }, 4500); // Transitions every 4.5 seconds
  };

  const stopAutoplay = () => {
    if (heroSlideInterval) {
      clearInterval(heroSlideInterval);
      heroSlideInterval = null;
    }
  };

  // Hover pause and resume listeners
  const container = document.querySelector(".hero-slider-container");
  if (container) {
    container.addEventListener("mouseenter", stopAutoplay);
    container.addEventListener("mouseleave", startAutoplay);
  }

  // Initialize first slide and start auto-play
  window.goToHeroSlide(0);
  startAutoplay();
}
