import { initThemeToggle } from './theme.js';
import { initCommon } from './common.js';
import { initDhikrReminder } from './dhikr-reminder.js';

initThemeToggle();
initCommon();
initDhikrReminder();

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// API endpoints
const API_BASE = 'https://api.alquran.cloud/v1';

// Elements
const els = {
  surahList: $('#surahList'),
  ayahContainer: $('#ayahContainer'),
  loading: $('#loading'),
  surahTitle: $('#surahTitle'),
  surahMeta: $('#surahMeta'),
  showTranslation: $('#showTranslation'),
  showTafseer: $('#showTafseer'),
  translationLang: $('#translationLang'),
  fontSize: $('#fontSize'),
  searchQuran: $('#searchQuran'),
  prevSurah: $('#prevSurah'),
  nextSurah: $('#nextSurah'),
  filterBtns: $$('.filter-tabs button'),
};

// State
const state = {
  currentSurah: null,
  surahs: [],
  filter: 'all',
};

// Surah metadata (114 surahs)
const surahMeta = [
  { number: 1, name: "Al-Fatihah", englishName: "The Opening", ayahs: 7, revelationType: "Meccan" },
  { number: 2, name: "Al-Baqarah", englishName: "The Cow", ayahs: 286, revelationType: "Medinan" },
  { number: 3, name: "Ali 'Imran", englishName: "Family of Imran", ayahs: 200, revelationType: "Medinan" },
  { number: 4, name: "An-Nisa", englishName: "The Women", ayahs: 176, revelationType: "Medinan" },
  { number: 5, name: "Al-Ma'idah", englishName: "The Table Spread", ayahs: 120, revelationType: "Medinan" },
  { number: 6, name: "Al-An'am", englishName: "The Cattle", ayahs: 165, revelationType: "Meccan" },
  { number: 7, name: "Al-A'raf", englishName: "The Heights", ayahs: 206, revelationType: "Meccan" },
  { number: 8, name: "Al-Anfal", englishName: "The Spoils of War", ayahs: 75, revelationType: "Medinan" },
  { number: 9, name: "At-Tawbah", englishName: "The Repentance", ayahs: 129, revelationType: "Medinan" },
  { number: 10, name: "Yunus", englishName: "Jonah", ayahs: 109, revelationType: "Meccan" },
  { number: 11, name: "Hud", englishName: "Hud", ayahs: 123, revelationType: "Meccan" },
  { number: 12, name: "Yusuf", englishName: "Joseph", ayahs: 111, revelationType: "Meccan" },
  { number: 13, name: "Ar-Ra'd", englishName: "The Thunder", ayahs: 43, revelationType: "Medinan" },
  { number: 14, name: "Ibrahim", englishName: "Abraham", ayahs: 52, revelationType: "Meccan" },
  { number: 15, name: "Al-Hijr", englishName: "The Rocky Tract", ayahs: 99, revelationType: "Meccan" },
  { number: 16, name: "An-Nahl", englishName: "The Bee", ayahs: 128, revelationType: "Meccan" },
  { number: 17, name: "Al-Isra", englishName: "The Night Journey", ayahs: 111, revelationType: "Meccan" },
  { number: 18, name: "Al-Kahf", englishName: "The Cave", ayahs: 110, revelationType: "Meccan" },
  { number: 19, name: "Maryam", englishName: "Mary", ayahs: 98, revelationType: "Meccan" },
  { number: 20, name: "Taha", englishName: "Ta-Ha", ayahs: 135, revelationType: "Meccan" },
  { number: 21, name: "Al-Anbya", englishName: "The Prophets", ayahs: 112, revelationType: "Meccan" },
  { number: 22, name: "Al-Hajj", englishName: "The Pilgrimage", ayahs: 78, revelationType: "Medinan" },
  { number: 23, name: "Al-Mu'minun", englishName: "The Believers", ayahs: 118, revelationType: "Meccan" },
  { number: 24, name: "An-Nur", englishName: "The Light", ayahs: 64, revelationType: "Medinan" },
  { number: 25, name: "Al-Furqan", englishName: "The Criterion", ayahs: 77, revelationType: "Meccan" },
  { number: 26, name: "Ash-Shu'ara", englishName: "The Poets", ayahs: 227, revelationType: "Meccan" },
  { number: 27, name: "An-Naml", englishName: "The Ant", ayahs: 93, revelationType: "Meccan" },
  { number: 28, name: "Al-Qasas", englishName: "The Stories", ayahs: 88, revelationType: "Meccan" },
  { number: 29, name: "Al-'Ankabut", englishName: "The Spider", ayahs: 69, revelationType: "Meccan" },
  { number: 30, name: "Ar-Rum", englishName: "The Romans", ayahs: 60, revelationType: "Meccan" },
  { number: 31, name: "Luqman", englishName: "Luqman", ayahs: 34, revelationType: "Meccan" },
  { number: 32, name: "As-Sajdah", englishName: "The Prostration", ayahs: 30, revelationType: "Meccan" },
  { number: 33, name: "Al-Ahzab", englishName: "The Combined Forces", ayahs: 73, revelationType: "Medinan" },
  { number: 34, name: "Saba", englishName: "Sheba", ayahs: 54, revelationType: "Meccan" },
  { number: 35, name: "Fatir", englishName: "Originator", ayahs: 45, revelationType: "Meccan" },
  { number: 36, name: "Ya-Sin", englishName: "Ya Sin", ayahs: 83, revelationType: "Meccan" },
  { number: 37, name: "As-Saffat", englishName: "Those Ranges in Ranks", ayahs: 182, revelationType: "Meccan" },
  { number: 38, name: "Sad", englishName: "The Letter Saad", ayahs: 88, revelationType: "Meccan" },
  { number: 39, name: "Az-Zumar", englishName: "The Troops", ayahs: 75, revelationType: "Meccan" },
  { number: 40, name: "Ghafir", englishName: "The Forgiver", ayahs: 85, revelationType: "Meccan" },
  { number: 41, name: "Fussilat", englishName: "Explained in Detail", ayahs: 54, revelationType: "Meccan" },
  { number: 42, name: "Ash-Shuraa", englishName: "The Consultation", ayahs: 53, revelationType: "Meccan" },
  { number: 43, name: "Az-Zukhruf", englishName: "The Ornaments of Gold", ayahs: 89, revelationType: "Meccan" },
  { number: 44, name: "Ad-Dukhan", englishName: "The Smoke", ayahs: 59, revelationType: "Meccan" },
  { number: 45, name: "Al-Jathiyah", englishName: "The Crouching", ayahs: 37, revelationType: "Meccan" },
  { number: 46, name: "Al-Ahqaf", englishName: "The Wind-Curved Sandhills", ayahs: 35, revelationType: "Meccan" },
  { number: 47, name: "Muhammad", englishName: "Muhammad", ayahs: 38, revelationType: "Medinan" },
  { number: 48, name: "Al-Fath", englishName: "The Victory", ayahs: 29, revelationType: "Medinan" },
  { number: 49, name: "Al-Hujurat", englishName: "The Rooms", ayahs: 18, revelationType: "Medinan" },
  { number: 50, name: "Qaf", englishName: "The Letter Qaf", ayahs: 45, revelationType: "Meccan" },
  { number: 51, name: "Adh-Dhariyat", englishName: "The Winnowing Winds", ayahs: 60, revelationType: "Meccan" },
  { number: 52, name: "At-Tur", englishName: "The Mount", ayahs: 49, revelationType: "Meccan" },
  { number: 53, name: "An-Najm", englishName: "The Star", ayahs: 62, revelationType: "Meccan" },
  { number: 54, name: "Al-Qamar", englishName: "The Moon", ayahs: 55, revelationType: "Meccan" },
  { number: 55, name: "Ar-Rahman", englishName: "The Beneficent", ayahs: 78, revelationType: "Medinan" },
  { number: 56, name: "Al-Waqi'ah", englishName: "The Inevitable", ayahs: 96, revelationType: "Meccan" },
  { number: 57, name: "Al-Hadid", englishName: "The Iron", ayahs: 29, revelationType: "Medinan" },
  { number: 58, name: "Al-Mujadila", englishName: "The Pleading Woman", ayahs: 22, revelationType: "Medinan" },
  { number: 59, name: "Al-Hashr", englishName: "The Exile", ayahs: 24, revelationType: "Medinan" },
  { number: 60, name: "Al-Mumtahanah", englishName: "She that is to be examined", ayahs: 13, revelationType: "Medinan" },
  { number: 61, name: "As-Saf", englishName: "The Ranks", ayahs: 14, revelationType: "Medinan" },
  { number: 62, name: "Al-Jumu'ah", englishName: "The Congregation", ayahs: 11, revelationType: "Medinan" },
  { number: 63, name: "Al-Munafiqun", englishName: "The Hypocrites", ayahs: 11, revelationType: "Medinan" },
  { number: 64, name: "At-Taghabun", englishName: "The Mutual Disillusion", ayahs: 18, revelationType: "Medinan" },
  { number: 65, name: "At-Talaq", englishName: "The Divorce", ayahs: 12, revelationType: "Medinan" },
  { number: 66, name: "At-Tahrim", englishName: "The Prohibition", ayahs: 12, revelationType: "Medinan" },
  { number: 67, name: "Al-Mulk", englishName: "The Sovereignty", ayahs: 30, revelationType: "Meccan" },
  { number: 68, name: "Al-Qalam", englishName: "The Pen", ayahs: 52, revelationType: "Meccan" },
  { number: 69, name: "Al-Haqqah", englishName: "The Reality", ayahs: 52, revelationType: "Meccan" },
  { number: 70, name: "Al-Ma'arij", englishName: "The Ascending Stairways", ayahs: 44, revelationType: "Meccan" },
  { number: 71, name: "Nuh", englishName: "Noah", ayahs: 28, revelationType: "Meccan" },
  { number: 72, name: "Al-Jinn", englishName: "The Jinn", ayahs: 28, revelationType: "Meccan" },
  { number: 73, name: "Al-Muzzammil", englishName: "The Enshrouded One", ayahs: 20, revelationType: "Meccan" },
  { number: 74, name: "Al-Muddaththir", englishName: "The Cloaked One", ayahs: 56, revelationType: "Meccan" },
  { number: 75, name: "Al-Qiyamah", englishName: "The Resurrection", ayahs: 40, revelationType: "Meccan" },
  { number: 76, name: "Al-Insan", englishName: "The Man", ayahs: 31, revelationType: "Medinan" },
  { number: 77, name: "Al-Mursalat", englishName: "The Emissaries", ayahs: 50, revelationType: "Meccan" },
  { number: 78, name: "An-Naba", englishName: "The Tidings", ayahs: 40, revelationType: "Meccan" },
  { number: 79, name: "An-Nazi'at", englishName: "Those who drag forth", ayahs: 46, revelationType: "Meccan" },
  { number: 80, name: "'Abasa", englishName: "He frowned", ayahs: 42, revelationType: "Meccan" },
  { number: 81, name: "At-Takwir", englishName: "The Overthrowing", ayahs: 29, revelationType: "Meccan" },
  { number: 82, name: "Al-Infitar", englishName: "The Cleaving", ayahs: 19, revelationType: "Meccan" },
  { number: 83, name: "Al-Mutaffifin", englishName: "The Defrauding", ayahs: 36, revelationType: "Meccan" },
  { number: 84, name: "Al-Inshiqaq", englishName: "The Splitting Open", ayahs: 25, revelationType: "Meccan" },
  { number: 85, name: "Al-Buruj", englishName: "The Mansions of the Stars", ayahs: 22, revelationType: "Meccan" },
  { number: 86, name: "At-Tariq", englishName: "The Nightcommer", ayahs: 17, revelationType: "Meccan" },
  { number: 87, name: "Al-A'la", englishName: "The Most High", ayahs: 19, revelationType: "Meccan" },
  { number: 88, name: "Al-Ghashiyah", englishName: "The Overwhelming", ayahs: 26, revelationType: "Meccan" },
  { number: 89, name: "Al-Fajr", englishName: "The Dawn", ayahs: 30, revelationType: "Meccan" },
  { number: 90, name: "Al-Balad", englishName: "The City", ayahs: 20, revelationType: "Meccan" },
  { number: 91, name: "Ash-Shams", englishName: "The Sun", ayahs: 15, revelationType: "Meccan" },
  { number: 92, name: "Al-Layl", englishName: "The Night", ayahs: 21, revelationType: "Meccan" },
  { number: 93, name: "Ad-Duhaa", englishName: "The Morning Hours", ayahs: 11, revelationType: "Meccan" },
  { number: 94, name: "Ash-Sharh", englishName: "The Relief", ayahs: 8, revelationType: "Meccan" },
  { number: 95, name: "At-Tin", englishName: "The Fig", ayahs: 8, revelationType: "Meccan" },
  { number: 96, name: "Al-'Alaq", englishName: "The Clot", ayahs: 19, revelationType: "Meccan" },
  { number: 97, name: "Al-Qadr", englishName: "The Power", ayahs: 5, revelationType: "Meccan" },
  { number: 98, name: "Al-Bayyinah", englishName: "The Clear Proof", ayahs: 8, revelationType: "Medinan" },
  { number: 99, name: "Az-Zalzalah", englishName: "The Earthquake", ayahs: 8, revelationType: "Medinan" },
  { number: 100, name: "Al-'Adiyat", englishName: "The Courser", ayahs: 11, revelationType: "Meccan" },
  { number: 101, name: "Al-Qari'ah", englishName: "The Calamity", ayahs: 11, revelationType: "Meccan" },
  { number: 102, name: "At-Takathur", englishName: "The Rivalry in world increase", ayahs: 8, revelationType: "Meccan" },
  { number: 103, name: "Al-'Asr", englishName: "The Declining Day", ayahs: 3, revelationType: "Meccan" },
  { number: 104, name: "Al-Humazah", englishName: "The Traducer", ayahs: 9, revelationType: "Meccan" },
  { number: 105, name: "Al-Fil", englishName: "The Elephant", ayahs: 5, revelationType: "Meccan" },
  { number: 106, name: "Quraysh", englishName: "Quraysh", ayahs: 4, revelationType: "Meccan" },
  { number: 107, name: "Al-Ma'un", englishName: "The Small kindnesses", ayahs: 7, revelationType: "Meccan" },
  { number: 108, name: "Al-Kawthar", englishName: "The Abundance", ayahs: 3, revelationType: "Meccan" },
  { number: 109, name: "Al-Kafirun", englishName: "The Disbelievers", ayahs: 6, revelationType: "Meccan" },
  { number: 110, name: "An-Nasr", englishName: "The Divine Support", ayahs: 3, revelationType: "Medinan" },
  { number: 111, name: "Al-Masad", englishName: "The Palm Fiber", ayahs: 5, revelationType: "Meccan" },
  { number: 112, name: "Al-Ikhlas", englishName: "The Sincerity", ayahs: 4, revelationType: "Meccan" },
  { number: 113, name: "Al-Falaq", englishName: "The Daybreak", ayahs: 5, revelationType: "Meccan" },
  { number: 114, name: "An-Nas", englishName: "Mankind", ayahs: 6, revelationType: "Meccan" }
];

