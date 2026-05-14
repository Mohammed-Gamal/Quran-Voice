const LIVE_RADIOS_LINK = 'https://data-rosy.vercel.app/radio.json';

export async function initRadios() {
  const select = document.getElementById('reciterSelect');
  const audio = document.getElementById('quraanAudio');
  const img = document.querySelector('.reciter-picture');
  const status = document.querySelector('[data-radios-status]');

  if (!select || !audio) return;

  try {
    const res = await fetch(LIVE_RADIOS_LINK, { cache: 'no-store' });
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();

    // Populate options
    if (Array.isArray(data.radios)) {
      for (const radio of data.radios) {
        const opt = document.createElement('option');
        opt.value = radio.id;
        opt.textContent = radio.name;
        select.appendChild(opt);
      }
    }

    // Default to Cairo Radio (ID 19) or first if not found
    const targetId = "19";
    const targetRadio = (data.radios || []).find(r => String(r.id) === targetId) || data.radios?.[0];

    if (targetRadio) {
      audio.src = targetRadio.url;
      const statusName = document.getElementById('radioStatus');
      if (statusName) statusName.textContent = targetRadio.name || '';
      if (img) {
        img.src = targetRadio.img || 'assets/logo_broken.png';
        img.onerror = () => { img.src = 'assets/logo_broken.png'; };
      }
      select.value = targetRadio.id;
    }
  } catch (err) {
    console.error('Failed to load radios', err);
    if (img) img.src = 'assets/logo_broken.png';
    if (status) status.textContent = 'Unable to load radios right now.';
    const fallback = document.createElement('option');
    fallback.value = 'fallback';
    fallback.textContent = 'Default Radio';
    select.appendChild(fallback);
  }

  // Change handler
  select.addEventListener('change', async () => {
    const id = select.value;
    try {
      const res = await fetch(LIVE_RADIOS_LINK, { cache: 'no-store' });
      const data = await res.json();
      const rec = (data.radios || []).find(r => String(r.id) === String(id));
      if (rec) {
        audio.src = rec.url;
        const statusName = document.getElementById('radioStatus');
        if (statusName) statusName.textContent = rec.name || '';
        if (img) {
          img.src = rec.img || 'assets/logo_broken.png';
          img.onerror = () => { img.src = 'assets/logo_broken.png'; };
        }
        audio.play().catch(() => {/* autoplay may be blocked */});
      }
    } catch (e) {
      console.warn('Change failed', e);
    }
  });
}
