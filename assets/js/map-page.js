import { initThemeToggle } from './theme.js';
import { initDhikrReminder } from './dhikr-reminder.js';

// Selectors
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// Initialize
initThemeToggle();
initDhikrReminder();

// Update footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Surah metadata with revelation order
const surahData = [
  { number: 1, name: "Al-Fatihah", arabic: "الفاتحة", ayahs: 7, type: "Meccan", order: 5, juz: 1 },
  { number: 2, name: "Al-Baqarah", arabic: "البقرة", ayahs: 286, type: "Medinan", order: 87, juz: 1 },
  { number: 3, name: "Ali 'Imran", arabic: "آل عمران", ayahs: 200, type: "Medinan", order: 89, juz: 3 },
  { number: 4, name: "An-Nisa", arabic: "النساء", ayahs: 176, type: "Medinan", order: 92, juz: 4 },
  { number: 5, name: "Al-Ma'idah", arabic: "المائدة", ayahs: 120, type: "Medinan", order: 112, juz: 6 },
  { number: 6, name: "Al-An'am", arabic: "الأنعام", ayahs: 165, type: "Meccan", order: 55, juz: 7 },
  { number: 7, name: "Al-A'raf", arabic: "الأعراف", ayahs: 206, type: "Meccan", order: 39, juz: 8 },
  { number: 8, name: "Al-Anfal", arabic: "الأنفال", ayahs: 75, type: "Medinan", order: 88, juz: 9 },
  { number: 9, name: "At-Tawbah", arabic: "التوبة", ayahs: 129, type: "Medinan", order: 113, juz: 10 },
  { number: 10, name: "Yunus", arabic: "يونس", ayahs: 109, type: "Meccan", order: 51, juz: 11 },
  { number: 11, name: "Hud", arabic: "هود", ayahs: 123, type: "Meccan", order: 52, juz: 11 },
  { number: 12, name: "Yusuf", arabic: "يوسف", ayahs: 111, type: "Meccan", order: 53, juz: 12 },
  { number: 13, name: "Ar-Ra'd", arabic: "الرعد", ayahs: 43, type: "Medinan", order: 96, juz: 13 },
  { number: 14, name: "Ibrahim", arabic: "ابراهيم", ayahs: 52, type: "Meccan", order: 72, juz: 13 },
  { number: 15, name: "Al-Hijr", arabic: "الحجر", ayahs: 99, type: "Meccan", order: 54, juz: 14 },
  { number: 16, name: "An-Nahl", arabic: "النحل", ayahs: 128, type: "Meccan", order: 70, juz: 14 },
  { number: 17, name: "Al-Isra", arabic: "الإسراء", ayahs: 111, type: "Meccan", order: 50, juz: 15 },
  { number: 18, name: "Al-Kahf", arabic: "الكهف", ayahs: 110, type: "Meccan", order: 69, juz: 15 },
  { number: 19, name: "Maryam", arabic: "مريم", ayahs: 98, type: "Meccan", order: 44, juz: 16 },
  { number: 20, name: "Taha", arabic: "طه", ayahs: 135, type: "Meccan", order: 45, juz: 16 },
  { number: 21, name: "Al-Anbya", arabic: "الأنبياء", ayahs: 112, type: "Meccan", order: 73, juz: 17 },
  { number: 22, name: "Al-Hajj", arabic: "الحج", ayahs: 78, type: "Medinan", order: 103, juz: 17 },
  { number: 23, name: "Al-Mu'minun", arabic: "المؤمنون", ayahs: 118, type: "Meccan", order: 74, juz: 18 },
  { number: 24, name: "An-Nur", arabic: "النور", ayahs: 64, type: "Medinan", order: 102, juz: 18 },
  { number: 25, name: "Al-Furqan", arabic: "الفرقان", ayahs: 77, type: "Meccan", order: 42, juz: 18 },
  { number: 26, name: "Ash-Shu'ara", arabic: "الشعراء", ayahs: 227, type: "Meccan", order: 47, juz: 19 },
  { number: 27, name: "An-Naml", arabic: "النمل", ayahs: 93, type: "Meccan", order: 48, juz: 19 },
  { number: 28, name: "Al-Qasas", arabic: "القصص", ayahs: 88, type: "Meccan", order: 49, juz: 20 },
  { number: 29, name: "Al-'Ankabut", arabic: "العنكبوت", ayahs: 69, type: "Meccan", order: 85, juz: 20 },
  { number: 30, name: "Ar-Rum", arabic: "الروم", ayahs: 60, type: "Meccan", order: 84, juz: 21 },
  { number: 31, name: "Luqman", arabic: "لقمان", ayahs: 34, type: "Meccan", order: 57, juz: 21 },
  { number: 32, name: "As-Sajdah", arabic: "السجدة", ayahs: 30, type: "Meccan", order: 75, juz: 21 },
  { number: 33, name: "Al-Ahzab", arabic: "الأحزاب", ayahs: 73, type: "Medinan", order: 90, juz: 21 },
  { number: 34, name: "Saba", arabic: "سبإ", ayahs: 54, type: "Meccan", order: 58, juz: 22 },
  { number: 35, name: "Fatir", arabic: "فاطر", ayahs: 45, type: "Meccan", order: 43, juz: 22 },
  { number: 36, name: "Ya-Sin", arabic: "يس", ayahs: 83, type: "Meccan", order: 41, juz: 22 },
  { number: 37, name: "As-Saffat", arabic: "الصافات", ayahs: 182, type: "Meccan", order: 56, juz: 23 },
  { number: 38, name: "Sad", arabic: "ص", ayahs: 88, type: "Meccan", order: 38, juz: 23 },
  { number: 39, name: "Az-Zumar", arabic: "الزمر", ayahs: 75, type: "Meccan", order: 59, juz: 23 },
  { number: 40, name: "Ghafir", arabic: "غافر", ayahs: 85, type: "Meccan", order: 60, juz: 24 },
  { number: 41, name: "Fussilat", arabic: "فصلت", ayahs: 54, type: "Meccan", order: 61, juz: 24 },
  { number: 42, name: "Ash-Shuraa", arabic: "الشورى", ayahs: 53, type: "Meccan", order: 62, juz: 25 },
  { number: 43, name: "Az-Zukhruf", arabic: "الزخرف", ayahs: 89, type: "Meccan", order: 63, juz: 25 },
  { number: 44, name: "Ad-Dukhan", arabic: "الدخان", ayahs: 59, type: "Meccan", order: 64, juz: 25 },
  { number: 45, name: "Al-Jathiyah", arabic: "الجاثية", ayahs: 37, type: "Meccan", order: 65, juz: 25 },
  { number: 46, name: "Al-Ahqaf", arabic: "الأحقاف", ayahs: 35, type: "Meccan", order: 66, juz: 26 },
  { number: 47, name: "Muhammad", arabic: "محمد", ayahs: 38, type: "Medinan", order: 95, juz: 26 },
  { number: 48, name: "Al-Fath", arabic: "الفتح", ayahs: 29, type: "Medinan", order: 111, juz: 26 },
  { number: 49, name: "Al-Hujurat", arabic: "الحجرات", ayahs: 18, type: "Medinan", order: 106, juz: 26 },
  { number: 50, name: "Qaf", arabic: "ق", ayahs: 45, type: "Meccan", order: 34, juz: 26 },
  { number: 51, name: "Adh-Dhariyat", arabic: "الذاريات", ayahs: 60, type: "Meccan", order: 67, juz: 26 },
  { number: 52, name: "At-Tur", arabic: "الطور", ayahs: 49, type: "Meccan", order: 76, juz: 27 },
  { number: 53, name: "An-Najm", arabic: "النجم", ayahs: 62, type: "Meccan", order: 23, juz: 27 },
  { number: 54, name: "Al-Qamar", arabic: "القمر", ayahs: 55, type: "Meccan", order: 37, juz: 27 },
  { number: 55, name: "Ar-Rahman", arabic: "الرحمن", ayahs: 78, type: "Medinan", order: 97, juz: 27 },
  { number: 56, name: "Al-Waqi'ah", arabic: "الواقعة", ayahs: 96, type: "Meccan", order: 46, juz: 27 },
  { number: 57, name: "Al-Hadid", arabic: "الحديد", ayahs: 29, type: "Medinan", order: 94, juz: 27 },
  { number: 58, name: "Al-Mujadila", arabic: "المجادلة", ayahs: 22, type: "Medinan", order: 105, juz: 28 },
  { number: 59, name: "Al-Hashr", arabic: "الحشر", ayahs: 24, type: "Medinan", order: 101, juz: 28 },
  { number: 60, name: "Al-Mumtahanah", arabic: "الممتحنة", ayahs: 13, type: "Medinan", order: 91, juz: 28 },
  { number: 61, name: "As-Saf", arabic: "الصف", ayahs: 14, type: "Medinan", order: 109, juz: 28 },
  { number: 62, name: "Al-Jumu'ah", arabic: "الجمعة", ayahs: 11, type: "Medinan", order: 110, juz: 28 },
  { number: 63, name: "Al-Munafiqun", arabic: "المنافقون", ayahs: 11, type: "Medinan", order: 104, juz: 28 },
  { number: 64, name: "At-Taghabun", arabic: "التغابن", ayahs: 18, type: "Medinan", order: 108, juz: 28 },
  { number: 65, name: "At-Talaq", arabic: "الطلاق", ayahs: 12, type: "Medinan", order: 99, juz: 28 },
  { number: 66, name: "At-Tahrim", arabic: "التحريم", ayahs: 12, type: "Medinan", order: 107, juz: 28 },
  { number: 67, name: "Al-Mulk", arabic: "الملك", ayahs: 30, type: "Meccan", order: 77, juz: 29 },
  { number: 68, name: "Al-Qalam", arabic: "القلم", ayahs: 52, type: "Meccan", order: 2, juz: 29 },
  { number: 69, name: "Al-Haqqah", arabic: "الحاقة", ayahs: 52, type: "Meccan", order: 78, juz: 29 },
  { number: 70, name: "Al-Ma'arij", arabic: "المعارج", ayahs: 44, type: "Meccan", order: 79, juz: 29 },
  { number: 71, name: "Nuh", arabic: "نوح", ayahs: 28, type: "Meccan", order: 71, juz: 29 },
  { number: 72, name: "Al-Jinn", arabic: "الجن", ayahs: 28, type: "Meccan", order: 40, juz: 29 },
  { number: 73, name: "Al-Muzzammil", arabic: "المزمل", ayahs: 20, type: "Meccan", order: 3, juz: 29 },
  { number: 74, name: "Al-Muddaththir", arabic: "المدثر", ayahs: 56, type: "Meccan", order: 4, juz: 29 },
  { number: 75, name: "Al-Qiyamah", arabic: "القيامة", ayahs: 40, type: "Meccan", order: 31, juz: 29 },
  { number: 76, name: "Al-Insan", arabic: "الانسان", ayahs: 31, type: "Medinan", order: 98, juz: 29 },
  { number: 77, name: "Al-Mursalat", arabic: "المرسلات", ayahs: 50, type: "Meccan", order: 33, juz: 29 },
  { number: 78, name: "An-Naba", arabic: "النبإ", ayahs: 40, type: "Meccan", order: 80, juz: 30 },
  { number: 79, name: "An-Nazi'at", arabic: "النازعات", ayahs: 46, type: "Meccan", order: 81, juz: 30 },
  { number: 80, name: "Abasa", arabic: "عبس", ayahs: 42, type: "Meccan", order: 24, juz: 30 },
  { number: 81, name: "At-Takwir", arabic: "التكوير", ayahs: 29, type: "Meccan", order: 7, juz: 30 },
  { number: 82, name: "Al-Infitar", arabic: "الإنفطار", ayahs: 19, type: "Meccan", order: 82, juz: 30 },
  { number: 83, name: "Al-Mutaffifin", arabic: "المطففين", ayahs: 36, type: "Meccan", order: 86, juz: 30 },
  { number: 84, name: "Al-Inshiqaq", arabic: "الإنشقاق", ayahs: 25, type: "Meccan", order: 83, juz: 30 },
  { number: 85, name: "Al-Buruj", arabic: "البروج", ayahs: 22, type: "Meccan", order: 27, juz: 30 },
  { number: 86, name: "At-Tariq", arabic: "الطارق", ayahs: 17, type: "Meccan", order: 36, juz: 30 },
  { number: 87, name: "Al-A'la", arabic: "الأعلى", ayahs: 19, type: "Meccan", order: 8, juz: 30 },
  { number: 88, name: "Al-Ghashiyah", arabic: "الغاشية", ayahs: 26, type: "Meccan", order: 68, juz: 30 },
  { number: 89, name: "Al-Fajr", arabic: "الفجر", ayahs: 30, type: "Meccan", order: 10, juz: 30 },
  { number: 90, name: "Al-Balad", arabic: "البلد", ayahs: 20, type: "Meccan", order: 35, juz: 30 },
  { number: 91, name: "Ash-Shams", arabic: "الشمس", ayahs: 15, type: "Meccan", order: 26, juz: 30 },
  { number: 92, name: "Al-Layl", arabic: "الليل", ayahs: 21, type: "Meccan", order: 9, juz: 30 },
  { number: 93, name: "Ad-Duhaa", arabic: "الضحى", ayahs: 11, type: "Meccan", order: 11, juz: 30 },
  { number: 94, name: "Ash-Sharh", arabic: "الشرح", ayahs: 8, type: "Meccan", order: 12, juz: 30 },
  { number: 95, name: "At-Tin", arabic: "التين", ayahs: 8, type: "Meccan", order: 28, juz: 30 },
  { number: 96, name: "Al-'Alaq", arabic: "العلق", ayahs: 19, type: "Meccan", order: 1, juz: 30 },
  { number: 97, name: "Al-Qadr", arabic: "القدر", ayahs: 5, type: "Meccan", order: 25, juz: 30 },
  { number: 98, name: "Al-Bayyinah", arabic: "البينة", ayahs: 8, type: "Medinan", order: 100, juz: 30 },
  { number: 99, name: "Az-Zalzalah", arabic: "الزلزلة", ayahs: 8, type: "Medinan", order: 93, juz: 30 },
  { number: 100, name: "Al-'Adiyat", arabic: "العاديات", ayahs: 11, type: "Meccan", order: 14, juz: 30 },
  { number: 101, name: "Al-Qari'ah", arabic: "القارعة", ayahs: 11, type: "Meccan", order: 30, juz: 30 },
  { number: 102, name: "At-Takathur", arabic: "التكاثر", ayahs: 8, type: "Meccan", order: 16, juz: 30 },
  { number: 103, name: "Al-'Asr", arabic: "العصر", ayahs: 3, type: "Meccan", order: 13, juz: 30 },
  { number: 104, name: "Al-Humazah", arabic: "الهمزة", ayahs: 9, type: "Meccan", order: 32, juz: 30 },
  { number: 105, name: "Al-Fil", arabic: "الفيل", ayahs: 5, type: "Meccan", order: 19, juz: 30 },
  { number: 106, name: "Quraysh", arabic: "قريش", ayahs: 4, type: "Meccan", order: 29, juz: 30 },
  { number: 107, name: "Al-Ma'un", arabic: "الماعون", ayahs: 7, type: "Meccan", order: 17, juz: 30 },
  { number: 108, name: "Al-Kawthar", arabic: "الكوثر", ayahs: 3, type: "Meccan", order: 15, juz: 30 },
  { number: 109, name: "Al-Kafirun", arabic: "الكافرون", ayahs: 6, type: "Meccan", order: 18, juz: 30 },
  { number: 110, name: "An-Nasr", arabic: "النصر", ayahs: 3, type: "Medinan", order: 114, juz: 30 },
  { number: 111, name: "Al-Masad", arabic: "المسد", ayahs: 5, type: "Meccan", order: 6, juz: 30 },
  { number: 112, name: "Al-Ikhlas", arabic: "الإخلاص", ayahs: 4, type: "Meccan", order: 22, juz: 30 },
  { number: 113, name: "Al-Falaq", arabic: "الفلق", ayahs: 5, type: "Meccan", order: 20, juz: 30 },
  { number: 114, name: "An-Nas", arabic: "الناس", ayahs: 6, type: "Meccan", order: 21, juz: 30 }
];

