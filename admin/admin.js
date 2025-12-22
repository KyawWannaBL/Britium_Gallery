document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     BASIC ADMIN AUTH CHECK
     (frontend placeholder)
  ========================== */
  const isAdminLoggedIn = localStorage.getItem("britium_admin_logged_in");

  if (!isAdminLoggedIn) {
    // Redirect non-admin users
    if (!location.pathname.includes("admin-login.html")) {
      location.href = "admin-login.html";
      return;
    }
  }

  /* =========================
     ACTIVE PAGE DETECTION
  ========================== */
  const page =
    (location.pathname.split("/").pop() || "").toLowerCase();

  const isActive = (file) =>
    page === file.toLowerCase() ? "active" : "";

  /* =========================
     ADMIN HEADER
  ========================== */
  const adminHeaderHTML = `
  <style>
    :root{
      --admin-dark:#0a0a0a;
      --admin-panel:#111;
      --admin-border:#262626;
      --admin-accent:#3b82f6;
      --admin-text:#e5e7eb;
      --admin-muted:#9ca3af;
    }

    header.admin-header{
      height:60px;
      background:var(--admin-dark);
      border-bottom:1px solid var(--admin-border);
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:0 24px;
      position:fixed;
      top:0;
      left:0;
      right:0;
      z-index:1000;
      font-family:Inter, sans-serif;
    }

    .admin-brand{
      font-weight:700;
      letter-spacing:1px;
      color:#fff;
      font-size:1.05rem;
      text-transform:uppercase;
    }

    .admin-top-nav{
      display:flex;
      gap:28px;
    }

    .admin-top-nav a{
      color:var(--admin-muted);
      text-decoration:none;
      font-size:.9rem;
      font-weight:500;
    }

    .admin-top-nav a.active,
    .admin-top-nav a:hover{
      color:#fff;
    }

    .admin-profile{
      cursor:pointer;
      font-size:.85rem;
      color:#fff;
    }
  </style>

  <header class="admin-header">
    <div class="admin-brand">BRITIUM ADMIN</div>

    <nav class="admin-top-nav">
      <a class="${isActive("admin-dashboard.html")}" href="admin-dashboard.html">Dashboard</a>
      <a class="${isActive("project-management.html")}" href="project-management.html">Products</a>
      <a class="${isActive("orders-admin.html")}" href="orders-admin.html">Orders</a>
      <a class="${isActive("users-admin.html")}" href="users-admin.html">Users</a>
      <a class="${isActive("reports.html")}" href="reports.html">Reports</a>
    </nav>

    <div class="admin-profile" id="adminLogout">Logout</div>
  </header>
  `;

  /* =========================
     ADMIN SIDEBAR
  ========================== */
  const adminSidebarHTML = `
  <style>
    aside.admin-sidebar{
      width:250px;
      background:var(--admin-panel);
      border-right:1px solid var(--admin-border);
      padding:90px 16px 24px;
      position:fixed;
      top:0;
      bottom:0;
      left:0;
      font-family:Inter, sans-serif;
    }

    .admin-menu{
      list-style:none;
      display:flex;
      flex-direction:column;
      gap:6px;
    }

    .admin-menu a{
      display:flex;
      align-items:center;
      gap:12px;
      padding:12px 14px;
      border-radius:8px;
      color:var(--admin-muted);
      text-decoration:none;
      font-size:.9rem;
      transition:.2s;
    }

    .admin-menu a:hover{
      background:rgba(255,255,255,.06);
      color:#fff;
    }

    .admin-menu a.active{
      background:#1f2937;
      color:#fff;
      font-weight:600;
    }

    .admin-icon{
      width:18px;
      text-align:center;
    }

    @media(max-width:1024px){
      aside.admin-sidebar{
        width:70px;
      }
      .admin-menu span{
        display:none;
      }
    }
  </style>

  <aside class="admin-sidebar">
    <ul class="admin-menu">
      <li>
        <a class="${isActive("admin-dashboard.html")}" href="admin-dashboard.html">
          <span class="admin-icon">🏠</span><span>Dashboard</span>
        </a>
      </li>
      <li>
        <a class="${isActive("project-management.html")}" href="project-management.html">
          <span class="admin-icon">👜</span><span>Products</span>
        </a>
      </li>
      <li>
        <a class="${isActive("orders-admin.html")}" href="orders-admin.html">
          <span class="admin-icon">📦</span><span>Orders</span>
        </a>
      </li>
      <li>
        <a class="${isActive("return-request.html")}" href="return-request.html">
          <span class="admin-icon">↩️</span><span>Returns</span>
        </a>
      </li>
      <li>
        <a class="${isActive("settings.html")}" href="setting.html">
          <span class="admin-icon">⚙️</span><span>Settings</span>
        </a>
      </li>
    </ul>
  </aside>
  `;

  /* =========================
     INJECT INTO PAGE
  ========================== */
  const headerTarget = document.getElementById("adminHeader");
  const sidebarTarget = document.getElementById("adminSidebar");

  if (headerTarget) headerTarget.innerHTML = adminHeaderHTML;
  if (sidebarTarget) sidebarTarget.innerHTML = adminSidebarHTML;

  /* =========================
     LOGOUT HANDLER
  ========================== */
  const logoutBtn = document.getElementById("adminLogout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("britium_admin_logged_in");
      location.href = "admin-login.html";
    });
  }

});
