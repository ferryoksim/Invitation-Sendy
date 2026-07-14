/* ==========================================================================
   admin.js — admin login (admin-login.html)
   ========================================================================== */

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'sen1';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('admin-login-form');
  if (!form) return;

  const card = form;
  const message = document.getElementById('admin-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value.trim();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      message.textContent = 'Welcome back, Senn!';
      message.className = 'pin-message success';
      sessionStorage.setItem('senn_admin_authed', 'true');
      setTimeout(() => navigateWithTransition('dashboard.html'), 700);
    } else {
      message.textContent = 'Incorrect username or password.';
      message.className = 'pin-message error';
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');
    }
  });
});