// View switching
const viewButtons = $$('.map-btn');
const views = $$('.map-view');

// Track initialized views
const initializedViews = new Set(['timeline']); // Timeline will be initialized on load

viewButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    
    // Update buttons
    viewButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update views
    views.forEach(v => v.classList.remove('active'));
    $(`#${view}-view`).classList.add('active');
    
    // Initialize view if needed
    if (!initializedViews.has(view)) {
      if (view === 'heatmap') {
        initHeatmap();
      } else if (view === 'juz') {
        initJuz();
      } else if (view === 'stats') {
        initStats();
      }
      initializedViews.add(view);
    }
  });
});

// Initialize Timeline View
function initTimeline() {
  const svg = $('#timeline-svg');
  const container = $('#timeline-container');
  const width = container.clientWidth;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 60;
  
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  
  // Sort by revelation order
  const sortedSurahs = [...surahData].sort((a, b) => a.order - b.order);
  
  // Draw circles for each surah
  sortedSurahs.forEach((surah, idx) => {
    const angle = (idx / 114) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    // Circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', 4);
    circle.setAttribute('fill', surah.type === 'Meccan' ? '#10b981' : '#3b82f6');
    circle.setAttribute('class', 'timeline-dot');
    circle.setAttribute('data-surah', surah.number);
    
    // Tooltip
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title.textContent = `${surah.number}. ${surah.name} (${surah.arabic})\nRevealed ${idx + 1}/${114} - ${surah.type}\n${surah.ayahs} Ayahs`;
    circle.appendChild(title);
    
    svg.appendChild(circle);
  });
  
  // Add center text
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', centerX);
  text.setAttribute('y', centerY);
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('dominant-baseline', 'middle');
  text.setAttribute('font-size', '24');
  text.setAttribute('font-weight', 'bold');
  text.setAttribute('fill', 'var(--text)');
  text.textContent = 'Revelation';
  svg.appendChild(text);
  
  const text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text2.setAttribute('x', centerX);
  text2.setAttribute('y', centerY + 30);
  text2.setAttribute('text-anchor', 'middle');
  text2.setAttribute('dominant-baseline', 'middle');
  text2.setAttribute('font-size', '16');
  text2.setAttribute('fill', 'var(--muted)');
  text2.textContent = 'Timeline';
  svg.appendChild(text2);
}

