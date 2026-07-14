/* ==========================================================================
   countdown.js — countdown timer to the birthday (closing.html)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const target = new Date('2026-08-15T12:40:00+07:00').getTime();
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
  if (!daysEl) return;

  function tick() {
    const now = Date.now();
    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);

  const finalBtn = document.getElementById('see-you-btn');
  if (finalBtn) {
    finalBtn.addEventListener('click', () => {
      fireConfetti({ count: 140 });
      const popup = document.getElementById('closing-popup');
      popup.classList.add('show');
    });
  }

  const closePopupBtn = document.getElementById('close-popup');
  if (closePopupBtn) {
    closePopupBtn.addEventListener('click', () => {
      document.getElementById('closing-popup').classList.remove('show');
    });
  }
});
