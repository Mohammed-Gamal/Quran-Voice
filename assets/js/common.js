export function initCommon() {
  // Update footer year
  const y = document.querySelector('.year');
  if (y) y.textContent = String(new Date().getFullYear());

  // Tabs (if present)
  const tabs = document.querySelectorAll('.tabs button');
  const container = document.querySelector('.player-container');
  if (tabs.length && container) {
    tabs.forEach(btn => btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // For now, single content area; extend later if needed
    }));
  }

  // Burger Menu toggle
  const burgerMenu = document.getElementById('burgerMenu');
  const navLinks = document.getElementById('navLinks');

  if (burgerMenu && navLinks) {
    burgerMenu.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      burgerMenu.classList.toggle('open');
      burgerMenu.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        burgerMenu.classList.remove('open');
        burgerMenu.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            burgerMenu.classList.remove('open');
            burgerMenu.setAttribute('aria-expanded', 'false');
        });
    });
  }
}
