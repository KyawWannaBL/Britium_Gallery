document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     AUTH GUARD
  ========================== */
  const session = JSON.parse(localStorage.getItem("adminSession") || "null");

  if (!session || session.expires < Date.now()) {
    localStorage.removeItem("adminSession");
    location.href = "/admin/login.html";
    return;
  }

  /* =========================
     PATH & ACTIVE STATE
  ========================== */
  const parts = location.pathname.split("/").filter(Boolean);
  const section = parts[parts.length - 1] || "dashboard";

  const isActive = (name) =>
    section === name ? "active" : "";

  /* =========================
     HEADER
  ========================== */
  const headerHTML = `
  <header class="admin-header">
    <div class="admin-brand">Britium Admin</div>
    <div class="admin-user" id="logoutBtn">Logout</div>
  </header>
  `;

  /* =========================
     SIDEBAR
  ========================== */
  const sidebarHTML = `
  <aside class="admin-sidebar">
    <ul class="admin-nav">
      <li><a class="${isActive("dashboard")}" href="/admin/dashboard/">Dashboard</a></li>
      <li><a class="${isActive("orders")}" href="/admin/orders/">Orders</a></li>
      <li><a class="${isActive("products")}" href="/admin/products/">Products</a></li>
      <li><a class="${isActive("coupon")}" href="/admin/coupon/">Coupons</a></li>
      <li><a class="${isActive("project")}" href="/admin/project/">Projects</a></li>
      <li><a class="${isActive("refund")}" href="/admin/refund/">Refunds</a></li>
      <li><a class="${isActive("return")}" href="/admin/return/">Returns</a></li>
      <li><a class="${isActive("report")}" href="/admin/report/">Reports</a></li>
      <li><a class="${isActive("staff")}" href="/admin/staff/">Staff</a></li>
      <li><a class="${isActive("user")}" href="/admin/user/">Users</a></li>
    </ul>
  </aside>
  `;

  /* =========================
     INJECT
  ========================== */
  document.getElementById("adminHeader").innerHTML = headerHTML;
  document.getElementById("adminSidebar").innerHTML = sidebarHTML;

  /* =========================
     LOGOUT
  ========================== */
  document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("adminSession");
    location.href = "/admin/login.html";
  };

});
