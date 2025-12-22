document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     AUTH CHECK
  ========================== */
  const isLoggedIn = localStorage.getItem("britium_admin_logged_in");
  const currentPage = location.pathname.split("/").pop();

  if (!isLoggedIn && currentPage !== "admin-login.html") {
    location.href = "admin-login.html";
    return;
  }

  /* =========================
     ACTIVE PAGE HELPER
  ========================== */
  const isActive = (file) =>
    currentPage === file ? "active" : "";

  /* =========================
     ADMIN HEADER
  ========================== */
  const adminHeaderHTML = `
    <style>
      header.admin-header{
        position:fixed;
        top:0; left:0; right:0;
        height:64px;
        background:#0f172a;
        color:#fff;
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:0 28px;
        z-index:1000;
        font-family:Inter, sans-serif;
        border-bottom:1px solid rgba(255,255,255,.08);
      }
      .admin-brand{font-weight:700;letter-spacing:1px}
      .admin-logout{cursor:pointer;font-size:.9rem}
      .admin-logout:hover{opacity:.8}
    </style>

    <header class="admin-header">
      <div class="admin-brand">BRITIUM ADMIN</div>
      <div class="admin-logout" id="adminLogout">Logout</div>
    </header>
  `;

  /* =========================
     ADMIN SIDEBAR
  ========================== */
  const adminSidebarHTML = `
    <style>
      aside.admin-sidebar{
        position:fixed;
        top:64px; left:0; bottom:0;
        width:240px;
        background:#020617;
        padding:20px 14px;
        font-family:Inter, sans-serif;
      }
      .admin-menu{
        list-style:none;
        display:flex;
        flex-direction:column;
        gap:6px;
      }
      .admin-menu a{
        padding:12px 14px;
        color:#cbd5f5;
        text-decoration:none;
        border-radius:8px;
        font-size:.9rem;
        display:flex;
        gap:12px;
        align-items:center;
      }
      .admin-menu a:hover,
      .admin-menu a.active{
        background:#1e293b;
        color:#fff;
        font-weight:600;
      }
    </style>

    <aside class="admin-sidebar">
      <ul class="admin-menu">
        <li><a class="${isActive("admin-dashboard.html")}" href="admin-dashboard.html">🏠 Dashboard</a></li>
        <li><a class="${isActive("admin-orders.html")}" href="admin-orders.html">📦 Orders</a></li>
        <li><a class="${isActive("admin-products.html")}" href="admin-products.html">👜 Products</a></li>
        <li><a class="${isActive("admin-customers.html")}" href="admin-customers.html">👥 Customers</a></li>
        <li><a class="${isActive("admin-settings.html")}" href="admin-settings.html">⚙️ Settings</a></li>
      </ul>
    </aside>
  `;

  /* =========================
     INJECT
  ========================== */
  const headerTarget = document.getElementById("adminHeader");
  const sidebarTarget = document.getElementById("adminSidebar");

  if (headerTarget) headerTarget.innerHTML = adminHeaderHTML;
  if (sidebarTarget) sidebarTarget.innerHTML = adminSidebarHTML;

  /* =========================
     LOGOUT
  ========================== */
  const logoutBtn = document.getElementById("adminLogout");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      localStorage.removeItem("britium_admin_logged_in");
      location.href = "admin-login.html";
    };
  }
});
