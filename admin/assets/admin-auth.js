/* =========================
   ADMIN AUTH (MOCK)
   Backend-ready
========================= */

const ADMIN_SESSION_KEY = "britium_admin_session";

/* Role → permissions */
const ADMIN_PERMISSIONS = {
  admin:   ["dashboard","orders","product","coupon","project","refund","return","report","staff","user"],
  manager: ["dashboard","orders","product","coupon","project","refund","return","report"],
  staff:   ["dashboard","orders","product","return"],
  viewer:  ["dashboard","report"]
};

function getAdminSession() {
  const s = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY) || "null");
  if (!s || now() > s.expiresAt) {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    return null;
  }
  return s;
}

function createAdminSession(user, ttl = 60 * 60 * 1000) {
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({
    ...user,
    expiresAt: now() + ttl
  }));
}

function adminLogout() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  location.href = "/admin/login/index.html";
}

/* ---------- guards ---------- */
function getAdminPageKey() {
  const p = location.pathname.replace(/\/$/, "").split("/");
  const i = p.indexOf("admin");
  return (p[i + 1] || "").toLowerCase();
}

function requireAdmin() {
  const session = getAdminSession();
  const isLogin = location.pathname.includes("/admin/login");

  if (!session && !isLogin) {
    location.href = "/admin/login/index.html";
    return null;
  }

  if (!session) return null;

  const page = getAdminPageKey();
  if (!page || page === "login") return session;

  const allowed = ADMIN_PERMISSIONS[session.role] || [];
  if (!allowed.includes(page)) {
    alert("Access denied");
    location.href = "/admin/dashboard/index.html";
    return null;
  }

  return session;
}

/* ---------- helpers ---------- */
const now = () => Date.now();
<script src="/admin/assets/admin-auth.js"></script>
<script>
const session = requireAdmin();
if (session) hideUnauthorizedMenu(session.role);
</script>
  });
}
