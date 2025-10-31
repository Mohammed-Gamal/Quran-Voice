// Dhikr Reminder System
// Periodically shows dhikr reminders with audio and hadith

// Collection of dhikr with audio, Arabic text, transliteration, translation, and related hadith
const dhikrCollection = [
  {
    id: 1,
    arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
    transliteration: "Subhanallahi wa bihamdihi",
    translation: "Glory be to Allah and praise Him",
    benefit: "Whoever says this 100 times a day, his sins will be forgiven even if they are like the foam of the sea.",
    hadith: "The Prophet ﷺ said: 'Whoever says Subhan Allah wa bihamdihi 100 times a day, his sins will be forgiven even if they are like the foam of the sea.' (Bukhari & Muslim)",
    audio: null,
    count: 100
  },
  {
    id: 2,
    arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
    transliteration: "Subhanallah, walhamdulillah, wa la ilaha illallah, wallahu akbar",
    translation: "Glory be to Allah, praise be to Allah, there is no god but Allah, and Allah is the Greatest",
    benefit: "These are the most beloved words to Allah and the best of dhikr.",
    hadith: "The Prophet ﷺ said: 'The most beloved words to Allah are four: Subhanallah, Alhamdulillah, La ilaha illallah, and Allahu Akbar.' (Muslim)",
    audio: null,
    count: 10
  },
  {
    id: 3,
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku walahul-hamdu wa huwa 'ala kulli shay'in qadir",
    translation: "There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him belongs all praise, and He has power over everything",
    benefit: "Saying this 10 times is like freeing four slaves from the children of Isma'il.",
    hadith: "The Prophet ﷺ said: 'Whoever says this ten times, it will be as if he freed four slaves from the children of Isma'il.' (Bukhari & Muslim)",
    audio: null,
    count: 10
  },
  {
    id: 4,
    arabic: "أَسْتَغْفِرُ اللهَ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullah wa atubu ilayh",
    translation: "I seek forgiveness from Allah and I repent to Him",
    benefit: "The Prophet ﷺ used to seek forgiveness more than 70 times a day.",
    hadith: "The Prophet ﷺ said: 'By Allah, I seek forgiveness from Allah and repent to Him more than seventy times a day.' (Bukhari)",
    audio: null,
    count: 100
  },
  {
    id: 5,
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "La hawla wa la quwwata illa billah",
    translation: "There is no power nor strength except with Allah",
    benefit: "This is a treasure from the treasures of Paradise.",
    hadith: "The Prophet ﷺ said: 'Shall I not tell you of a treasure from the treasures of Paradise? La hawla wa la quwwata illa billah.' (Bukhari & Muslim)",
    audio: null,
    count: 10
  },
  {
    id: 6,
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
    transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammad",
    translation: "O Allah, send blessings upon Muhammad and the family of Muhammad",
    benefit: "Whoever sends blessings upon the Prophet once, Allah will send blessings upon him ten times.",
    hadith: "The Prophet ﷺ said: 'Whoever sends blessings upon me once, Allah will send blessings upon him ten times.' (Muslim)",
    audio: null,
    count: 10
  },
  {
    id: 7,
    arabic: "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَاللَّهُ أَكْبَرُ",
    transliteration: "Subhanallah, walhamdulillah, wallahu akbar",
    translation: "Glory be to Allah, praise be to Allah, and Allah is the Greatest",
    benefit: "These words are more beloved to Allah than anything the sun rises upon.",
    hadith: "The Prophet ﷺ said: 'To say Subhanallah, Alhamdulillah, and Allahu Akbar is more beloved to me than anything the sun rises upon.' (Muslim)",
    audio: null,
    count: 33
  },
  {
    id: 8,
    arabic: "رَضِيتُ بِاللهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
    transliteration: "Raditu billahi rabban, wa bil-Islami dinan, wa bi-Muhammadin ﷺ nabiyyan",
    translation: "I am pleased with Allah as my Lord, Islam as my religion, and Muhammad ﷺ as my Prophet",
    benefit: "Paradise becomes obligatory for whoever says this with conviction.",
    hadith: "The Prophet ﷺ said: 'Whoever says: I am pleased with Allah as Lord, Islam as religion, and Muhammad as Prophet, Paradise becomes obligatory for him.' (Abu Dawud)",
    audio: null,
    count: 3
  }
];

// State
let reminderInterval = null;
let currentNotification = null;
let userSettings = {
  enabled: true,
  frequency: 15, // minutes
  playAudio: true,
  lastShown: null
};

