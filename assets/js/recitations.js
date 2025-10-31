/**
 * Quran Recitations Module
 * 
 * This module handles the complete Quran recitation feature including:
 * - Sheikh/Reciter selection from 10+ renowned Quran reciters
 * - All 114 Surahs of the Holy Quran
 * - High-quality audio streaming from download.quranicaudio.com CDN
 * - Search and filter functionality (by name, Meccan/Medinan)
 * - Audio playback controls and state management
 * 
 * @module recitations
 * @author Mohamed Gamal
 * @version 1.0.0
 */

/**
 * List of renowned Quran reciters with their metadata
 * Each reciter has a unique ID used for audio URL construction
 * 
 * @type {Array<Object>}
 * @property {string} id - Unique identifier for the reciter
 * @property {string} name - Full name in English
 * @property {string} arabic - Name in Arabic
 * @property {string} country - Country with flag emoji
 * @property {string} style - Recitation style (Murattal/Mujawwad)
 */
const reciters = [
  { 
    id: 'ar.alafasy', 
    name: 'Mishary Rashid Alafasy',
    arabic: 'مشاري العفاسي',
    country: '🇰🇼 Kuwait',
    style: 'Murattal'
  },
  { 
    id: 'ar.abdulbasitmurattal', 
    name: 'Abdul Basit (Murattal)',
    arabic: 'عبد الباسط عبد الصمد',
    country: '🇪🇬 Egypt',
    style: 'Murattal'
  },
  { 
    id: 'ar.abdurrahmaansudais', 
    name: 'Abdul Rahman Al-Sudais',
    arabic: 'عبد الرحمن السديس',
    country: '🇸🇦 Saudi Arabia',
    style: 'Murattal'
  },
  { 
    id: 'ar.husary', 
    name: 'Mahmoud Khalil Al-Hussary',
    arabic: 'محمود خليل الحصري',
    country: '🇪🇬 Egypt',
    style: 'Murattal'
  },
  { 
    id: 'ar.minshawi', 
    name: 'Mohamed Siddiq Al-Minshawi',
    arabic: 'محمد صديق المنشاوي',
    country: '🇪🇬 Egypt',
    style: 'Mujawwad'
  },
  { 
    id: 'ar.mahermuaiqly', 
    name: 'Maher Al Muaiqly',
    arabic: 'ماهر المعيقلي',
    country: '🇸🇦 Saudi Arabia',
    style: 'Murattal'
  },
  { 
    id: 'ar.ahmedajamy', 
    name: 'Ahmed ibn Ali al-Ajamy',
    arabic: 'أحمد العجمي',
    country: '🇸🇦 Saudi Arabia',
    style: 'Murattal'
  },
  { 
    id: 'ar.hanirifai', 
    name: 'Hani ar-Rifai',
    arabic: 'هاني الرفاعي',
    country: '🇸🇦 Saudi Arabia',
    style: 'Murattal'
  },
  { 
    id: 'ar.shaatree', 
    name: 'Abu Bakr al-Shatri',
    arabic: 'أبو بكر الشاطري',
    country: '🇸🇦 Saudi Arabia',
    style: 'Murattal'
  },
  { 
    id: 'ar.saoodshuraym', 
    name: 'Saood ash-Shuraym',
    arabic: 'سعود الشريم',
    country: '🇸🇦 Saudi Arabia',
    style: 'Murattal'
  }
];

