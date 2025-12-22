document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     CONFIG
  ========================== */
  const LS_KEY = "britium_admin_logged_in";

  // Your renamed routes (can be folder routes or file routes)
  const ROUTES = {
    login: "login",
    dashboard: "dashboard",
    orders: "orders",
    project: "project",
    coupon: "coupon",
    refund: "refund",
    report: "report",
    return: "return",
    user: "user",
  };

  /* =========================
     PATH / PAGE DETECTION
     Supports:
     - /admin/dashboard
     - /admin/dashboard/
     - /admin/dashboard/index.html
     - /admin/dashboard.html
     - /admin/dashboard.php (etc)
  ========================== */
  function cleanSegment(seg) {
    return (seg || "").split("?")[0].split("#")[0].trim().toLowerCase();
  }

  function getCurrentRouteName() {
    const path = cleanSegment(location.pathname);

    // Split into segments and remove empty ones
    const parts = path.split("/").map(cleanSegment).filter(Boolean);

    if (!parts.length) return ""; // root

    let last = parts[parts.length - 1]; // e.g. "dashboard" or "index.html" or "dashboard.html"

    // If last is a file, strip extension
    if (last.includes(".")) {
      last = last.split(".")[0]; // dashboard.html -> dashboard
    }

    // If last is "index", route is previous folder name
    if (last === "index" && parts.length >= 2) {
      return parts[parts.length - 2];
    }

    return last;
  }

  const currentRoute = getCurrentRouteName();

  const isLoginRoute = currentRoute === ROUTES.login;

  /* =========================
     AUTH GUARD (frontend only)
  ========================== */
  const isLoggedIn = localStorage.getItem(LS_KEY) === "true";

  if (!isLoggedIn && !isLoginRoute) {
    // Redirect to login route
    // Works for folder route: "login"
    // Works for file route: "login.html" (if your server requires it, change below)
    location.href = ROUTES.login;
    return;
  }

  /* =========================
     ROUTE URL BUILDER
     If your admin pages are folders => use "dashboard"
     If your admin pages are files   => use "dashboard.html"
     Choose one mode and keep consistent.
  ========================== */
  const USE_HTML_FILES = false; // <-- set true if your routes are files (dashboard.html)

  function routeHref(routeName) {
    return USE_HTML_FILES ? `${routeName}.html` : routeName;
  }

  function isActive(routeName) {
    return currentRoute === routeName ? "active" : "";
  }

  /* =========================
     OPTIONAL: INJECT ADMIN NAV
     Put these in your admin pages where you want them:
       <div id="adminHeader"></div>
       <div id="adminSidebar"></div>
  ========================== */

  const adminHeaderHTML = `
    <style>
      :root{
        --a-bg:#0b0b0b;
        --a-panel:#111111;
        --a-border:rgba(255,255,255,.10);
        --a-gold:#c6a87c;
        --a-muted:#9a9a9a;
        --a-white:#ffffff;
      }

      header.admin-topbar{
        height:60px;
        background:var(--a-bg);
        border-bottom:1px solid var(--a-border);
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:0 22px;
        position:sticky;
        top:0;
        z-index:1000;
        font-family:'Jost', sans-serif;
      }

      .admin-brand{
        font-family:'Playfair Display', serif;
        color:var(--a-gold);
        font-size:1.1rem;
        letter-spacing:.5px;
      }

      .admin-toplinks{
        display:flex;
        gap:18px;
        flex-wrap:wrap;
        justify-content:center;
      }

      .admin-toplinks a{
        color:var(--a-muted);
        text-decoration:none;
        font-size:.9rem;
        padding:8px 10px;
        border-radius:8px;
        transition:.2s;
      }
      .admin-toplinks a:hover{ color:var(--a-white); background:rgba(255,255,255,.06); }
      .admin-toplinks a.active{ color:#000; background:var(--a-gold); font-weight:600; }

      .admin-actions{
        display:flex;
        align-items:center;
        gap:12px;
      }

      .admin-logout{
        cursor:pointer;
        border:1px solid rgba(198,168,124,.25);
        background:rgba(198,168,124,.12);
        color:#f5ead7;
        padding:8px 12px;
        border-radius:10px;
        font-weight:600;
        font-size:.85rem;
      }
      .admin-logout:hover{ background:rgba(198,168,124,.20); }

      @media(max-width:900px){
        .admin-toplinks{ display:none; }
      }
    </style>

    <header class="admin-topbar">
      <div class="admin-brand">Britium Admin</div>

      <nav class="admin-toplinks">
        <a class="${isActive(ROUTES.dashboard)}" href="${routeHref(ROUTES.dashboard)}">Dashboard</a>
        <a class="${isActive(ROUTES.orders)}" href="${routeHref(ROUTES.orders)}">Orders</a>
        <a class="${isActive(ROUTES.project)}" href="${routeHref(ROUTES.project)}">Project</a>
        <a class="${isActive(ROUTES.coupon)}" href="${routeHref(ROUTES.coupon)}">Coupon</a>
        <a class="${isActive(ROUTES.report)}" href="${routeHref(ROUTES.report)}">Report</a>
      </nav>

      <div class="admin-actions">
        <button class="admin-logout" id="adminLogoutBtn" type="button">Logout</button>
      </div>
    </header>
  `;

  const adminSidebarHTML = `
    <style>
      aside.admin-sidebar{
        width:260px;
        background:#080808;
        border-right:1px solid rgba(255,255,255,.10);
        padding:22px 16px;
        font-family:'Jost', sans-serif;
      }

      .admin-menu{
        list-style:none;
        display:flex;
        flex-direction:column;
        gap:8px;
        margin:0;
        padding:0;
      }

      .admin-menu a{
        display:flex;
        align-items:center;
        gap:10px;
        padding:12px 12px;
        border-radius:10px;
        color:#9a9a9a;
        text-decoration:none;
        transition:.2s;
        font-size:.95rem;
      }
      .admin-menu a:hover{
        color:#fff;
        background:rgba(255,255,255,.06);
      }
      .admin-menu a.active{
        background:rgba(198,168,124,.16);
        color:#c6a87c;
        font-weight:600;
      }

      .admin-sep{
        height:1px;
        background:rgba(255,255,255,.08);
        margin:12px 0;
      }
    </style>

    <aside class="admin-sidebar">
      <ul class="admin-menu">
        <li><a class="${isActive(ROUTES.dashboard)}" href="${routeHref(ROUTES.dashboard)}">🏠 Dashboard</a></li>
        <li><a class="${isActive(ROUTES.orders)}" href="${routeHref(ROUTES.orders)}">📦 Orders</a></li>
        <li><a class="${isActive(ROUTES.project)}" href="${routeHref(ROUTES.project)}">👜 Project</a></li>
        <li><a class="${isActive(ROUTES.user)}" href="${routeHref(ROUTES.user)}">👤 Users</a></li>
        <li><a class="${isActive(ROUTES.coupon)}" href="${routeHref(ROUTES.coupon)}">🏷️ Coupon</a></li>
        <li><a class="${isActive(ROUTES.refund)}" href="${routeHref(ROUTES.refund)}">💸 Refund</a></li>
        <li><a class="${isActive(ROUTES.return)}" href="${routeHref(ROUTES.return)}">↩️ Return</a></li>
        <li><a class="${isActive(ROUTES.report)}" href="${routeHref(ROUTES.report)}">📊 Report</a></li>

        <div class="admin-sep"></div>

        <li><a href="#" id="adminLogoutLink">🚪 Logout</a></li>
      </ul>
    </aside>
  `;

  const headerTarget = document.getElementById("adminHeader");
  const sidebarTarget = document.getElementById("adminSidebar");

  if (headerTarget) headerTarget.innerHTML = adminHeaderHTML;
  if (sidebarTarget) sidebarTarget.innerHTML = adminSidebarHTML;

  /* =========================
     LOGOUT
  ========================== */
  function doLogout() {
    localStorage.removeItem(LS_KEY);
    location.href = routeHref(ROUTES.login);
  }

  const logoutBtn = document.getElementById("adminLogoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", doLogout);

  const logoutLink = document.getElementById("adminLogoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      doLogout();
    });
  }

  /* =========================
     LOGIN PAGE SUBMIT (placeholder)
     - Your login page should have a <form>
     - On submit: sets LS_KEY=true then redirects dashboard
  ========================== */
  if (isLoginRoute) {
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Frontend placeholder auth
        localStorage.setItem(LS_KEY, "true");
        location.href = routeHref(ROUTES.dashboard);
      });
    }
  }
});
