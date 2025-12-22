document.addEventListener("DOMContentLoaded", () => {

  const page =
    (location.pathname.split("/").pop() || "index.html").toLowerCase();

  const isActive = (file) =>
    page === file.toLowerCase() ? "active" : "";

  /* =========================
     HEADER
  ========================== */
  const headerHTML = `
  <style>
    :root{
      --bg-dark:#1a0f0a;
      --gold:#debb6e;
      --border:rgba(222,187,110,.20);
    }

    header.site-header{
      padding:18px 50px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      border-bottom:1px solid var(--border);
      background:rgba(26,15,10,.92);
      position:sticky;
      top:0;
      z-index:999;
      backdrop-filter:blur(10px);
      font-family:'Lato',sans-serif;
    }

    .site-logo{
      font-family:'Playfair Display',serif;
      font-size:1.55rem;
      font-weight:700;
      color:var(--gold);
      line-height:1;
      display:flex;
      flex-direction:column;
      text-decoration:none;
    }

    .site-logo span{
      font-size:.65rem;
      letter-spacing:3px;
      margin-top:4px;
      color:#fff;
    }

    nav.site-nav ul{
      display:flex;
      list-style:none;
      gap:18px;
      flex-wrap:wrap;
      justify-content:center;
    }

    nav.site-nav a{
      text-decoration:none;
      color:#e6e6e6;
      font-size:.82rem;
      text-transform:uppercase;
      letter-spacing:1px;
      padding:8px 10px;
      border-radius:6px;
      transition:.25s;
    }

    nav.site-nav a:hover{
      color:var(--gold);
    }

    nav.site-nav a.active{
      color:#1a0f0a;
      background:var(--gold);
      font-weight:700;
    }

    .site-icons{
      display:flex;
      gap:14px;
      align-items:center;
      color:var(--gold);
      font-size:1.1rem;
    }

    .site-icons a{
      text-decoration:none;
      color:inherit;
    }

    .site-icons a:hover{
      opacity:.85;
    }

    @media(max-width:980px){
      nav.site-nav ul{
        display:none;
      }
      header.site-header{
        padding:18px 18px;
      }
    }
  </style>

  <header class="site-header">
    <a class="site-logo" href="index.html">
      BRITIUM <span>GALLERY</span>
    </a>

    <nav class="site-nav">
      <ul>
        <li><a class="${isActive("index.html")}" href="index.html">Home</a></li>
        <li><a class="${isActive("shop.html")}" href="shop.html">Shop</a></li>
        <li><a class="${isActive("new-arrivals.html")}" href="new-arrivals.html">New Arrivals</a></li>
        <li><a class="${isActive("luxury-handbags.html")}" href="luxury-handbags.html">Luxury Handbags</a></li>
        <li><a class="${isActive("gallery.html")}" href="gallery.html">Gallery</a></li>
        <li><a class="${isActive("about.html")}" href="about.html">About</a></li>
        <li><a class="${isActive("blog.html")}" href="blog.html">Blog</a></li>
        <li><a class="${isActive("faq.html")}" href="faq.html">FAQ</a></li>
        <li><a class="${isActive("contact.html")}" href="contact.html">Contact</a></li>
        <li><a class="${isActive("login.html")}" href="login.html">Login</a></li>
      </ul>
    </nav>

    <div class="site-icons">
      <a href="search-results.html" title="Search">🔍</a>
      <a href="customer-login.html" title="Account">👤</a>
      <a href="wishlist.html" title="Wishlist">♡</a>
      <a href="shopping-cart.html" title="Cart">🛒</a>
    </div>
  </header>
  `;

  /* =========================
     FOOTER
  ========================== */
  const footerHTML = `
  <footer style="
    background:#0d0705;
    color:#777;
    text-align:center;
    padding:34px 20px;
    font-size:.8rem;
    border-top:1px solid rgba(255,255,255,.08);
    font-family:'Lato',sans-serif;
  ">
    <p>&copy; 2025 Britium Gallery. All Rights Reserved.</p>
    <p style="margin-top:10px;">
      <a href="terms-and-conditions.html" style="color:#aaa;text-decoration:none">Terms</a> |
      <a href="privacy-policy.html" style="color:#aaa;text-decoration:none">Privacy</a> |
      <a href="store-locator.html" style="color:#aaa;text-decoration:none">Locations</a>
    </p>
  </footer>
  `;

  /* =========================
     INJECT SAFELY
  ========================== */
  const headerTarget = document.getElementById("siteHeader");
  const footerTarget = document.getElementById("siteFooter");

  if (headerTarget) headerTarget.innerHTML = headerHTML;
  if (footerTarget) footerTarget.innerHTML = footerHTML;

});
