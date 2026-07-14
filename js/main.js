/* ==========================================================================
   main.js — loading screen + role selection (index.html)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');

  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => loadingScreen.remove(), 900);
    }, 2000);
  }

  const joinCard = document.getElementById('card-join');
  const adminCard = document.getElementById('card-admin');

  if (joinCard) {
    joinCard.addEventListener('click', () => {
      navigateWithTransition('password.html');
    });
  }

  if (adminCard) {
    adminCard.addEventListener('click', () => {
      navigateWithTransition('admin-login.html');
    });
  }
});