// All 114 Surahs metadata
const surahs = [
  { number: 1, name: "Al-Fatihah", arabic: "الفاتحة", ayahs: 7, type: "Meccan" },
  { number: 2, name: "Al-Baqarah", arabic: "البقرة", ayahs: 286, type: "Medinan" },
  { number: 3, name: "Ali 'Imran", arabic: "آل عمران", ayahs: 200, type: "Medinan" },
  { number: 4, name: "An-Nisa", arabic: "النساء", ayahs: 176, type: "Medinan" },
  { number: 5, name: "Al-Ma'idah", arabic: "المائدة", ayahs: 120, type: "Medinan" },
  { number: 6, name: "Al-An'am", arabic: "الأنعام", ayahs: 165, type: "Meccan" },
  { number: 7, name: "Al-A'raf", arabic: "الأعراف", ayahs: 206, type: "Meccan" },
  { number: 8, name: "Al-Anfal", arabic: "الأنفال", ayahs: 75, type: "Medinan" },
  { number: 9, name: "At-Tawbah", arabic: "التوبة", ayahs: 129, type: "Medinan" },
  { number: 10, name: "Yunus", arabic: "يونس", ayahs: 109, type: "Meccan" },
  { number: 11, name: "Hud", arabic: "هود", ayahs: 123, type: "Meccan" },
  { number: 12, name: "Yusuf", arabic: "يوسف", ayahs: 111, type: "Meccan" },
  { number: 13, name: "Ar-Ra'd", arabic: "الرعد", ayahs: 43, type: "Medinan" },
  { number: 14, name: "Ibrahim", arabic: "ابراهيم", ayahs: 52, type: "Meccan" },
  { number: 15, name: "Al-Hijr", arabic: "الحجر", ayahs: 99, type: "Meccan" },
  { number: 16, name: "An-Nahl", arabic: "النحل", ayahs: 128, type: "Meccan" },
  { number: 17, name: "Al-Isra", arabic: "الإسراء", ayahs: 111, type: "Meccan" },
  { number: 18, name: "Al-Kahf", arabic: "الكهف", ayahs: 110, type: "Meccan" },
  { number: 19, name: "Maryam", arabic: "مريم", ayahs: 98, type: "Meccan" },
  { number: 20, name: "Taha", arabic: "طه", ayahs: 135, type: "Meccan" },
  { number: 21, name: "Al-Anbya", arabic: "الأنبياء", ayahs: 112, type: "Meccan" },
  { number: 22, name: "Al-Hajj", arabic: "الحج", ayahs: 78, type: "Medinan" },
  { number: 23, name: "Al-Mu'minun", arabic: "المؤمنون", ayahs: 118, type: "Meccan" },
  { number: 24, name: "An-Nur", arabic: "النور", ayahs: 64, type: "Medinan" },
  { number: 25, name: "Al-Furqan", arabic: "الفرقان", ayahs: 77, type: "Meccan" },
  { number: 26, name: "Ash-Shu'ara", arabic: "الشعراء", ayahs: 227, type: "Meccan" },
  { number: 27, name: "An-Naml", arabic: "النمل", ayahs: 93, type: "Meccan" },
  { number: 28, name: "Al-Qasas", arabic: "القصص", ayahs: 88, type: "Meccan" },
  { number: 29, name: "Al-'Ankabut", arabic: "العنكبوت", ayahs: 69, type: "Meccan" },
  { number: 30, name: "Ar-Rum", arabic: "الروم", ayahs: 60, type: "Meccan" },
  { number: 31, name: "Luqman", arabic: "لقمان", ayahs: 34, type: "Meccan" },
  { number: 32, name: "As-Sajdah", arabic: "السجدة", ayahs: 30, type: "Meccan" },
  { number: 33, name: "Al-Ahzab", arabic: "الأحزاب", ayahs: 73, type: "Medinan" },
  { number: 34, name: "Saba", arabic: "سبإ", ayahs: 54, type: "Meccan" },
  { number: 35, name: "Fatir", arabic: "فاطر", ayahs: 45, type: "Meccan" },
  { number: 36, name: "Ya-Sin", arabic: "يس", ayahs: 83, type: "Meccan" },
  { number: 37, name: "As-Saffat", arabic: "الصافات", ayahs: 182, type: "Meccan" },
  { number: 38, name: "Sad", arabic: "ص", ayahs: 88, type: "Meccan" },
  { number: 39, name: "Az-Zumar", arabic: "الزمر", ayahs: 75, type: "Meccan" },
  { number: 40, name: "Ghafir", arabic: "غافر", ayahs: 85, type: "Meccan" },
  { number: 41, name: "Fussilat", arabic: "فصلت", ayahs: 54, type: "Meccan" },
  { number: 42, name: "Ash-Shuraa", arabic: "الشورى", ayahs: 53, type: "Meccan" },
  { number: 43, name: "Az-Zukhruf", arabic: "الزخرف", ayahs: 89, type: "Meccan" },
  { number: 44, name: "Ad-Dukhan", arabic: "الدخان", ayahs: 59, type: "Meccan" },
  { number: 45, name: "Al-Jathiyah", arabic: "الجاثية", ayahs: 37, type: "Meccan" },
  { number: 46, name: "Al-Ahqaf", arabic: "الأحقاف", ayahs: 35, type: "Meccan" },
  { number: 47, name: "Muhammad", arabic: "محمد", ayahs: 38, type: "Medinan" },
  { number: 48, name: "Al-Fath", arabic: "الفتح", ayahs: 29, type: "Medinan" },
  { number: 49, name: "Al-Hujurat", arabic: "الحجرات", ayahs: 18, type: "Medinan" },
  { number: 50, name: "Qaf", arabic: "ق", ayahs: 45, type: "Meccan" },
  { number: 51, name: "Adh-Dhariyat", arabic: "الذاريات", ayahs: 60, type: "Meccan" },
  { number: 52, name: "At-Tur", arabic: "الطور", ayahs: 49, type: "Meccan" },
  { number: 53, name: "An-Najm", arabic: "النجم", ayahs: 62, type: "Meccan" },
  { number: 54, name: "Al-Qamar", arabic: "القمر", ayahs: 55, type: "Meccan" },
  { number: 55, name: "Ar-Rahman", arabic: "الرحمن", ayahs: 78, type: "Medinan" },
  { number: 56, name: "Al-Waqi'ah", arabic: "الواقعة", ayahs: 96, type: "Meccan" },
  { number: 57, name: "Al-Hadid", arabic: "الحديد", ayahs: 29, type: "Medinan" },
  { number: 58, name: "Al-Mujadila", arabic: "المجادلة", ayahs: 22, type: "Medinan" },
  { number: 59, name: "Al-Hashr", arabic: "الحشر", ayahs: 24, type: "Medinan" },
  { number: 60, name: "Al-Mumtahanah", arabic: "الممتحنة", ayahs: 13, type: "Medinan" },
  { number: 61, name: "As-Saf", arabic: "الصف", ayahs: 14, type: "Medinan" },
  { number: 62, name: "Al-Jumu'ah", arabic: "الجمعة", ayahs: 11, type: "Medinan" },
  { number: 63, name: "Al-Munafiqun", arabic: "المنافقون", ayahs: 11, type: "Medinan" },
  { number: 64, name: "At-Taghabun", arabic: "التغابن", ayahs: 18, type: "Medinan" },
  { number: 65, name: "At-Talaq", arabic: "الطلاق", ayahs: 12, type: "Medinan" },
  { number: 66, name: "At-Tahrim", arabic: "التحريم", ayahs: 12, type: "Medinan" },
  { number: 67, name: "Al-Mulk", arabic: "الملك", ayahs: 30, type: "Meccan" },
  { number: 68, name: "Al-Qalam", arabic: "القلم", ayahs: 52, type: "Meccan" },
  { number: 69, name: "Al-Haqqah", arabic: "الحاقة", ayahs: 52, type: "Meccan" },
  { number: 70, name: "Al-Ma'arij", arabic: "المعارج", ayahs: 44, type: "Meccan" },
  { number: 71, name: "Nuh", arabic: "نوح", ayahs: 28, type: "Meccan" },
  { number: 72, name: "Al-Jinn", arabic: "الجن", ayahs: 28, type: "Meccan" },
  { number: 73, name: "Al-Muzzammil", arabic: "المزمل", ayahs: 20, type: "Meccan" },
  { number: 74, name: "Al-Muddaththir", arabic: "المدثر", ayahs: 56, type: "Meccan" },
  { number: 75, name: "Al-Qiyamah", arabic: "القيامة", ayahs: 40, type: "Meccan" },
  { number: 76, name: "Al-Insan", arabic: "الانسان", ayahs: 31, type: "Medinan" },
  { number: 77, name: "Al-Mursalat", arabic: "المرسلات", ayahs: 50, type: "Meccan" },
  { number: 78, name: "An-Naba", arabic: "النبإ", ayahs: 40, type: "Meccan" },
  { number: 79, name: "An-Nazi'at", arabic: "النازعات", ayahs: 46, type: "Meccan" },
  { number: 80, name: "Abasa", arabic: "عبس", ayahs: 42, type: "Meccan" },
  { number: 81, name: "At-Takwir", arabic: "التكوير", ayahs: 29, type: "Meccan" },
  { number: 82, name: "Al-Infitar", arabic: "الإنفطار", ayahs: 19, type: "Meccan" },
  { number: 83, name: "Al-Mutaffifin", arabic: "المطففين", ayahs: 36, type: "Meccan" },
  { number: 84, name: "Al-Inshiqaq", arabic: "الإنشقاق", ayahs: 25, type: "Meccan" },
  { number: 85, name: "Al-Buruj", arabic: "البروج", ayahs: 22, type: "Meccan" },
  { number: 86, name: "At-Tariq", arabic: "الطارق", ayahs: 17, type: "Meccan" },
  { number: 87, name: "Al-A'la", arabic: "الأعلى", ayahs: 19, type: "Meccan" },
  { number: 88, name: "Al-Ghashiyah", arabic: "الغاشية", ayahs: 26, type: "Meccan" },
  { number: 89, name: "Al-Fajr", arabic: "الفجر", ayahs: 30, type: "Meccan" },
  { number: 90, name: "Al-Balad", arabic: "البلد", ayahs: 20, type: "Meccan" },
  { number: 91, name: "Ash-Shams", arabic: "الشمس", ayahs: 15, type: "Meccan" },
  { number: 92, name: "Al-Layl", arabic: "الليل", ayahs: 21, type: "Meccan" },
  { number: 93, name: "Ad-Duhaa", arabic: "الضحى", ayahs: 11, type: "Meccan" },
  { number: 94, name: "Ash-Sharh", arabic: "الشرح", ayahs: 8, type: "Meccan" },
  { number: 95, name: "At-Tin", arabic: "التين", ayahs: 8, type: "Meccan" },
  { number: 96, name: "Al-'Alaq", arabic: "العلق", ayahs: 19, type: "Meccan" },
  { number: 97, name: "Al-Qadr", arabic: "القدر", ayahs: 5, type: "Meccan" },
  { number: 98, name: "Al-Bayyinah", arabic: "البينة", ayahs: 8, type: "Medinan" },
  { number: 99, name: "Az-Zalzalah", arabic: "الزلزلة", ayahs: 8, type: "Medinan" },
  { number: 100, name: "Al-'Adiyat", arabic: "العاديات", ayahs: 11, type: "Meccan" },
  { number: 101, name: "Al-Qari'ah", arabic: "القارعة", ayahs: 11, type: "Meccan" },
  { number: 102, name: "At-Takathur", arabic: "التكاثر", ayahs: 8, type: "Meccan" },
  { number: 103, name: "Al-'Asr", arabic: "العصر", ayahs: 3, type: "Meccan" },
  { number: 104, name: "Al-Humazah", arabic: "الهمزة", ayahs: 9, type: "Meccan" },
  { number: 105, name: "Al-Fil", arabic: "الفيل", ayahs: 5, type: "Meccan" },
  { number: 106, name: "Quraysh", arabic: "قريش", ayahs: 4, type: "Meccan" },
  { number: 107, name: "Al-Ma'un", arabic: "الماعون", ayahs: 7, type: "Meccan" },
  { number: 108, name: "Al-Kawthar", arabic: "الكوثر", ayahs: 3, type: "Meccan" },
  { number: 109, name: "Al-Kafirun", arabic: "الكافرون", ayahs: 6, type: "Meccan" },
  { number: 110, name: "An-Nasr", arabic: "النصر", ayahs: 3, type: "Medinan" },
  { number: 111, name: "Al-Masad", arabic: "المسد", ayahs: 5, type: "Meccan" },
  { number: 112, name: "Al-Ikhlas", arabic: "الإخلاص", ayahs: 4, type: "Meccan" },
  { number: 113, name: "Al-Falaq", arabic: "الفلق", ayahs: 5, type: "Meccan" },
  { number: 114, name: "An-Nas", arabic: "الناس", ayahs: 6, type: "Meccan" }
];

