// Custom audio player wiring for #quraanAudio and controls inside .audio-player
export function initCustomPlayer() {
  const audio = document.getElementById('quraanAudio');
  const wrapper = document.querySelector('.audio-player');
  if (!audio || !wrapper) return;

  const btnPlay = wrapper.querySelector('[data-play]');
  const btnMute = wrapper.querySelector('[data-mute]');
  const rngSeek = wrapper.querySelector('[data-seek]');
  const rngVol = wrapper.querySelector('[data-volume]');
  const selRate = wrapper.querySelector('[data-rate]');
  const elCur = wrapper.querySelector('[data-current]');

  // Helpers
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const fmt = (t) => {
    if (!isFinite(t) || t < 0) return '--:--';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  };
  const setPlayIcon = (playing) => {
    if (!btnPlay) return;
    btnPlay.textContent = playing ? '⏸' : '▶︎';
    btnPlay.setAttribute('aria-pressed', playing ? 'true' : 'false');
    btnPlay.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  };
  const setMuteIcon = (muted) => {
    if (!btnMute) return;
    btnMute.textContent = muted ? '🔇' : '🔈';
    btnMute.setAttribute('aria-pressed', muted ? 'true' : 'false');
    btnMute.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
  };
  const updateProgressBG = () => {
    if (rngSeek && isFinite(audio.duration)) {
      const val = (audio.currentTime / audio.duration) * 100 || 0;
      // Liquid Wave Effect using multiple gradients
      rngSeek.style.background = `
        linear-gradient(90deg, 
          var(--primary) 0%, 
          var(--primary) ${val}%, 
          rgba(127,143,255,0.05) ${val}%),
        repeating-linear-gradient(45deg, 
          rgba(255,255,255,0.1) 0px, 
          rgba(255,255,255,0.1) 10px, 
          transparent 10px, 
          transparent 20px)
      `;
      rngSeek.style.backgroundSize = "200% 100%, 40px 40px";
      if (!audio.paused) {
          rngSeek.style.backgroundPosition = `${-val}% 0, 0 0`;
      }
    }
    if (rngVol) {
      const volVal = (audio.muted ? 0 : audio.volume) * 100;
      rngVol.style.background = `linear-gradient(90deg, var(--primary) 0%, var(--primary) ${volVal}%, rgba(127,143,255,.1) ${volVal}%)`;
    }
  };

  // Init defaults
  if (rngVol) {
    rngVol.value = String(audio.volume ?? 1);
    updateProgressBG();
  }
  if (selRate) selRate.value = String(audio.playbackRate ?? 1);

  // Button events
  btnPlay?.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {/* gesture required */});
    } else {
      audio.pause();
    }
  });

  btnMute?.addEventListener('click', () => {
    audio.muted = !audio.muted;
    updateProgressBG();
  });

  // Range events
  rngSeek?.addEventListener('input', () => {
    if (!isFinite(audio.duration)) return;
    const val = clamp(parseFloat(rngSeek.value || '0'), 0, audio.duration);
    audio.currentTime = val;
    updateProgressBG();
  });

  rngVol?.addEventListener('input', () => {
    const v = clamp(parseFloat(rngVol.value || '1'), 0, 1);
    audio.volume = v;
    if (v > 0) audio.muted = false;
    updateProgressBG();
  });

  selRate?.addEventListener('change', () => {
    const r = clamp(parseFloat(selRate.value || '1'), 0.5, 2);
    audio.playbackRate = r;
  });

  // Audio events
  audio.addEventListener('loadedmetadata', () => {
    if (rngSeek) {
      rngSeek.max = isFinite(audio.duration) ? String(Math.floor(audio.duration)) : '0';
      rngSeek.value = '0';
      updateProgressBG();
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (elCur) elCur.textContent = fmt(audio.currentTime);
    if (rngSeek && isFinite(audio.duration)) {
      rngSeek.valueAsNumber = Math.floor(audio.currentTime);
      updateProgressBG();
    }
  });

  audio.addEventListener('play', () => setPlayIcon(true));
  audio.addEventListener('pause', () => setPlayIcon(false));
  audio.addEventListener('volumechange', () => {
    setMuteIcon(audio.muted || audio.volume === 0);
    if (rngVol) {
      rngVol.value = String(audio.muted ? 0 : audio.volume);
    }
    updateProgressBG();
  });
  audio.addEventListener('ended', () => setPlayIcon(false));
  audio.addEventListener('error', () => {
    if (elCur) elCur.textContent = 'Error';
  });

  // Sync initial state
  setPlayIcon(!audio.paused);
  setMuteIcon(audio.muted || audio.volume === 0);

  // Audio Visualizer Implementation
  const initVisualizer = () => {
    const visualizer = document.getElementById('visualizer');
    if (!visualizer || !audio) return;

    // Create bars
    const barCount = 40;
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('div');
      bar.className = 'v-bar';
      visualizer.appendChild(bar);
    }

    const bars = visualizer.querySelectorAll('.v-bar');
    
    // Web Audio API Setup
    let audioCtx;
    let analyzer;
    let source;
    let dataArray;
    let animationId;

    const setupAudioContext = () => {
      if (audioCtx) return;
      
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyzer = audioCtx.createAnalyser();
        // Use the existing audio element as source
        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyzer);
        analyzer.connect(audioCtx.destination);

        analyzer.fftSize = 64; // Small fftSize for few bars
        const bufferLength = analyzer.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
      } catch (e) {
        console.warn("Web Audio API not supported or blocked", e);
      }
    };

    const updateBars = () => {
      if (audio.paused) {
        bars.forEach(bar => bar.style.height = '2px');
        cancelAnimationFrame(animationId);
        return;
      }

      if (analyzer && dataArray) {
        analyzer.getByteFrequencyData(dataArray);
        
        // Map frequency data to our bars
        bars.forEach((bar, i) => {
          const index = Math.floor((i / bars.length) * dataArray.length);
          const value = dataArray[index];
          // Scale value (0-255) to a visible height (e.g., max 40px)
          const height = (value / 255) * 40 + 2;
          bar.style.height = `${height}px`;
        });
      } else {
        // Fallback to rhythmic animation if AudioContext fails
        const time = Date.now() / 1000;
        bars.forEach((bar, i) => {
            const noise = Math.sin(time * 10 + i) * 0.5 + 0.5;
            const height = Math.random() * 15 + (noise * 15);
            bar.style.height = `${height}px`;
        });
      }
      animationId = requestAnimationFrame(updateBars);
    };

    audio.addEventListener('play', () => {
        setupAudioContext();
        if (audioCtx?.state === 'suspended') {
            audioCtx.resume();
        }
        updateBars();
    });
    audio.addEventListener('pause', () => {
        bars.forEach(bar => bar.style.height = '2px');
    });
  };

  initVisualizer();
}
