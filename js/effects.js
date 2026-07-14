/* ==========================================================================
   effects.js — shared visual effects: ocean waves, bubbles, sparkles,
   confetti, ripple buttons, cursor sparkle, background music toggle.
   ========================================================================== */

/* ---------- Animated ocean canvas ---------- */
function initOceanCanvas() {
  const canvas = document.getElementById('ocean-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, time = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const layers = [
    { amplitude: 18, wavelength: 220, speed: 0.015, color: 'rgba(223,245,255,0.55)', offset: 0.78 },
    { amplitude: 24, wavelength: 300, speed: 0.01, color: 'rgba(255,231,239,0.45)', offset: 0.85 },
    { amplitude: 14, wavelength: 160, speed: 0.02, color: 'rgba(207,175,134,0.18)', offset: 0.92 },
  ];

  function draw() {
    ctx.clearRect(0, 0, width, height);
    layers.forEach((layer) => {
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = height * layer.offset + Math.sin(x / layer.wavelength + time * layer.speed) * layer.amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = layer.color;
      ctx.fill();
    });
    time += 1;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ---------- Floating bubbles + sparkles + palm leaves ---------- */
function initBackgroundDecor() {
  const decor = document.querySelector('.bg-decor');
  if (!decor) return;

  for (let i = 0; i < 14; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = 6 + Math.random() * 18;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${8 + Math.random() * 10}s`;
    bubble.style.animationDelay = `${Math.random() * 8}s`;
    decor.appendChild(bubble);
  }

  for (let i = 0; i < 18; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 3}s`;
    decor.appendChild(sparkle);
  }

  const leafEmojis = ['🌴', '🌿'];
  for (let i = 0; i < 2; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'palm-leaf';
    leaf.textContent = leafEmojis[i % leafEmojis.length];
    leaf.style.left = i === 0 ? '2%' : '90%';
    leaf.style.bottom = '0';
    decor.appendChild(leaf);
  }
}

/* ---------- Cursor sparkle trail (desktop only) ---------- */
function initCursorSparkle() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.3) return;
    const dot = document.createElement('div');
    dot.className = 'cursor-sparkle';
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    document.body.appendChild(dot);
    dot.animate(
      [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }],
      { duration: 600, easing: 'ease-out' }
    ).onfinish = () => dot.remove();
  });
}

/* ---------- Button ripple ---------- */
function initButtonRipple() {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
}

/* ---------- Confetti ---------- */
function fireConfetti({ count = 80, colors = ['#CFAF86', '#FFE7EF', '#DFF5FF', '#F3E4CF', '#fff'] } = {}) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const size = 6 + Math.random() * 6;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 0.4}px`;
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${2.5 + Math.random() * 2}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5000);
  }
}
window.fireConfetti = fireConfetti;

/* ---------- Page transition helper ---------- */
function navigateWithTransition(url) {
  const overlay = document.createElement('div');
  overlay.className = 'page-transition leaving';
  document.body.appendChild(overlay);
  setTimeout(() => {
    window.location.href = url;
  }, 480);
}
window.navigateWithTransition = navigateWithTransition;

/* ---------- Background music toggle ---------- */
function initMusicToggle() {
  const toggle = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-audio');
  if (!toggle || !audio) return;

  let started = false;
  const startOnInteract = () => {
    if (started) return;
    started = true;
    audio.volume = 0.35;
    audio.play().catch(() => {});
    toggle.textContent = '🔊';
    document.removeEventListener('click', startOnInteract);
  };
  document.addEventListener('click', startOnInteract);

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (audio.paused) {
      audio.play().catch(() => {});
      toggle.textContent = '🔊';
    } else {
      audio.pause();
      toggle.textContent = '🔇';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initOceanCanvas();
  initBackgroundDecor();
  initCursorSparkle();
  initButtonRipple();
  initMusicToggle();
});
