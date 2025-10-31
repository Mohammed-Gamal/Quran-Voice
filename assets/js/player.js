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
  const elDur = wrapper.querySelector('[data-duration]');

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
    if (!rngSeek || !isFinite(audio.duration)) return;
    const val = (audio.currentTime / audio.duration) * 100 || 0;
    rngSeek.style.background = `linear-gradient(90deg, var(--primary) 0%, var(--primary) ${val}%, rgba(127,143,255,.25) ${val}%)`;
  };

  // Init defaults
  if (rngVol) rngVol.value = String(audio.volume ?? 1);
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
  });

  selRate?.addEventListener('change', () => {
    const r = clamp(parseFloat(selRate.value || '1'), 0.5, 2);
    audio.playbackRate = r;
  });

  // Audio events
  audio.addEventListener('loadedmetadata', () => {
    if (elDur) elDur.textContent = fmt(audio.duration);
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
    if (rngVol) rngVol.value = String(audio.volume ?? 1);
  });
  audio.addEventListener('ended', () => setPlayIcon(false));
  audio.addEventListener('error', () => {
    if (elCur) elCur.textContent = 'Error';
  });

  // Sync initial state
  setPlayIcon(!audio.paused);
  setMuteIcon(audio.muted || audio.volume === 0);
}
