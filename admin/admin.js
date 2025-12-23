document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     CONFIG
  ========================================================= */
  const ADMIN_SESSION_KEY = "adminSession";
  const SIDEBAR_STATE_KEY = "adminSidebarCollapsed";

  // Role permissions by page key (folder name after /admin/)
  const PERMISSIONS = {
    admin:   ["dashboard","orders","product","coupon","project","refund","return","report","staff","user"],
    manager: ["dashboard","orders","product","coupon","project","refund","return","report"],
    staff:   ["dashboard","orders","product","return"],
    viewer:  ["dashboard","report"]
  };

  // Sidebar nav items (key must match folder name)
  const NAV_ITEMS = [
    { key: "dashboard", label: "Dashboard", href: "/admin/dashboard/index.html", roles: ["admin","manager","staff","viewer"] },
    { key: "orders",    label: "Orders",    href: "/admin/orders/index.html",    roles: ["admin","manager","staff"] },
    { key: "product",   label: "Products",  href: "/admin/product/index.html",   roles: ["admin","manager","staff"] },
    { key: "coupon",    label: "Coupons",   href: "/admin/coupon/index.html",    roles: ["admin","manager"] },
    { key: "project",   label: "Projects",  href: "/admin/project/index.html",   roles: ["admin","manager"] },
    { key: "refund",    label: "Refunds",   href: "/admin/refund/index.html",    roles: ["admin","manager"] },
    { key: "return",    label: "Returns",   href: "/admin/return/index.html",    roles: ["admin","manager","staff"] },
    { key: "report",    label: "Reports",   href: "/admin/report/index.html",    roles: ["admin","manager","viewer"] },
    { key: "staff",     label: "Staff",     href: "/admin/staff/index.html",     roles: ["admin"] },
    { key: "user",      label: "Users",     href: "/admin/user/index.html",      roles: ["admin","manager"] }
  ];

  /* =========================================================
     HELPERS: PATH / SESSION / PERMS
  ========================================================= */
  function normalizePath(p) {
    return (p || "").replace(/\/+$/, "");
  }

  function getAdminPageKey() {
    // /admin/product/index.html -> "product"
    const parts = normalizePath(location.pathname).split("/");
    const i = parts.indexOf("admin");
    if (i === -1) return "";
    return (parts[i + 1] || "").toLowerCase();
  }

  function isLoginPage() {
    const key = getAdminPageKey();
    return key === "login";
  }

  function getSession() {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;

    try {
      const s = JSON.parse(raw);
      if (!s || !s.expiresAt || Date.now() > s.expiresAt) {
        localStorage.removeItem(ADMIN_SESSION_KEY);
        return null;
      }
      return s;
    } catch {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }
  }

  function logout() {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    location.href = "/admin/login/index.html";
  }

  function isAllowed(session, pageKey) {
    if (!session?.role) return false;
    if (!pageKey || pageKey === "login") return true;
    const allowList = PERMISSIONS[session.role] || [];
    return allowList.includes(pageKey);
  }

  function guard() {
    const session = getSession();
    const key = getAdminPageKey();

    // If on login page, do not force header/sidebar
    if (isLoginPage()) return { session: null, pageKey: key };

    // Require session for all other /admin/* pages
    if (!session) {
      location.href = "/admin/login/index.html";
      return { session: null, pageKey: key };
    }

    // Page-level permission blocking
    if (!isAllowed(session, key)) {
      alert("Access denied.");
      location.href = "/admin/dashboard/index.html";
      return { session: null, pageKey: key };
    }

    return { session, pageKey: key };
  }

  /* =========================================================
     COLLAPSIBLE SIDEBAR
  ========================================================= */
  function getSidebarCollapsed() {
    return localStorage.getItem(SIDEBAR_STATE_KEY) === "1";
  }

  function setSidebarCollapsed(val) {
    localStorage.setItem(SIDEBAR_STATE_KEY, val ? "1" : "0");
    document.documentElement.classList.toggle("admin-sidebar-collapsed", !!val);
  }

  /* =========================================================
     RENDER UI (HEADER + SIDEBAR)
  ========================================================= */
  function renderHeader(session) {
    const timeLeftMs = Math.max(0, session.expiresAt - Date.now());
    const mins = Math.floor(timeLeftMs / 60000);
    const secs = Math.floor((timeLeftMs % 60000) / 1000);

    // Update timer live (optional)
    const timerText = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    return `
      <style>
        :root{
          --admin-bg:#0f172a;
          --admin-panel:#111827;
          --admin-border:#1f2937;
          --admin-text:#e5e7eb;
          --admin-muted:#9ca3af;
          --admin-accent:#6366f1;
          --admin-card:#0b1220;
        }

        html.admin-sidebar-collapsed .admin-sidebar{
          width:72px;
        }
        html.admin-sidebar-collapsed .admin-sidebar .nav-label{
          display:none;
        }
        html.admin-sidebar-collapsed main{
          margin-left:72px !important;
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
          padding:0 18px;
          z-index:1000;
          font-family:Inter, system-ui, sans-serif;
        }

        .admin-left{
          display:flex;
          align-items:center;
          gap:12px;
          min-width:240px;
        }

        .admin-toggle{
          width:40px;
          height:40px;
          border-radius:10px;
          border:1px solid var(--admin-border);
          background:rgba(255,255,255,.04);
          color:var(--admin-text);
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:18px;
        }
        .admin-toggle:hover{ background:rgba(255,255,255,.07); }

        .admin-brand{
          font-size:1.05rem;
          font-weight:900;
          color:#fff;
          letter-spacing:.3px;
          white-space:nowrap;
        }

        .admin-right{
          display:flex;
          align-items:center;
          gap:12px;
        }

        .admin-chip{
          background:rgba(255,255,255,.04);
          border:1px solid var(--admin-border);
          color:var(--admin-muted);
          padding:8px 10px;
          border-radius:999px;
          font-size:.85rem;
          display:flex;
          align-items:center;
          gap:8px;
          white-space:nowrap;
        }

        .admin-user{
          position:relative;
        }

        .admin-user-btn{
          background:rgba(255,255,255,.04);
          border:1px solid var(--admin-border);
          color:var(--admin-text);
          padding:9px 12px;
          border-radius:12px;
          cursor:pointer;
          font-size:.88rem;
          font-weight:700;
          display:flex;
          align-items:center;
          gap:8px;
          white-space:nowrap;
        }

        .admin-menu{
          position:absolute;
          right:0;
          top:46px;
          width:220px;
          background:var(--admin-panel);
          border:1px solid var(--admin-border);
          border-radius:14px;
          box-shadow:0 20px 60px rgba(0,0,0,.35);
          overflow:hidden;
          display:none;
          z-index:1001;
        }

        .admin-menu.open{ display:block; }

        .admin-menu .meta{
          padding:12px 14px;
          border-bottom:1px solid var(--admin-border);
          color:var(--admin-muted);
          font-size:.85rem;
          line-height:1.35;
        }

        .admin-menu button{
          width:100%;
          text-align:left;
          padding:12px 14px;
          background:transparent;
          border:none;
          color:var(--admin-text);
          cursor:pointer;
          font-weight:800;
          font-size:.9rem;
        }
        .admin-menu button:hover{ background:rgba(255,255,255,.06); }

        @media(max-width:980px){
          .admin-left{ min-width:auto; }
        }
      </style>

      <header class="admin-header">
        <div class="admin-left">
          <button class="admin-toggle" id="adminSidebarToggle" title="Toggle sidebar">☰</button>
          <div class="admin-brand">Britium Admin</div>
        </div>

        <div class="admin-right">
          <div class="admin-chip" title="Session time remaining">
            <span>Session</span>
            <strong id="adminSessionTimer" style="color:#fff;">${timerText}</strong>
          </div>

          <div class="admin-chip" title="Role">
            <span>Role</span>
            <strong style="color:#fff;">${session.role}</strong>
          </div>

          <div class="admin-user">
            <button class="admin-user-btn" id="adminUserBtn">
              ${session.email || "Admin"} ▾
            </button>

            <div class="admin-menu" id="adminUserMenu">
              <div class="meta">
                <div><strong style="color:#fff;">${session.email || "Admin"}</strong></div>
                <div>Role: ${session.role}</div>
              </div>
              <button id="adminLogoutBtn">Logout</button>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  function renderSidebar(session, pageKey) {
    const allowed = new Set(PERMISSIONS[session.role] || []);
    const items = NAV_ITEMS
      .filter(it => it.roles.includes(session.role) && allowed.has(it.key))
      .map(it => {
        const active = it.key === pageKey ? "active" : "";
        return `<li><a class="${active}" href="${it.href}"><span class="nav-dot"></span><span class="nav-label">${it.label}</span></a></li>`;
      })
      .join("");

    return `
      <style>
        aside.admin-sidebar{
          position:fixed;
          top:70px;
          left:0;
          width:240px;
          height:calc(100vh - 70px);
          background:var(--admin-panel);
          border-right:1px solid var(--admin-border);
          padding:14px 12px;
          overflow-y:auto;
          font-family:Inter, system-ui, sans-serif;
          transition:width .2s ease;
        }

        .admin-nav{
          list-style:none;
          margin:0;
          padding:0;
          display:flex;
          flex-direction:column;
          gap:6px;
        }

        .admin-nav a{
          display:flex;
          align-items:center;
          gap:12px;
          padding:11px 12px;
          border-radius:12px;
          text-decoration:none;
          color:var(--admin-text);
          font-size:.92rem;
          transition:.15s;
          border:1px solid transparent;
        }

        .admin-nav a:hover{
          background:rgba(255,255,255,.06);
          border-color:rgba(255,255,255,.06);
        }

        .admin-nav a.active{
          background:rgba(99,102,241,.18);
          border-color:rgba(99,102,241,.45);
          color:#fff;
          font-weight:800;
        }

        .nav-dot{
          width:10px;
          height:10px;
          border-radius:999px;
          background:rgba(255,255,255,.18);
          flex:0 0 auto;
        }
        .admin-nav a.active .nav-dot{
          background:var(--admin-accent);
        }

        @media(max-width:980px){
          aside.admin-sidebar{ display:none; }
          main{ margin-left:0 !important; }
        }
      </style>

      <aside class="admin-sidebar" id="adminSidebarEl">
        <ul class="admin-nav">
          ${items}
        </ul>
      </aside>
    `;
  }

  /* =========================================================
     BOOT
  ========================================================= */
  const { session, pageKey } = guard();
  if (!session) return; // redirected or login page

  // Apply persisted collapsed state
  setSidebarCollapsed(getSidebarCollapsed());

  // Inject containers required by your pages
  const headerTarget = document.getElementById("adminHeader");
  const sidebarTarget = document.getElementById("adminSidebar");

  if (headerTarget) headerTarget.innerHTML = renderHeader(session);
  if (sidebarTarget) sidebarTarget.innerHTML = renderSidebar(session, pageKey);

  /* =========================================================
     HEADER INTERACTIONS
  ========================================================= */
  const toggleBtn = document.getElementById("adminSidebarToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      setSidebarCollapsed(!getSidebarCollapsed());
    });
  }

  const userBtn = document.getElementById("adminUserBtn");
  const userMenu = document.getElementById("adminUserMenu");
  if (userBtn && userMenu) {
    userBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      userMenu.classList.toggle("open");
    });

    document.addEventListener("click", () => {
      userMenu.classList.remove("open");
    });
  }

  const logoutBtn = document.getElementById("adminLogoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);

  /* =========================================================
     SESSION COUNTDOWN + AUTO LOGOUT
  ========================================================= */
  const timerEl = document.getElementById("adminSessionTimer");
  const tick = () => {
    const s = getSession();
    if (!s) {
      // session expired; force logout
      logout();
      return;
    }

    const ms = Math.max(0, s.expiresAt - Date.now());
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);

    if (timerEl) timerEl.textContent = `${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
  };

  tick();
  setInterval(tick, 1000);

  /* =========================================================
     OPTIONAL: ANALYTICS WIDGET HOOK
     If a page has an element with id="adminWidgets",
     you can inject simple widgets here later.
  ========================================================= */
  const widgetHost = document.getElementById("adminWidgets");
  if (widgetHost && pageKey === "dashboard") {
    // Keep it minimal: only show if you create #adminWidgets in dashboard page
    widgetHost.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-bottom:18px;">
        <div style="background:var(--admin-card);border:1px solid var(--admin-border);border-radius:14px;padding:16px;color:var(--admin-text);">
          <div style="color:var(--admin-muted);font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;">Active Sessions</div>
          <div style="font-size:1.6rem;font-weight:900;margin-top:6px;">1</div>
        </div>
        <div style="background:var(--admin-card);border:1px solid var(--admin-border);border-radius:14px;padding:16px;color:var(--admin-text);">
          <div style="color:var(--admin-muted);font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;">Role</div>
          <div style="font-size:1.2rem;font-weight:900;margin-top:6px;text-transform:uppercase;">${session.role}</div>
        </div>
      </div>
    `;
  }
});
