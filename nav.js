document.addEventListener("DOMContentLoaded", () => {

  // 1. Detect Current Page Name
  const pathParts = location.pathname.split("/");
  const page = (pathParts.pop() || "index.html").toLowerCase();

  // 2. Detect if we are inside a subfolder (like /customer/ or /admin/)
  // This logic checks if the "parent" folder is NOT the root project folder
  // For local files, we check if the URL contains specific folder names
  const isInSubfolder = location.pathname.includes("/customer/") || 
                        location.pathname.includes("/admin/") || 
                        location.pathname.includes("/dashboard/");

  // 3. Set the "Go Up" prefix
  // If in subfolder, add "../" to links. If not, add nothing.
  const prefix = isInSubfolder ? "../" : "";

  // Helper for Active Class
  const isActive = (file) => page === file.toLowerCase() ? "active" : "";

  /* =========================
      HEADER
  ========================== */
  const headerHTML = `
  <style>
    :root{ --bg-dark:#1a0f0a; --gold:#debb6e; --border:rgba(222,187,110,.20); }
    header.site-header{ padding:18px 50px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); background:rgba(26,15,10,.92); position:sticky; top:0; z-index:999; backdrop-filter:blur(10px); font-family:'Lato',sans-serif; }
    .site-logo{ font-family:'Playfair Display',serif; font-size:1.55rem; font-weight:700; color:var(--gold); line-height:1; display:flex; flex-direction:column; text-decoration:none; }
    .site-logo span{ font-size:.65rem; letter-spacing:3px; margin-top:4px; color:#fff; }
    nav.site-nav ul{ display:flex; list-style:none; gap:18px; flex-wrap:wrap; justify-content:center; margin:0; padding:0; }
    nav.site-nav a{ text-decoration:none; color:#e6e6e6; font-size:.82rem; text-transform:uppercase; letter-spacing:1px; padding:8px 10px; border-radius:6px; transition:.25s; }
    nav.site-nav a:hover{ color:var(--gold); }
    nav.site-nav a.active{ color:#1a0f0a; background:var(--gold); font-weight:700; }
    .site-icons{ display:flex; gap:14px; align-items:center; color:var(--gold); font-size:1.1rem; }
    .site-icons a{ text-decoration:none; color:inherit; }
    .site-icons a:hover{ opacity:.85; }
    @media(max-width:980px){ nav.site-nav ul{ display:none; } header.site-header{ padding:18px 18px; } }
  </style>

  <header class="site-header">
    <a class="site-logo" href="${prefix}index.html">
      BRITIUM <span>GALLERY</span>
    </a>

    <nav class="site-nav">
      <ul>
        <li><a class="${isActive("index.html")}" href="${prefix}index.html">Home</a></li>
        <li><a class="${isActive("shop.html")}" href="${prefix}shop.html">Shop</a></li>
        <li><a class="${isActive("new-arrivals.html")}" href="${prefix}new-arrivals.html">New Arrivals</a></li>
        <li><a class="${isActive("luxury-handbags.html")}" href="${prefix}luxury-handbags.html">Handbags</a></li>
        <li><a class="${isActive("gallery.html")}" href="${prefix}gallery.html">Gallery</a></li>
        <li><a class="${isActive("about.html")}" href="${prefix}about.html">About</a></li>
        <li><a class="${isActive("contact.html")}" href="${prefix}contact.html">Contact</a></li>
        <li><a class="${isActive("login.html")}" href="${prefix}customer/login.html">Login</a></li>
      </ul>
    </nav>

    <div class="site-icons">
      <a href="${prefix}search-results.html" title="Search">🔍</a>
      <a href="${prefix}customer/login.html" title="Account">👤</a>
      <a href="${prefix}wishlist.html" title="Wishlist">♡</a>
      <a href="${prefix}shopping-cart.html" title="Cart">🛒</a>
    </div>
  </header>
  `;

  /* =========================
      FOOTER
  ========================== */
  const footerHTML = `
  <footer style="background:#0d0705; color:#777; text-align:center; padding:34px 20px; font-size:.8rem; border-top:1px solid rgba(255,255,255,.08); font-family:'Lato',sans-serif;">
    <p>&copy; 2025 Britium Gallery. All Rights Reserved.</p>
    <p style="margin-top:10px;">
      <a href="${prefix}terms.html" style="color:#aaa;text-decoration:none">Terms</a> |
      <a href="${prefix}privacy.html" style="color:#aaa;text-decoration:none">Privacy</a>
    </p>
  </footer>
  `;

  // Inject
  const headerTarget = document.getElementById("siteHeader");
  const footerTarget = document.getElementById("siteFooter");

  if (headerTarget) headerTarget.innerHTML = headerHTML;
  if (footerTarget) footerTarget.innerHTML = footerHTML;

});