// State
let currentReciter = localStorage.getItem('selected-reciter') || 'ar.alafasy';
let currentSurah = null;
let currentAudio = null;
let isPlaying = false;
let searchTerm = '';
let filterType = 'all';

// Utility selectors for DOM manipulation
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/**
 * Initialize the recitations module
 * Sets up the reciter selector, surah list, search, and filters
 * Called when the Recitations tab is first opened
 * 
 * @function initRecitations
 * @returns {void}
 * @example
 * // Called from init.js when tab is switched
 * initRecitations();
 */
export function initRecitations() {
  const container = document.querySelector('[data-content="recitations"]');
  if (!container) return;
  
  // Clear container to prevent duplicates
  container.innerHTML = '';
  
  // Render reciter selector dropdown
  renderReciterSelector(container);
  
  // Render the complete list of 114 surahs
  renderSurahList(container);
  
  // Setup search functionality
  setupSearch();
  
  // Setup filters
  setupFilters();
  
  // Attach play listeners after a short delay to ensure DOM is ready
  setTimeout(() => {
    attachPlayListeners();
  }, 100);
}

// Render reciter selector dropdown
function renderReciterSelector(container) {
  const reciterHTML = `
    <div class="reciter-selector">
      <label for="recitationReciterSelect" class="reciter-label">
        <span class="label-icon">🎙️</span>
        <span>Choose Reciter:</span>
      </label>
      <select id="recitationReciterSelect" class="reciter-dropdown">
        ${reciters.map(r => `
          <option value="${r.id}" ${r.id === currentReciter ? 'selected' : ''}>
            ${r.name} ${r.country}
          </option>
        `).join('')}
      </select>
      <div class="reciter-info">
        <div class="reciter-arabic">${reciters.find(r => r.id === currentReciter)?.arabic || ''}</div>
        <div class="reciter-style">Style: ${reciters.find(r => r.id === currentReciter)?.style || ''}</div>
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', reciterHTML);
  
  // Listen for reciter changes
  const select = document.getElementById('recitationReciterSelect');
  if (select) {
    select.addEventListener('change', (e) => {
      currentReciter = e.target.value;
      localStorage.setItem('selected-reciter', currentReciter);
      updateReciterInfo();
      
      // Stop current audio if playing
      if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        isPlaying = false;
        if (currentSurah) {
          updatePlayingState(currentSurah, 'stopped');
          currentSurah = null;
        }
      }
    });
  }
}

// Update reciter info display
function updateReciterInfo() {
  const reciter = reciters.find(r => r.id === currentReciter);
  if (!reciter) return;
  
  const arabicEl = document.querySelector('.reciter-arabic');
  const styleEl = document.querySelector('.reciter-style');
  
  if (arabicEl) arabicEl.textContent = reciter.arabic;
  if (styleEl) styleEl.textContent = `Style: ${reciter.style}`;
}

// Render surah list
function renderSurahList(container) {
  const listHTML = `
    <div class="surah-controls">
      <input 
        type="text" 
        id="surah-search" 
        class="surah-search" 
        placeholder="Search surahs..."
      />
      <div class="surah-filters">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="meccan">Meccan</button>
        <button class="filter-btn" data-filter="medinan">Medinan</button>
      </div>
    </div>
    <div class="surah-list-container">
      <div class="surah-grid" id="surah-grid">
        ${renderSurahs()}
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', listHTML);
}

