const AZKAR_LINK = 'https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json';

export async function initAzkar() {
  const el = document.querySelector('p.azkar');
  if (!el) return;
  try {
    const res = await fetch(AZKAR_LINK, { cache: 'no-store' });
    if (!res.ok) throw new Error('Network');
    const data = await res.json();
    const keys = Object.keys(data);
    if (!keys.length) return;
    const k = keys[Math.floor(Math.random() * keys.length)];
    const items = data[k];
    if (Array.isArray(items) && items.length) {
      const item = items[Math.floor(Math.random() * items.length)];
      const txt = String(item.content || '')
        .replace(/(\r\n|\r|\n|\\n)/g, ' ')
        .replace(/['",]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      el.textContent = txt;
    }
  } catch (e) {
    console.warn('Azkar failed', e);
    el.textContent = 'اللهم صل وسلم على نبينا محمد';
  }
}
