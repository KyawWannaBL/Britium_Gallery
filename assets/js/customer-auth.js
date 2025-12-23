/* =========================
   CUSTOMER AUTH (MOCK)
   Backend-ready
========================= */

const USERS_KEY = "britium_customers";
const SESSION_KEY = "britium_customer_session";
const VERIFY_KEY = "britium_email_tokens";
const RESET_KEY  = "britium_reset_tokens";

/* ---------- helpers ---------- */
const now = () => Date.now();
const uid = (p="CUS") => `${p}-${now()}`;
const token = () => Math.random().toString(36).slice(2) + now().toString(36);

/* ---------- storage ---------- */
const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
const saveUsers = (u) => localStorage.setItem(USERS_KEY, JSON.stringify(u));

/* ---------- session ---------- */
function createSession(user, ttl = 2 * 60 * 60 * 1000) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    ...user,
    expiresAt: now() + ttl
  }));
}

function getSession() {
  const s = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  if (!s || now() > s.expiresAt) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
  return s;
}

function logoutCustomer() {
  localStorage.removeItem(SESSION_KEY);
}

/* ---------- email verification ---------- */
function createVerifyToken(email) {
  const t = token();
  const map = JSON.parse(localStorage.getItem(VERIFY_KEY) || "{}");
  map[t] = { email, createdAt: now() };
  localStorage.setItem(VERIFY_KEY, JSON.stringify(map));
  return t;
}

function verifyEmail(t) {
  const map = JSON.parse(localStorage.getItem(VERIFY_KEY) || "{}");
  if (!map[t]) return "Invalid or expired token.";

  const users = getUsers();
  const u = users.find(x => x.email === map[t].email);
  if (!u) return "User not found.";

  u.emailVerified = true;
  saveUsers(users);

  delete map[t];
  localStorage.setItem(VERIFY_KEY, JSON.stringify(map));
  return "Email verified successfully.";
}

/* ---------- password reset ---------- */
function createResetToken(email) {
  const users = getUsers();
  if (!users.some(u => u.email === email)) return null;

  const t = token();
  const map = JSON.parse(localStorage.getItem(RESET_KEY) || "{}");
  map[t] = { email, createdAt: now() };
  localStorage.setItem(RESET_KEY, JSON.stringify(map));
  return t;
}

function resetPassword(t, pwd) {
  const map = JSON.parse(localStorage.getItem(RESET_KEY) || "{}");
  if (!map[t]) return "Invalid or expired token.";

  const users = getUsers();
  const u = users.find(x => x.email === map[t].email);
  if (!u) return "User not found.";

  u.password = pwd;
  saveUsers(users);

  delete map[t];
  localStorage.setItem(RESET_KEY, JSON.stringify(map));
  return "Password updated successfully.";
}
