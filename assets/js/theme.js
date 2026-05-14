// Theme handling: toggles [data-theme] with localStorage persistence
export function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById('darkModeToggle');
  const stored = localStorage.getItem('theme');

  // Determine initial theme
  let theme = stored || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  apply(theme);

  if (toggle) {
    toggle.checked = theme === 'dark';
    toggle.addEventListener('change', () => {
      const t = toggle.checked ? 'dark' : 'light';
      apply(t);
      localStorage.setItem('theme', t);
    });
  }

  function apply(t) {
    // Check if theme is actually changing to avoid unnecessary re-renders
    if (root.getAttribute('data-theme') === t) return;
    
    root.setAttribute('data-theme', t);
  }
}
