# 🕌 Quran Voice

> A modern, elegant, and accessible web application for experiencing the Holy Quran through live radio streams, complete recitations, interactive visualizations, and daily adhkar.

[![Made with Love](https://img.shields.io/badge/Made%20with-❤-red.svg)]()
[![Islamic Content](https://img.shields.io/badge/Content-Islamic-green.svg)]()

## ✨ Features

### 🎙️ **Quran Radio Streams**
- Live 24/7 Quran radio broadcasts
- Multiple radio stations from around the world
- High-quality audio streaming
- Custom audio player with playback controls (play/pause, volume, speed, seek)

### 📖 **Complete Quran Recitations**
- 10+ renowned reciters including:
  - Mishary Rashid Alafasy 🇰🇼
  - Abdul Basit Abdul Samad 🇪🇬
  - Abdur-Rahman as-Sudais 🇸🇦
  - Mahmoud Khalil Al-Hussary 🇪🇬
  - Mohamed Siddiq Al-Minshawi 🇪🇬
  - Maher Al Muaiqly 🇸🇦
  - And more...
- All 114 Surahs available for instant playback
- Search and filter by surah name
- Filter by Meccan/Medinan revelations
- High-quality audio from verified CDN sources

### 📚 **Quran Reading Interface**
- Complete Quran text in Arabic with proper typography
- English translations
- Tafseer (exegesis) for deeper understanding
- Clean, readable interface
- Easy navigation between surahs

### 🗺️ **Visual Map**
- Interactive Quran structure visualization
- Surah relationships and themes
- Beautiful data visualizations
- Educational insights into Quran organization

### 📿 **Daily Adhkar (Dhikr Reminders)**
- 8 authentic adhkar with verified sources
- Arabic text with transliteration
- English translations
- Authentic Hadith references and spiritual benefits
- Audio playback using Web Speech API
- Customizable reminder frequency (5-60 minutes)
- Beautiful popup notifications with slide-in animations
- Floating settings button for easy access

### 🕌 **Prayer Times**
- Accurate prayer times based on your location
- Multiple calculation methods
- Visual prayer schedule
- GPS-based automatic location detection

### 🎨 **Modern UI/UX**
- Clean, minimalist design
- Dark/Light theme toggle with system preference detection
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Accessibility compliant (ARIA labels, keyboard navigation)
- Progressive Web App (PWA) ready

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Internet connection for streaming content

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/quran-voice.git
   cd quran-voice
   ```

2. **Open in Browser**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Or simply open index.html in your browser
   ```

3. **Navigate**
   Visit `http://localhost:8000` in your browser

## 📁 Project Structure

```
quran-voice/
├── index.html              # Home: Radios & Recitations tabs
├── quran.html             # Quran reading with translations
├── map.html               # Interactive visual Quran map
├── prayer.html            # Prayer times calculator
├── about.html             # About page
├── style.css              # Global styles
├── manifest.json          # PWA manifest
├── README.md              # Documentation
│
├── assets/
│   ├── logo.svg           # Site logo
│   ├── Logo2.png          # Icon/Favicon
│   │
│   └── js/
│       ├── init.js              # Main initialization
│       ├── theme.js             # Theme toggle
│       ├── common.js            # Shared utilities
│       ├── radios.js            # Radio streaming
│       ├── recitations.js       # Quran recitations
│       ├── azkar.js             # Daily adhkar
│       ├── player.js            # Audio player
│       ├── dhikr-reminder.js    # Dhikr notifications
│       ├── quran-page.js        # Quran reading
│       ├── prayer-page.js       # Prayer times
│       └── map-page.js          # Visual map
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup, accessibility
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Modules, Async/Await
- **Web APIs**:
  - Web Audio API
  - Web Speech API
  - Geolocation API
  - LocalStorage API
  - Fetch API

## 🔌 Data Sources

- **Quran Audio**: [download.quranicaudio.com](https://download.quranicaudio.com/)
- **Quran Text**: Verified Islamic sources
- **Adhkar**: Authentic hadith collections

## 🎯 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Fully Supported |
| Firefox | 88+     | ✅ Fully Supported |
| Safari  | 14+     | ✅ Fully Supported |
| Edge    | 90+     | ✅ Fully Supported |

## ⚙️ Configuration

### Dhikr Reminder Settings
- Notification frequency: 5-60 minutes
- Audio playback: Enable/disable
- Settings saved in LocalStorage

### Theme Customization
- Auto-detection of system preference
- Manual toggle in header
- CSS variables for easy customization

## 📱 PWA Features

- ✅ Installable on mobile/desktop
- ✅ App-like experience
- ✅ Responsive design
- ✅ Fast loading

## ♿ Accessibility

WCAG 2.1 Level AA compliant:
- ✅ Keyboard navigation
- ✅ Screen reader optimized
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ High contrast
- ✅ Skip links

## 🐛 Known Issues & Roadmap

### Future Enhancements
- [ ] Offline mode with Service Worker
- [ ] Bookmarks for surahs
- [ ] Repeat and shuffle options
- [ ] Audio visualizer
- [ ] Multiple language support
- [ ] Share functionality

## 🙏 Acknowledgments

- All Quranic reciters for their beautiful recitations
- Islamic scholars for authentic collections
- The open-source community
- Allah (SWT) for guidance

## 🌟 Show Your Support

If this project helped you:
- ⭐ Star the repository
- 🤲 Make dua for the developers
- 📢 Share with others
- 💝 Contribute improvements

---

<div align="center">
  <p><strong>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</strong></p>
  <p><em>"And We have certainly made the Quran easy for remembrance, so is there any who will remember?"</em></p>
  <p><strong>- Surah Al-Qamar (54:17)</strong></p>
  <br>
  <p>Made with ❤️ and ☪️ for the Muslim Ummah</p>
</div>
