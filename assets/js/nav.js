document.addEventListener("DOMContentLoaded", () => {

  // --- 1. SMART PATH DETECTION ---
  
  // Get current file name (e.g., "index.html" or "login.html")
  const pathParts = location.pathname.split("/");
  const currentPage = (pathParts.pop() || "index.html").toLowerCase();

  // Check if we are deep inside a subfolder (like /customer/ or /admin/)
  const isInSubfolder = location.pathname.includes("/customer/") || 
                        location.pathname.includes("/admin/") || 
                        location.pathname.includes("/dashboard/");

  // Set the "Go Back Up" prefix
  // If inside a folder, prefix = "../". If at root, prefix = "".
  const prefix = isInSubfolder ? "../" : "";

  // Helper to highlight the current page
  const isActive = (pageName) => currentPage === pageName.toLowerCase() ? "active" : "";


  /* =========================
      HEADER SECTION
  ========================== */
  const headerHTML = `
  <style>
    /* BASIC MENU STYLES */
    :root{ --bg-dark:#1a0f0a; --gold:#debb6e; --border:rgba(222,187,110,.20); }
    
    header.site-header{ 
        padding:18px 50px; 
        display:flex; 
        justify-content:space-between; 
        align-items:center; 
        border-bottom:1px solid var(--border); 
        background:rgba(26,15,10,.95); 
        position:sticky; 
        top:0; 
        z-index:999; 
        backdrop-filter:blur(10px); 
        font-family:'Lato',sans-serif; 
    }

    /* LOGO */
    .site-logo{ font-family:'Playfair Display',serif; font-size:1.5rem; font-weight:700; color:var(--gold); text-decoration:none; display:flex; flex-direction:column; line-height:1; }
    .site-logo span{ font-size:0.6rem; letter-spacing:3px; color:#fff; margin-top:3px; }

    /* NAV LINKS */
    nav.site-nav ul{ display:flex; list-style:none; gap:20px; margin:0; padding:0; }
    nav.site-nav a{ text-decoration:none; color:#ddd; font-size:0.85rem; text-transform:uppercase; letter-spacing:1px; transition:0.3s; padding:5px; }
    nav.site-nav a:hover{ color:var(--gold); }
    nav.site-nav a.active{ color:#1a0f0a; background:var(--gold); font-weight:bold; border-radius:4px; padding:5px 10px;}

    /* ICONS */
    .site-icons{ display:flex; gap:15px; font-size:1.2rem; }
    .site-icons a{ text-decoration:none; color:var(--gold); transition:0.3s; }
    .site-icons a:hover{ opacity:0.7; }

    /* MOBILE RESPONSIVE */
    @media(max-width: 900px){
        nav.site-nav ul { display:none; } /* Hide menu on small screens for now */
        header.site-header { padding: 15px 20px; }
    }
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
        <li><a class="${isActive("blog.html")}" href="${prefix}blog.html">Blog</a></li>
        <li><a class="${isActive("faq.html")}" href="${prefix}faq.html">FAQ</a></li>
        <li><a class="${isActive("about.html")}" href="${prefix}about.html">About</a></li>
        <li><a class="${isActive("contact.html")}" href="${prefix}contact.html">Contact</a></li>
        
        <li><a class="${isActive("login.html")}" href="${prefix}customer/login.html">Login</a></li>
      </ul>
    </nav>

    <div class="site-icons">
      <a href="${prefix}search.html">🔍</a>
      <a href="${prefix}customer/login.html">👤</a> <a href="${prefix}wishlist.html">♡</a>
      <a href="${prefix}cart.html">🛒</a>
    </div>
  </header>
  `;


  /* =========================
      FOOTER SECTION
  ========================== */
  const footerHTML = `
  <footer style="background:#0d0705; color:#777; text-align:center; padding:40px 20px; font-size:0.8rem; border-top:1px solid #222; font-family:'Lato',sans-serif;">
    <p>&copy; 2025 Britium Gallery. All Rights Reserved.</p>
    <p style="margin-top:15px;">
      <a href="${prefix}terms.html" style="color:#888; text-decoration:none; margin:0 10px;">Terms</a> |
      <a href="${prefix}privacy.html" style="color:#888; text-decoration:none; margin:0 10px;">Privacy</a> |
      <a href="${prefix}faq.html" style="color:#888; text-decoration:none; margin:0 10px;">FAQ</a> |
      <a href="${prefix}contact.html" style="color:#888; text-decoration:none; margin:0 10px;">Contact</a>
    </p>
  </footer>
  `;


  /* =========================
      INJECT INTO PAGE
  ========================== */
  // Find the empty div boxes in your HTML
  const headerContainer = document.getElementById("siteHeader");
  const footerContainer = document.getElementById("siteFooter");

  // Put the HTML inside them
  if (headerContainer) headerContainer.innerHTML = headerHTML;
  if (footerContainer) footerContainer.innerHTML = footerHTML;

});