// Render filtered surahs
function renderSurahs() {
  const filtered = surahs.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.arabic.includes(searchTerm) ||
                          s.number.toString().includes(searchTerm);
    const matchesFilter = filterType === 'all' || s.type.toLowerCase() === filterType;
    return matchesSearch && matchesFilter;
  });
  
  return filtered.map(s => `
    <div class="surah-card" data-surah="${s.number}">
      <div class="surah-number">${s.number}</div>
      <div class="surah-info">
        <div class="surah-name">${s.name}</div>
        <div class="surah-arabic">${s.arabic}</div>
        <div class="surah-meta">
          <span class="surah-type ${s.type.toLowerCase()}">${s.type}</span>
          <span class="surah-ayahs">${s.ayahs} Ayahs</span>
        </div>
      </div>
      <button class="play-surah-btn" data-surah="${s.number}" title="Play ${s.name}">
        <span class="play-icon">▶️</span>
      </button>
    </div>
  `).join('');
}

// Setup search functionality
function setupSearch() {
  const searchInput = document.getElementById('surah-search');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    updateSurahList();
  });
}

// Setup filter buttons
function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterType = btn.dataset.filter;
      updateSurahList();
    });
  });
}

// Update surah list display
function updateSurahList() {
  const grid = document.getElementById('surah-grid');
  if (!grid) return;
  
  grid.innerHTML = renderSurahs();
  attachPlayListeners();
}

