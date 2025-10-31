import { initThemeToggle } from './theme.js';
import { initCommon } from './common.js';
import { initRadios } from './radios.js';
import { initAzkar } from './azkar.js';
import { initCustomPlayer } from './player.js';
import { initDhikrReminder } from './dhikr-reminder.js';
import { initRecitations } from './recitations.js';

initThemeToggle();
initCommon();
initRadios();
initAzkar();
initCustomPlayer();
initDhikrReminder();

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
