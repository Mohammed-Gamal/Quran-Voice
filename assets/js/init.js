import { initThemeToggle } from './theme.js';
import { initCommon } from './common.js';
import { initRadios } from './radios.js';
import { initAzkar } from './azkar.js';
import { initCustomPlayer } from './player.js';
import { initDhikrReminder } from './dhikr-reminder.js';
import { initRecitations } from './recitations.js';
import { initBackground } from './background.js';

initBackground();
initThemeToggle();
initCommon();
initRadios();
initAzkar();
initCustomPlayer();
initDhikrReminder();

// Display Hijri Date (Offline-first calculation)
function initHijriDate() {
  const el = document.getElementById('hijriDate');
  if (!el) return;

  try {
    const today = new Date();
    // Force Islamic calendar (Umm al-Qura) with English month names
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    // Format the date parts
    const parts = formatter.format(today);
    // Usually looks like "Shawwal 15, 1445 AH" -> convert to "15 Shawwal 1445"
    // Intl output varies by browser, so we'll clean it up
    const cleaned = parts.replace(/AH|BE|[,]/g, '').trim();
    
    el.innerHTML = `🌙 <span>${cleaned}</span>`;
  } catch (err) {
    console.error('Hijri conversion failed:', err);
    el.style.display = 'none';
  }
}

initHijriDate();

// Calculate and Display Upcoming Islamic Events
async function initUpcomingEvents() {
    const listEl = document.getElementById('eventList');
    if (!listEl) return;

    // Fixed Islamic Dates (Month is 1-indexed for logic)
    const holyEvents = [
        { name: "Prophet's Birthday", day: 12, month: 3, hijri: "12 Rabi' I" },
        { name: "Ramadan Start", day: 1, month: 9, hijri: "1 Ramadan" },
        { name: "Eid al-Fitr", day: 1, month: 10, hijri: "1 Shawwal" },
        { name: "Day of Arafah", day: 9, month: 12, hijri: "9 Dhu al-Hijjah" },
        { name: "Eid al-Adha", day: 10, month: 12, hijri: "10 Dhu al-Hijjah" },
        { name: "Islamic New Year", day: 1, month: 1, hijri: "1 Muharram" }
    ];

    try {
        const today = new Date();
        const hijriFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });
        
        const parts = hijriFormatter.formatToParts(today);
        const hDay = parseInt(parts.find(p => p.type === 'day').value);
        const hMonth = parseInt(parts.find(p => p.type === 'month').value);
        const hYear = parseInt(parts.find(p => p.type === 'year').value);

        // Sort events by proximity
        const sortedEvents = await Promise.all(holyEvents.map(async (event) => {
            let year = hYear;
            // If the event month has passed or is the current month but day has passed, it's next year
            if (event.month < hMonth || (event.month === hMonth && event.day < hDay)) {
                year++;
            }

            // Convert Hijri back to Gregorian for display
            try {
                const response = await fetch(`https://api.aladhan.com/v1/hToG/${event.day}-${event.month}-${year}`);
                const data = await response.json();
                if (data.code === 200) {
                    const g = data.data.gregorian;
                    return { 
                        ...event, 
                        displayDate: `${g.day} ${g.month.en} ${g.year}`,
                        timestamp: new Date(`${g.year}-${g.month.number}-${g.day}`).getTime()
                    };
                }
            } catch (e) {
                console.error("Conversion failed", e);
            }
            return null;
        }));

        const finalEvents = sortedEvents
            .filter(e => e !== null)
            .sort((a, b) => a.timestamp - b.timestamp)
            .slice(0, 5);

        listEl.innerHTML = finalEvents.map(event => `
            <div class="event-item">
                <span class="event-name">${event.name} (${event.hijri})</span>
                <span class="event-date">${event.displayDate}</span>
            </div>
        `).join('');

    } catch (err) {
        console.error('Events calculation failed:', err);
        document.getElementById('upcomingEvents').style.display = 'none';
    }
}

initUpcomingEvents();

// Immersive/Zen Mode Functionality
function initImmersiveMode() {
    const toggleBtn = document.getElementById('immersiveToggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('immersive-mode');
        
        // Disable scroll in immersive mode
        if (document.body.classList.contains('immersive-mode')) {
            document.body.style.overflow = 'hidden';
            toggleBtn.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                </svg>
            `;
            toggleBtn.title = "Exit Immersive Mode";
        } else {
            document.body.style.overflow = '';
            toggleBtn.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
            `;
            toggleBtn.title = "Toggle Immersive Mode";
        }
    });
}

initImmersiveMode();

// Close Upcoming Events logic
const closeEventsBtn = document.getElementById('closeEvents');
const eventsWidget = document.getElementById('upcomingEvents');
if (closeEventsBtn && eventsWidget) {
    closeEventsBtn.addEventListener('click', () => {
        eventsWidget.style.display = 'none';
    });
}

// Tab switching functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.dataset.tab;
    
    // Update buttons
    tabButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    
    // Update content
    tabContents.forEach(content => {
      content.classList.remove('active');
    });
    const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
    if (targetContent) {
      targetContent.classList.add('active');
    }
    
    // Initialize recitations when tab is opened
    if (targetTab === 'recitations' && !window.recitationsInitialized) {
      initRecitations();
      window.recitationsInitialized = true;
    }
  });
});