// Load settings from localStorage
function loadSettings() {
  const saved = localStorage.getItem('dhikr-reminder-settings');
  if (saved) {
    userSettings = { ...userSettings, ...JSON.parse(saved) };
  }
}

// Save settings to localStorage
function saveSettings() {
  localStorage.setItem('dhikr-reminder-settings', JSON.stringify(userSettings));
}

// Create notification element
function createNotificationElement() {
  const notification = document.createElement('div');
  notification.id = 'dhikr-notification';
  notification.className = 'dhikr-notification';
  notification.innerHTML = `
    <div class="dhikr-notification-content">
      <button class="dhikr-close" aria-label="Close notification">&times;</button>
      <div class="dhikr-icon">🤲</div>
      <h3 class="dhikr-title">Time for Dhikr</h3>
      <div class="dhikr-arabic"></div>
      <div class="dhikr-transliteration"></div>
      <div class="dhikr-translation"></div>
      <div class="dhikr-benefit"></div>
      <div class="dhikr-hadith"></div>
      <div class="dhikr-counter">
        <span class="counter-label">Recommended:</span>
        <span class="counter-value"></span>
      </div>
      <div class="dhikr-actions">
        <button class="dhikr-btn dhikr-btn-primary" id="dhikr-audio-btn">
          🔊 Play Audio
        </button>
        <button class="dhikr-btn dhikr-btn-secondary" id="dhikr-dismiss-btn">
          Dismiss
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(notification);
  return notification;
}

// Show random dhikr notification
function showDhikrReminder() {
  if (!userSettings.enabled) return;
  
  // Don't show if already visible
  if (currentNotification && currentNotification.classList.contains('show')) {
    return;
  }
  
  // Select random dhikr
  const dhikr = dhikrCollection[Math.floor(Math.random() * dhikrCollection.length)];
  
  // Get or create notification element
  if (!currentNotification) {
    currentNotification = createNotificationElement();
  }
  
  // Populate with dhikr data
  currentNotification.querySelector('.dhikr-arabic').textContent = dhikr.arabic;
  currentNotification.querySelector('.dhikr-transliteration').textContent = dhikr.transliteration;
  currentNotification.querySelector('.dhikr-translation').textContent = dhikr.translation;
  currentNotification.querySelector('.dhikr-benefit').textContent = '💫 ' + dhikr.benefit;
  currentNotification.querySelector('.dhikr-hadith').textContent = '📖 ' + dhikr.hadith;
  currentNotification.querySelector('.counter-value').textContent = `${dhikr.count}x`;
  
  // Show notification with animation
  setTimeout(() => {
    currentNotification.classList.add('show');
  }, 100);
  
  // Update last shown time
  userSettings.lastShown = Date.now();
  saveSettings();
  
  // Setup event listeners
  setupNotificationListeners(dhikr);
  
  // Auto-dismiss after 30 seconds
  setTimeout(() => {
    if (currentNotification && currentNotification.classList.contains('show')) {
      dismissNotification();
    }
  }, 30000);
}

// Setup notification event listeners
function setupNotificationListeners(dhikr) {
  const closeBtn = currentNotification.querySelector('.dhikr-close');
  const dismissBtn = currentNotification.querySelector('#dhikr-dismiss-btn');
  const audioBtn = currentNotification.querySelector('#dhikr-audio-btn');
  
  // Remove old listeners
  closeBtn.replaceWith(closeBtn.cloneNode(true));
  dismissBtn.replaceWith(dismissBtn.cloneNode(true));
  audioBtn.replaceWith(audioBtn.cloneNode(true));
  
  // Add new listeners
  const newCloseBtn = currentNotification.querySelector('.dhikr-close');
  const newDismissBtn = currentNotification.querySelector('#dhikr-dismiss-btn');
  const newAudioBtn = currentNotification.querySelector('#dhikr-audio-btn');
  
  newCloseBtn.addEventListener('click', dismissNotification);
  newDismissBtn.addEventListener('click', dismissNotification);
  
  newAudioBtn.addEventListener('click', () => {
    playDhikrAudio(dhikr);
  });
}

// Dismiss notification
function dismissNotification() {
  if (currentNotification) {
    currentNotification.classList.remove('show');
  }
}

// Play audio for dhikr (Text-to-Speech fallback)
function playDhikrAudio(dhikr) {
  if (!userSettings.playAudio) return;
  
  // Use Web Speech API for Arabic text
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(dhikr.arabic);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    
    // Try to find Arabic voice
    const voices = speechSynthesis.getVoices();
    const arabicVoice = voices.find(voice => voice.lang.includes('ar'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }
    
    speechSynthesis.cancel(); // Cancel any ongoing speech
    speechSynthesis.speak(utterance);
    
    // Update button state
    const audioBtn = currentNotification.querySelector('#dhikr-audio-btn');
    audioBtn.textContent = '🔊 Playing...';
    audioBtn.disabled = true;
    
    utterance.onend = () => {
      audioBtn.textContent = '🔊 Play Audio';
      audioBtn.disabled = false;
    };
  } else {
    alert('Audio playback is not supported in your browser.');
  }
}

// Create settings panel
function createSettingsPanel() {
  const panel = document.createElement('div');
  panel.id = 'dhikr-settings-panel';
  panel.className = 'dhikr-settings-panel';
  panel.innerHTML = `
    <div class="dhikr-settings-content">
      <h3>Dhikr Reminder Settings</h3>
      <div class="setting-item">
        <label class="setting-label">
          <input type="checkbox" id="dhikr-enabled" ${userSettings.enabled ? 'checked' : ''}>
          <span>Enable Dhikr Reminders</span>
        </label>
      </div>
      <div class="setting-item">
        <label class="setting-label">
          <input type="checkbox" id="dhikr-audio" ${userSettings.playAudio ? 'checked' : ''}>
          <span>Enable Audio Playback</span>
        </label>
      </div>
      <div class="setting-item">
        <label class="setting-label" for="dhikr-frequency">
          <span>Reminder Frequency</span>
        </label>
        <select id="dhikr-frequency" class="setting-select">
          <option value="5" ${userSettings.frequency === 5 ? 'selected' : ''}>Every 5 minutes</option>
          <option value="10" ${userSettings.frequency === 10 ? 'selected' : ''}>Every 10 minutes</option>
          <option value="15" ${userSettings.frequency === 15 ? 'selected' : ''}>Every 15 minutes</option>
          <option value="30" ${userSettings.frequency === 30 ? 'selected' : ''}>Every 30 minutes</option>
          <option value="60" ${userSettings.frequency === 60 ? 'selected' : ''}>Every hour</option>
        </select>
      </div>
      <div class="setting-actions">
        <button class="dhikr-btn dhikr-btn-primary" id="dhikr-save-settings">Save</button>
        <button class="dhikr-btn dhikr-btn-secondary" id="dhikr-test-reminder">Test Reminder</button>
      </div>
    </div>
  `;
  document.body.appendChild(panel);
  
  // Setup settings listeners
  document.getElementById('dhikr-save-settings').addEventListener('click', () => {
    userSettings.enabled = document.getElementById('dhikr-enabled').checked;
    userSettings.playAudio = document.getElementById('dhikr-audio').checked;
    userSettings.frequency = parseInt(document.getElementById('dhikr-frequency').value);
    saveSettings();
    
    // Restart interval with new frequency
    startReminderInterval();
    
    alert('Settings saved! ✅');
  });
  
  document.getElementById('dhikr-test-reminder').addEventListener('click', () => {
    showDhikrReminder();
  });
}

// Create floating settings button
function createSettingsButton() {
  const button = document.createElement('button');
  button.id = 'dhikr-settings-btn';
  button.className = 'dhikr-settings-btn';
  button.innerHTML = '🤲';
  button.title = 'Dhikr Reminder Settings';
  button.setAttribute('aria-label', 'Open Dhikr Reminder Settings');
  
  button.addEventListener('click', () => {
    const panel = document.getElementById('dhikr-settings-panel');
    panel.classList.toggle('show');
  });
  
  document.body.appendChild(button);
}

// Start reminder interval
function startReminderInterval() {
  // Clear existing interval
  if (reminderInterval) {
    clearInterval(reminderInterval);
  }
  
  if (!userSettings.enabled) return;
  
  // Set new interval
  const intervalMs = userSettings.frequency * 60 * 1000;
  reminderInterval = setInterval(() => {
    showDhikrReminder();
  }, intervalMs);
}

// Initialize the dhikr reminder system
export function initDhikrReminder() {
  loadSettings();
  createSettingsButton();
  createSettingsPanel();
  
  // Load voices for speech synthesis
  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      speechSynthesis.getVoices();
    };
  }
  
  // Start reminder interval
  startReminderInterval();
  
  // Show first reminder after 2 minutes if enabled
  if (userSettings.enabled) {
    setTimeout(() => {
      showDhikrReminder();
    }, 120000); // 2 minutes
  }
}

// Close settings panel when clicking outside
document.addEventListener('click', (e) => {
  const panel = document.getElementById('dhikr-settings-panel');
  const button = document.getElementById('dhikr-settings-btn');
  
  if (panel && button && !panel.contains(e.target) && !button.contains(e.target)) {
    panel.classList.remove('show');
  }
});