// Initialize Heat Map View
function initHeatmap() {
  const container = $('#heatmap-container');
  const maxAyahs = Math.max(...surahData.map(s => s.ayahs));
  
  surahData.forEach(surah => {
    const intensity = surah.ayahs / maxAyahs;
    const hue = 200 - (intensity * 80); // Blue to red gradient
    
    const cell = document.createElement('div');
    cell.className = 'heatmap-cell';
    cell.style.backgroundColor = `hsl(${hue}, 70%, ${60 - intensity * 30}%)`;
    cell.title = `${surah.number}. ${surah.name}\n${surah.ayahs} Ayahs - ${surah.type}`;
    cell.textContent = surah.number;
    
    cell.addEventListener('click', () => {
      window.location.href = `quran.html?surah=${surah.number}`;
    });
    
    container.appendChild(cell);
  });
}

// Initialize Juz' View
function initJuz() {
  const container = $('#juz-container');
  
  // Define which surahs start in each Juz'
  const juzStarts = {
    1: [1, 2], 2: [2], 3: [2, 3], 4: [3, 4], 5: [4], 6: [4, 5], 7: [5, 6], 8: [6, 7], 9: [7, 8],
    10: [8, 9], 11: [9, 10, 11], 12: [11, 12], 13: [12, 13, 14], 14: [15, 16], 15: [17, 18],
    16: [18, 19, 20], 17: [21, 22], 18: [23, 24, 25], 19: [25, 26, 27], 20: [27, 28, 29],
    21: [29, 30, 31, 32, 33], 22: [33, 34, 35, 36], 23: [36, 37, 38, 39], 24: [39, 40, 41],
    25: [41, 42, 43, 44, 45], 26: [46, 47, 48, 49, 50, 51], 27: [51, 52, 53, 54, 55, 56, 57],
    28: [58, 59, 60, 61, 62, 63, 64, 65, 66], 29: [67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77],
    30: [78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114]
  };
  
  for (let i = 1; i <= 30; i++) {
    const surahNumbers = juzStarts[i] || [];
    const juzSurahs = surahData.filter(s => surahNumbers.includes(s.number));
    const totalAyahs = juzSurahs.reduce((sum, s) => sum + s.ayahs, 0);
    
    const card = document.createElement('div');
    card.className = 'juz-card';
    card.innerHTML = `
      <div class="juz-number">Juz' ${i}</div>
      <div class="juz-info">
        <div class="juz-stat">
          <span class="label">Surahs:</span>
          <span class="value">${juzSurahs.length}</span>
        </div>
        <div class="juz-stat">
          <span class="label">Total Ayahs:</span>
          <span class="value">${totalAyahs}</span>
        </div>
      </div>
      <div class="juz-surahs">
        ${juzSurahs.map(s => `<span class="juz-surah" title="${s.name} - ${s.ayahs} ayahs">${s.number}</span>`).join(' ')}
      </div>
    `;
    
    container.appendChild(card);
  }
}

