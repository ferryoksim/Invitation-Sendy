/* ==========================================================================
   password.js — secret code gate (password.html)
   ========================================================================== */

const SECRET_CODE = '2009';

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('pin-input');
  const card = document.getElementById('password-card');
  const message = document.getElementById('pin-message');
  const startBtn = document.getElementById('start-btn');
  const submitBtn = document.getElementById('submit-pin');

  function checkCode() {
    const value = input.value.trim();
    if (value === SECRET_CODE) {
      message.textContent = 'Access Granted 🤍';
      message.className = 'pin-message success';
      input.disabled = true;
      submitBtn.style.display = 'none';
      fireConfetti({ count: 50 });
      startBtn.style.display = 'inline-flex';
      startBtn.classList.add('fade-in');
      sessionStorage.setItem('senn_invite_unlocked', 'true');
    } else {
      message.textContent = "Oops! That's not the secret code.";
      message.className = 'pin-message error';
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');
    }
  }

  submitBtn.addEventListener('click', checkCode);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkCode();
  });

  startBtn.addEventListener('click', () => {
    navigateWithTransition('welcome.html');
  });
});
