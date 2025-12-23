/* =========================
   CUSTOMER AUTH (Mock)
   Backend-ready wrapper:
   - swap storage calls with API later
========================= */

const CUSTOMER_USERS_KEY = "britium_users";
const CUSTOMER_SESSION_KEY = "britium_customer_session";
const EMAIL_VERIFY_KEY = "britium_email_verification_tokens";
const RESET_KEY = "britium_password_reset_tokens";

/** ---- Storage helpers (replace later with API) ---- */
function getCustomers() {
  return JSON.parse(localStorage.getItem(CUSTOMER_USERS_KEY) || "[]");
}
function saveCustomers(users) {
  localStorage.setItem(CUSTOMER_USERS_KEY, JSON.stringify(users));
}

function createSession(session, ttlMs) {
  const payload = {
    ...session,
    expiresAt: Date.now() + ttlMs
  };
  localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(payload));
  return payload;
}

function getSession() {
  const s = JSON.parse(localStorage.getItem(CUSTOMER_SESSION_KEY) || "null");
  if (!s) return null;
  if (Date.now() > s.expiresAt) {
    localStorage.removeItem(CUSTOMER_SESSION_KEY);
    return null;
  }
  return s;
}

function logoutCustomer() {
  localStorage.removeItem(CUSTOMER_SESSION_KEY);
}

/** ---- Email verification mock ---- */
function makeToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function createEmailVerificationToken(email) {
  const tokens = JSON.parse(localStorage.getItem(EMAIL_VERIFY_KEY) || "{}");
  const token = makeToken();
  tokens[token] = { email, createdAt: Date.now() };
  localStorage.setItem(EMAIL_VERIFY_KEY, JSON.stringify(tokens));
  return token;
}

function verifyEmailByToken(token) {
  const tokens = JSON.parse(localStorage.getItem(EMAIL_VERIFY_KEY) || "{}");
  const row = tokens[token];
  if (!row) return { ok: false, message: "Invalid or expired token." };

  const users = getCustomers();
  const idx = users.findIndex(u => u.email === row.email);
  if (idx === -1) return { ok: false, message: "User not found." };

  users[idx].emailVerified = true;
  saveCustomers(users);

  delete tokens[token];
  localStorage.setItem(EMAIL_VERIFY_KEY, JSON.stringify(tokens));

  return { ok: true, message: "Email verified successfully." };
}

/** ---- Password reset mock ---- */
function createResetToken(email) {
  const users = getCustomers();
  const exists = users.find(u => u.email === email);
  if (!exists) return null;

  const tokens = JSON.parse(localStorage.getItem(RESET_KEY) || "{}");
  const token = makeToken();
  tokens[token] = { email, createdAt: Date.now() };
  localStorage.setItem(RESET_KEY, JSON.stringify(tokens));
  return token;
}

function resetPasswordByToken(token, newPassword) {
  const tokens = JSON.parse(localStorage.getItem(RESET_KEY) || "{}");
  const row = tokens[token];
  if (!row) return { ok: false, message: "Invalid or expired token." };

  const users = getCustomers();
  const idx = users.findIndex(u => u.email === row.email);
  if (idx === -1) return { ok: false, message: "User not found." };

  users[idx].password = newPassword; // mock only (backend should hash)
  saveCustomers(users);

  delete tokens[token];
  localStorage.setItem(RESET_KEY, JSON.stringify(tokens));

  return { ok: true, message: "Password updated successfully." };
}