// Initialize Statistics View
function initStats() {
  // Revelation chart
  const revChart = $('#revelation-chart');
  const meccanCount = surahData.filter(s => s.type === 'Meccan').length;
  const medinanCount = surahData.filter(s => s.type === 'Medinan').length;
  const meccanPercent = (meccanCount / 114 * 100).toFixed(1);
  const medinanPercent = (medinanCount / 114 * 100).toFixed(1);
  
  revChart.innerHTML = `
    <div class="bar-chart">
      <div class="bar-item">
        <div class="bar-label">Meccan</div>
        <div class="bar-bg">
          <div class="bar-fill meccan" style="width: ${meccanPercent}%"></div>
        </div>
        <div class="bar-value">${meccanCount} (${meccanPercent}%)</div>
      </div>
      <div class="bar-item">
        <div class="bar-label">Medinan</div>
        <div class="bar-bg">
          <div class="bar-fill medinan" style="width: ${medinanPercent}%"></div>
        </div>
        <div class="bar-value">${medinanCount} (${medinanPercent}%)</div>
      </div>
    </div>
  `;
  
  // Length chart
  const lengthChart = $('#length-chart');
  const longest = [...surahData].sort((a, b) => b.ayahs - a.ayahs).slice(0, 10);
  const maxLength = longest[0].ayahs;
  
  lengthChart.innerHTML = `
    <div class="bar-chart">
      ${longest.map(s => `
        <div class="bar-item">
          <div class="bar-label">${s.number}. ${s.name}</div>
          <div class="bar-bg">
            <div class="bar-fill length" style="width: ${(s.ayahs / maxLength * 100)}%"></div>
          </div>
          <div class="bar-value">${s.ayahs} ayahs</div>
        </div>
      `).join('')}
    </div>
  `;
}

// Initialize first view
initTimeline();