// Attach play button listeners
function attachPlayListeners() {
  const playBtns = document.querySelectorAll('.play-surah-btn');
  
  playBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const surahNum = parseInt(btn.dataset.surah);
      playSurah(surahNum);
    });
  });
  
  // Also make cards clickable
  const cards = document.querySelectorAll('.surah-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const surahNum = parseInt(card.dataset.surah);
      playSurah(surahNum);
    });
  });
}

// Play surah recitation
async function playSurah(surahNumber) {
  const surah = surahs.find(s => s.number === surahNumber);
  if (!surah) {
    console.error('Surah not found:', surahNumber);
    return;
  }
  
  // Stop current audio if playing
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  
  // Update UI to show loading
  updatePlayingState(surahNumber, 'loading');
  
  console.log('Playing surah:', surah.name, 'Number:', surahNumber, 'with reciter:', currentReciter);
  
  // Use download.quranicaudio.com - verified working CDN with correct folder paths
  const quranicAudioPaths = {
    'ar.alafasy': 'mishaari_raashid_al_3afaasee',
    'ar.abdulbasitmurattal': 'abdulbaset_mujawwad',
    'ar.abdurrahmaansudais': 'abdurrahmaan_as-sudays',
    'ar.husary': 'mahmood_khaleel_al-husaree',
    'ar.minshawi': 'muhammad_siddeeq_al-minshaawee',
    'ar.mahermuaiqly': 'maahir_al-muayqilee',
    'ar.ahmedajamy': 'ahmad_ibn_3ali_al-3ajamy',
    'ar.hanirifai': 'haani_arrifaai',
    'ar.shaatree': 'abu_bakr_ash-shaatree',
    'ar.saoodshuraym': 'sa3d_al-ghaamidi'
  };
  
  const reciterPath = quranicAudioPaths[currentReciter] || 'mishaari_raashid_al_3afaasee';
  const paddedNumber = surahNumber.toString().padStart(3, '0');
  
  // Use download.quranicaudio.com which is the official verified CDN
  const audioUrl = `https://download.quranicaudio.com/quran/${reciterPath}/${paddedNumber}.mp3`;
  
  console.log('Loading audio URL:', audioUrl);
  
  // Create and play audio
  try {
    currentAudio = new Audio();
    currentAudio.preload = 'auto';
    currentAudio.src = audioUrl;
    currentSurah = surahNumber;
    
    // Keep a reference to this specific audio instance
    const thisAudio = currentAudio;
    
    // Add a timeout to detect if audio is stuck
    const loadTimeout = setTimeout(() => {
      if (thisAudio.readyState < 2 && currentAudio === thisAudio) {
        console.error('Audio loading timeout');
        updatePlayingState(surahNumber, 'error');
        alert(`Timeout loading ${surah.name}. Please check your internet connection.`);
        currentAudio = null;
        currentSurah = null;
      }
    }, 15000); // 15 second timeout
    
    thisAudio.addEventListener('loadeddata', () => {
      clearTimeout(loadTimeout);
      console.log('Audio data loaded, attempting to play');
      
      // Check if this audio is still the current one
      if (currentAudio === thisAudio && thisAudio) {
        thisAudio.play()
          .then(() => {
            console.log('Audio playing successfully');
            isPlaying = true;
            updatePlayingState(surahNumber, 'playing');
          })
          .catch(err => {
            console.error('Playback error:', err);
            updatePlayingState(surahNumber, 'error');
            alert(`Failed to play recitation for ${surah.name}. ${err.message}`);
            if (currentAudio === thisAudio) {
              currentAudio = null;
              currentSurah = null;
            }
          });
      }
    });
    
    thisAudio.addEventListener('ended', () => {
      console.log('Audio ended');
      if (currentAudio === thisAudio) {
        isPlaying = false;
        updatePlayingState(surahNumber, 'stopped');
        currentAudio = null;
        currentSurah = null;
      }
    });
    
    thisAudio.addEventListener('error', (e) => {
      console.error('Error loading audio');
      console.error('Error code:', thisAudio.error?.code);
      console.error('Error message:', thisAudio.error?.message);
      
      if (currentAudio === thisAudio) {
        updatePlayingState(surahNumber, 'error');
        alert(`Failed to load recitation for ${surah.name}. Please check your internet connection or try another reciter.`);
        currentAudio = null;
        currentSurah = null;
      }
    });
    
  } catch (error) {
    console.error('Error creating audio:', error);
    updatePlayingState(surahNumber, 'error');
    alert(`Error: ${error.message}`);
  }
}

