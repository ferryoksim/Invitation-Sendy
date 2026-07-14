/* ==========================================================================
   rsvp.js — RSVP form submission (rsvp.html)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  const options = document.querySelectorAll('.rsvp-option');
  let attending = null;

  options.forEach((opt) => {
    opt.addEventListener('click', () => {
      options.forEach((o) => o.classList.remove('selected'));
      opt.classList.add('selected');
      attending = opt.dataset.value === 'yes';
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (attending === null) {
      alert('Please let us know if you can come!');
      return;
    }

    const fullName = document.getElementById('rsvp-name').value.trim();
    const phoneNumber = document.getElementById('rsvp-phone').value.trim();
    const message = document.getElementById('rsvp-message').value.trim();
    const submitBtn = document.getElementById('rsvp-submit');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phoneNumber, attending, message }),
      });

      if (!res.ok) throw new Error('Failed to submit RSVP');

      fireConfetti({ count: 100 });
      document.getElementById('rsvp-popup').classList.add('show');
      form.reset();
      options.forEach((o) => o.classList.remove('selected'));
      attending = null;
    } catch (err) {
      alert('Something went wrong sending your RSVP. Please try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'SEND 💌';
    }
  });

  const closePopup = document.getElementById('close-rsvp-popup');
  if (closePopup) {
    closePopup.addEventListener('click', () => {
      navigateWithTransition('closing.html');
    });
  }
});
