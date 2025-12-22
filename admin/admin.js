document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     PATH & ACTIVE STATE
  ========================== */
  const path = location.pathname.replace(/\/$/, "");
  const page = path.split("/").pop().toLowerCase();

  const isActive = (name) =>
    page === name.toLowerCase() ? "active" : "";

  /* =========================
     HEADER
  ========================== */
  const headerHTML = `
  <style>
    :root{
      --admin-bg:#0f172a;
      --admin-panel:#111827;
      --admin-border:#1f2937;
      --admin-text:#e5e7eb;
      --admin-muted:#9ca3af;
      --admin-accent:#6366f1;
    }

    header.admin-header{
      position:fixed;
      top:0; left:0; right:0;
      height:70px;
      background:var(--admin-bg);
      border-bottom:1px solid var(--admin-border);
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:0 28px;
      z-index:1000;
      font-family:Inter, sans-serif;
    }

    .admin-brand{
      font-size:1.2rem;
      font-weight:800;
      color:#fff;
      letter-spacing:.5px;
    }

    .admin-user{
      color:var(--admin-muted);
      font-size:.9rem;
      cursor:pointer;
    }
  </style>

  <header class="admin-header">
    <div class="admin-brand">Britium Admin</div>
    <div class="admin-user">Admin ▾</div>
  </header>
  `;

  /* =========================
     SIDEBAR
  ========================== */
  const sidebarHTML = `
  <style>
    aside.admin-sidebar{
      position:fixed;
      top:70px;
      left:0;
      width:240px;
      height:calc(100vh - 70px);
      background:var(--admin-panel);
      border-right:1px solid var(--admin-border);
      padding:18px 14px;
      overflow-y:auto;
      font-family:Inter, sans-serif;
    }

    .admin-nav{
      list-style:none;
      margin:0;
      padding:0;
      display:flex;
      flex-direction:column;
      gap:4px;
    }

    .admin-nav a{
      display:flex;
      align-items:center;
      gap:12px;
      padding:11px 14px;
      border-radius:10px;
      text-decoration:none;
      color:var(--admin-text);
      font-size:.9rem;
      transition:.2s;
    }

    .admin-nav a:hover{
      background:#1f2937;
    }

    .admin-nav a.active{
      background:var(--admin-accent);
      color:#fff;
      font-weight:700;
    }

    @media(max-width:980px){
      aside.admin-sidebar{
        display:none;
      }
    }
  </style>

  <aside class="admin-sidebar">
    <ul class="admin-nav">
      <li><a class="${isActive("dashboard")}" href="/admin/dashboard">Dashboard</a></li>
      <li><a class="${isActive("orders")}" href="/admin/orders">Orders</a></li>
      <li><a class="${isActive("product")}" href="/admin/product">Products</a></li>
      <li><a class="${isActive("coupon")}" href="/admin/coupon">Coupons</a></li>
      <li><a class="${isActive("project")}" href="/admin/project">Projects</a></li>
      <li><a class="${isActive("refund")}" href="/admin/refund">Refunds</a></li>
      <li><a class="${isActive("return")}" href="/admin/return">Returns</a></li>
      <li><a class="${isActive("report")}" href="/admin/report">Reports</a></li>
      <li><a class="${isActive("staff")}" href="/admin/staff">Staff</a></li>
      <li><a class="${isActive("user")}" href="/admin/user">Users</a></li>
      <li><a class="${isActive("login")}" href="/admin/login">Logout</a></li>
    </ul>
  </aside>
  `;

  /* =========================
     INJECT
  ========================== */
  const headerTarget = document.getElementById("adminHeader");
  const sidebarTarget = document.getElementById("adminSidebar");

  if (headerTarget) headerTarget.innerHTML = headerHTML;
  if (sidebarTarget) sidebarTarget.innerHTML = sidebarHTML;

});