// Update playing state UI
function updatePlayingState(surahNumber, state) {
  const allCards = document.querySelectorAll('.surah-card');
  const allBtns = document.querySelectorAll('.play-surah-btn');
  
  // Reset all cards
  allCards.forEach(card => {
    card.classList.remove('playing', 'loading');
  });
  
  allBtns.forEach(btn => {
    btn.innerHTML = '<span class="play-icon">▶️</span>';
    btn.disabled = false;
  });
  
  // Update target card
  const targetCard = document.querySelector(`.surah-card[data-surah="${surahNumber}"]`);
  const targetBtn = document.querySelector(`.play-surah-btn[data-surah="${surahNumber}"]`);
  
  if (!targetCard || !targetBtn) return;
  
  switch(state) {
    case 'loading':
      targetCard.classList.add('loading');
      targetBtn.innerHTML = '<span class="play-icon">⏳</span>';
      targetBtn.disabled = true;
      break;
    case 'playing':
      targetCard.classList.add('playing');
      targetBtn.innerHTML = '<span class="play-icon">⏸️</span>';
      targetBtn.onclick = (e) => {
        e.stopPropagation();
        if (currentAudio) {
          currentAudio.pause();
          currentAudio = null;
          isPlaying = false;
          currentSurah = null;
          updatePlayingState(surahNumber, 'stopped');
        }
      };
      break;
    case 'stopped':
    case 'error':
      // Already reset above
      break;
  }
}

// Remove the initialization at the bottom - it's called from init.js now
