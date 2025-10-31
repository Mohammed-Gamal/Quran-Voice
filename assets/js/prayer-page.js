import { initThemeToggle } from './theme.js';
import { initCommon } from './common.js';
import { initDhikrReminder } from './dhikr-reminder.js';

// Wait for DOM and Adhan library to be ready
async function init() {
  initThemeToggle();
  initCommon();
  initDhikrReminder();

  // Wait for Adhan library to be available (loaded via global script tag)
  const A = await new Promise((resolve) => {
    const maxAttempts = 100; // 5 seconds max
    let attempts = 0;
    
    const check = () => {
      if (window.adhan) {
        resolve(window.adhan);
      } else if (attempts++ < maxAttempts) {
        setTimeout(check, 50);
      } else {
        resolve(null);
      }
    };
    
    check();
  });

  const $ = (s) => document.querySelector(s);

  const els = {
    loc: $('#loc'),
    tz: $('#tz'),
    times: $('#times'),
    next: $('#nextPrayer'),
    notes: $('#notes'),
    method: $('#method'),
    madhab: $('#madhab'),
    highLat: $('#highLat'),
    btnGPS: $('#useGPS'),
    btnRecalc: $('#recalc'),
    btnManual: $('#manualToggle'),
    manualPanel: $('#manualPanel'),
    lat: $('#lat'),
    lon: $('#lon'),
  };

  if (!A) {
    if (els.notes) els.notes.textContent = 'Failed to load calculation engine. Please check your internet connection and refresh.';
    if (els.loc) els.loc.textContent = 'Library load error';
    console.error('Adhan library not loaded from CDN');
    return;
  }

const state = {
  lat: null,
  lon: null,
  timer: null,
};

function setLocationText(lat, lon) {
  els.loc.textContent = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
}

function getParams() {
  const method = String(els.method.value);
  let params;
  switch (method) {
    case 'UmmAlQura': params = A.CalculationMethod.UmmAlQura(); break;
    case 'Egyptian': params = A.CalculationMethod.Egyptian(); break;
    case 'Karachi': params = A.CalculationMethod.Karachi(); break;
    case 'NorthAmerica': params = A.CalculationMethod.NorthAmerica(); break;
    case 'Kuwait': params = A.CalculationMethod.Kuwait(); break;
    case 'Qatar': params = A.CalculationMethod.Qatar(); break;
    case 'Dubai': params = A.CalculationMethod.Dubai(); break;
    case 'Turkey': params = A.CalculationMethod.Turkey(); break;
    case 'MWL':
    default: params = A.CalculationMethod.MuslimWorldLeague(); break;
  }

  params.madhab = els.madhab.value === 'Hanafi' ? A.Madhab.Hanafi : A.Madhab.Shafi;
  const hl = String(els.highLat.value);
  params.highLatitudeRule = (hl === 'SeventhOfTheNight') ? A.HighLatitudeRule.SeventhOfTheNight
    : (hl === 'TwilightAngle') ? A.HighLatitudeRule.TwilightAngle
    : A.HighLatitudeRule.MiddleOfTheNight;
  return params;
}

function fmt(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function computeTimes(lat, lon) {
  const today = new Date();
  const coords = new A.Coordinates(lat, lon);
  const params = getParams();
  const times = new A.PrayerTimes(coords, today, params);
  return times;
}

function renderTimes(times) {
  const list = [
    ['Fajr', times.fajr],
    ['Sunrise', times.sunrise],
    ['Dhuhr', times.dhuhr],
    ['Asr', times.asr],
    ['Maghrib', times.maghrib],
    ['Isha', times.isha],
  ];
  els.times.innerHTML = '';
  for (const [label, d] of list) {
    const div = document.createElement('div');
    div.className = 'time';
    div.innerHTML = `<h3>${label}</h3><div style="font-size:1.2rem; font-weight:700">${fmt(d)}</div>`;
    els.times.appendChild(div);
  }
}

function updateNext(times) {
  const now = new Date();
  const next = times.nextPrayer();
  if (next === A.Prayer.None) {
    els.next.textContent = 'All prayers for today have passed.';
    return;
  }
  const nextTime = times.timeForPrayer(next);
  const names = {
    [A.Prayer.Fajr]: 'Fajr',
    [A.Prayer.Sunrise]: 'Sunrise',
    [A.Prayer.Dhuhr]: 'Dhuhr',
    [A.Prayer.Asr]: 'Asr',
    [A.Prayer.Maghrib]: 'Maghrib',
    [A.Prayer.Isha]: 'Isha',
  };
  const diffMs = nextTime - now;
  const sec = Math.max(0, Math.floor(diffMs / 1000));
  const hh = String(Math.floor(sec / 3600)).padStart(2, '0');
  const mm = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const ss = String(sec % 60).padStart(2, '0');
  els.next.textContent = `Next: ${names[next]} in ${hh}:${mm}:${ss}`;
}

function startCountdown(times) {
  if (state.timer) clearInterval(state.timer);
  updateNext(times);
  state.timer = setInterval(() => updateNext(times), 1000);
}

function recalc() {
  els.tz.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const lat = state.lat ?? parseFloat(els.lat.value);
  const lon = state.lon ?? parseFloat(els.lon.value);
  if (!isFinite(lat) || !isFinite(lon)) {
    els.loc.textContent = 'Provide location or use GPS';
    els.times.innerHTML = '';
    els.next.textContent = '';
    return;
  }
  setLocationText(lat, lon);
  const times = computeTimes(lat, lon);
  renderTimes(times);
  startCountdown(times);
}

function getGPS() {
  if (!navigator.geolocation) { els.loc.textContent = 'Geolocation not available'; return; }
  els.loc.textContent = 'Requesting permission…';
  navigator.geolocation.getCurrentPosition((pos) => {
    state.lat = pos.coords.latitude;
    state.lon = pos.coords.longitude;
    setLocationText(state.lat, state.lon);
    recalc();
  }, (err) => {
    els.loc.textContent = `Location error: ${err.message}`;
  }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 600000 });
}

// Event bindings
els.btnGPS.addEventListener('click', getGPS);
els.btnRecalc.addEventListener('click', recalc);
els.btnManual.addEventListener('click', () => {
  const show = els.manualPanel.style.display !== '';
  els.manualPanel.style.display = show ? '' : 'none';
});

// Auto-try GPS if already granted
if (navigator.permissions && navigator.permissions.query) {
  navigator.permissions.query({ name: 'geolocation' }).then(p => {
    if (p.state === 'granted') getGPS();
  }).catch(() => {});
}

// Initial timezone text and render (manual if provided)
els.tz.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
recalc();
}

// Start initialization
init();