state.surahs = surahMeta;

// Render surah list
function renderSurahList() {
  const filtered = state.filter === 'all' 
    ? state.surahs 
    : state.surahs.filter(s => s.revelationType.toLowerCase() === state.filter);
  
  els.surahList.innerHTML = filtered.map(s => `
    <div class="surah-item" data-number="${s.number}">
      <div class="surah-number">${s.number}</div>
      <div class="surah-name">${s.name}</div>
      <div class="surah-detail">${s.englishName} • ${s.ayahs} verses • ${s.revelationType}</div>
    </div>
  `).join('');

  // Add click handlers
  $$('.surah-item').forEach(item => {
    item.addEventListener('click', () => {
      const num = parseInt(item.dataset.number);
      loadSurah(num);
    });
  });
}

// Load surah data
async function loadSurah(number) {
  state.currentSurah = number;
  
  // Update active state
  $$('.surah-item').forEach(item => {
    item.classList.toggle('active', parseInt(item.dataset.number) === number);
  });

  // Show loading
  els.loading.style.display = 'block';
  els.ayahContainer.innerHTML = '';

  try {
    const edition = els.translationLang.value;
    
    // Fetch Arabic + Translation + Tafseer
    const [arabicRes, transRes, tafseerRes] = await Promise.all([
      fetch(`${API_BASE}/surah/${number}`),
      fetch(`${API_BASE}/surah/${number}/${edition}`),
      fetch(`${API_BASE}/surah/${number}/en.maududi`).catch(() => null) // Tafseer (with fallback)
    ]);

    const arabic = await arabicRes.json();
    const trans = await transRes.json();
    const tafseer = tafseerRes ? await tafseerRes.json() : null;

    if (arabic.code !== 200 || trans.code !== 200) throw new Error('API error');

    const surahData = arabic.data;
    const transData = trans.data;
    const tafseerData = tafseer?.code === 200 ? tafseer.data : null;

    // Update header
    els.surahTitle.textContent = `${surahData.number}. ${surahData.englishName} (${surahData.name})`;
    els.surahMeta.textContent = `${surahData.revelationType} • ${surahData.numberOfAyahs} Ayahs`;

    // Update pagination buttons
    els.prevSurah.disabled = number === 1;
    els.nextSurah.disabled = number === 114;

    // Render bismillah (except for Surah 1 and 9)
    let html = '';
    if (number !== 1 && number !== 9) {
      html += `<div class="bismillah">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>`;
    }

    // Render ayahs
    html += surahData.ayahs.map((ayah, idx) => {
      const translation = transData.ayahs[idx];
      const tafseerAyah = tafseerData?.ayahs[idx];
      const showTrans = els.showTranslation.checked;
      const showTaf = els.showTafseer.checked;
      
      return `
        <div class="ayah">
          <div class="ayah-header">
            <span class="ayah-number">Ayah ${ayah.numberInSurah}</span>
          </div>
          <div class="ayah-arabic">${ayah.text}</div>
          <div class="ayah-translation ${showTrans ? '' : 'hidden'}">${translation.text}</div>
          ${tafseerAyah ? `
            <div class="ayah-tafseer ${showTaf ? '' : 'hidden'}">
              <div class="ayah-tafseer-title">Tafseer:</div>
              <div>${tafseerAyah.text}</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    els.ayahContainer.innerHTML = html;
    els.loading.style.display = 'none';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

  } catch (err) {
    console.error('Failed to load surah:', err);
    els.loading.style.display = 'none';
    els.ayahContainer.innerHTML = '<p style="text-align:center; color:var(--muted); padding:3rem;">Failed to load surah. Please try again.</p>';
  }
}

// Event handlers
els.showTranslation.addEventListener('change', () => {
  $$('.ayah-translation').forEach(el => {
    el.classList.toggle('hidden', !els.showTranslation.checked);
  });
});

els.showTafseer.addEventListener('change', () => {
  $$('.ayah-tafseer').forEach(el => {
    el.classList.toggle('hidden', !els.showTafseer.checked);
  });
});

els.translationLang.addEventListener('change', () => {
  if (state.currentSurah) loadSurah(state.currentSurah);
});

els.fontSize.addEventListener('change', () => {
  els.ayahContainer.className = 'ayah-container';
  els.ayahContainer.classList.add(`size-${els.fontSize.value}`);
});

els.prevSurah.addEventListener('click', () => {
  if (state.currentSurah > 1) loadSurah(state.currentSurah - 1);
});

els.nextSurah.addEventListener('click', () => {
  if (state.currentSurah < 114) loadSurah(state.currentSurah + 1);
});

// Filter tabs
els.filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    els.filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.filter = btn.dataset.filter;
    renderSurahList();
  });
});

// Search
els.searchQuran.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  $$('.surah-item').forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(query) ? '' : 'none';
  });
});

// Initialize
renderSurahList();
els.ayahContainer.classList.add('size-medium');

// Load first surah by default
loadSurah(1);
