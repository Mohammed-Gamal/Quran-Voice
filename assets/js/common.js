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
}
