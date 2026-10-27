/**
 * POP THE BALLOON — Sky Arcade Reflex Game
 * 60FPS Physics Engine, Dynamic Upward Float, & Web Audio Synthesizer
 * Copyright © 2026 Gamility (All Rights Reserved)
 */

(function () {
  'use strict';

  /* ==========================================================================
     BALLOON COLOR PALETTES & VECTOR BLUEPRINTS
     ========================================================================== */
  const COLOR_PALETTES = [
    { type: 'red', base: '#ff4757', light: '#ff8787', dark: '#c0392b' },
    { type: 'blue', base: '#1e90ff', light: '#70a1ff', dark: '#0984e3' },
    { type: 'yellow', base: '#ffa502', light: '#fed330', dark: '#e67e22' },
    { type: 'green', base: '#2ed573', light: '#7bed9f', dark: '#26af5f' },
    { type: 'purple', base: '#9b59b6', light: '#d8b4e2', dark: '#8e44ad' },
    { type: 'pink', base: '#ff6b81', light: '#ffa8b6', dark: '#ee5253' }
  ];

  function getBalloonSVG(palette, special = null) {
    if (special === 'bomb') {
      return `
        <svg class="balloon-svg" viewBox="0 0 100 135" width="100%" height="100%">
          <defs>
            <radialGradient id="bombGrad" cx="35%" cy="32%" r="65%">
              <stop offset="0%" stop-color="#475569"/>
              <stop offset="45%" stop-color="#1e293b"/>
              <stop offset="100%" stop-color="#020617"/>
            </radialGradient>
          </defs>
          <!-- Danger Spikes Protruding -->
          <polygon points="50,4 44,22 56,22" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
          <polygon points="20,18 32,28 24,36" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
          <polygon points="80,18 76,36 68,28" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
          <polygon points="8,54 24,48 22,60" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
          <polygon points="92,54 78,60 76,48" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
          <polygon points="18,88 28,76 34,84" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
          <polygon points="82,88 66,84 72,76" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>

          <!-- Dangling Burning Fuse String -->
          <path d="M50 104 Q46 114 54 122 T48 135" stroke="#ea580c" stroke-width="2.2" stroke-linecap="round" fill="none"/>

          <!-- Knot -->
          <polygon points="46,104 54,104 50,98" fill="#0f172a"/>

          <!-- Bomb Spherical Body -->
          <circle cx="50" cy="54" r="38" fill="url(#bombGrad)" stroke="#ef4444" stroke-width="2.5"/>

          <!-- Specular Highlight -->
          <ellipse cx="36" cy="38" rx="7" ry="12" transform="rotate(-30 36 38)" fill="#ffffff" opacity="0.35"/>

          <!-- Danger Exclamation Symbol -->
          <circle cx="50" cy="54" r="14" fill="#ef4444"/>
          <text x="50" y="60" font-family="'Outfit', sans-serif" font-weight="900" font-size="18" fill="#ffffff" text-anchor="middle">!</text>
        </svg>
      `;
    }

    if (special === 'gold') {
      return `
        <svg class="balloon-svg" viewBox="0 0 100 135" width="100%" height="100%">
          <defs>
            <radialGradient id="goldGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="45%" stop-color="#facc15"/>
              <stop offset="90%" stop-color="#d97706"/>
              <stop offset="100%" stop-color="#92400e"/>
            </radialGradient>
          </defs>
          <path d="M50 100 Q45 110 53 118 T48 132" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.85"/>
          <polygon points="46,100 54,100 50,95" fill="#b45309"/>
          <ellipse cx="50" cy="52" rx="34" ry="44" fill="url(#goldGrad)"/>
          <ellipse cx="36" cy="35" rx="7" ry="14" transform="rotate(-25 36 35)" fill="#ffffff" opacity="0.75"/>
          <circle cx="42" cy="24" r="2.5" fill="#ffffff" opacity="0.9"/>
          <!-- Star Badge -->
          <path d="M50 44 L53 52 L61 53 L55 58 L57 66 L50 62 L43 66 L45 58 L39 53 L47 52 Z" fill="#ffffff"/>
        </svg>
      `;
    }

    if (special === 'ice') {
      return `
        <svg class="balloon-svg" viewBox="0 0 100 135" width="100%" height="100%">
          <defs>
            <radialGradient id="iceGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="45%" stop-color="#7dd3fc"/>
              <stop offset="90%" stop-color="#0284c7"/>
              <stop offset="100%" stop-color="#0369a1"/>
            </radialGradient>
          </defs>
          <path d="M50 100 Q46 110 54 118 T49 132" stroke="#e0f2fe" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.85"/>
          <polygon points="46,100 54,100 50,95" fill="#0284c7"/>
          <ellipse cx="50" cy="52" rx="34" ry="44" fill="url(#iceGrad)"/>
          <ellipse cx="36" cy="35" rx="7" ry="14" transform="rotate(-25 36 35)" fill="#ffffff" opacity="0.8"/>
          <!-- Snowflake Icon -->
          <text x="50" y="62" font-size="24" text-anchor="middle">❄️</text>
        </svg>
      `;
    }

    if (special === 'heart') {
      return `
        <svg class="balloon-svg" viewBox="0 0 100 135" width="100%" height="100%">
          <defs>
            <radialGradient id="heartGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stop-color="#ffe4e6"/>
              <stop offset="45%" stop-color="#f43f5e"/>
              <stop offset="90%" stop-color="#be123c"/>
              <stop offset="100%" stop-color="#881337"/>
            </radialGradient>
          </defs>
          <path d="M50 100 Q45 110 53 118 T48 132" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.85"/>
          <polygon points="46,100 54,100 50,95" fill="#be123c"/>
          <ellipse cx="50" cy="52" rx="34" ry="44" fill="url(#heartGrad)"/>
          <ellipse cx="36" cy="35" rx="7" ry="14" transform="rotate(-25 36 35)" fill="#ffffff" opacity="0.75"/>
          <text x="50" y="62" font-size="24" text-anchor="middle">❤️</text>
        </svg>
      `;
    }

    // Standard Colorful Balloon
    const gradId = `balloonGrad_${palette.type}_${Math.floor(Math.random() * 10000)}`;
    return `
      <svg class="balloon-svg" viewBox="0 0 100 135" width="100%" height="100%">
        <defs>
          <radialGradient id="${gradId}" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stop-color="${palette.light}"/>
            <stop offset="45%" stop-color="${palette.base}"/>
            <stop offset="90%" stop-color="${palette.dark}"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0.25"/>
          </radialGradient>
        </defs>
        <!-- Wavy String -->
        <path d="M50 100 Q45 110 53 118 T48 132" stroke="#f1f5f9" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.85"/>
        <!-- Knot -->
        <polygon points="46,100 54,100 50,95" fill="${palette.dark}"/>
        <!-- Main Balloon Oval -->
        <ellipse cx="50" cy="52" rx="34" ry="44" fill="url(#${gradId})"/>
        <!-- 3D Specular Highlights -->
        <ellipse cx="36" cy="35" rx="7" ry="14" transform="rotate(-25 36 35)" fill="#ffffff" opacity="0.65"/>
        <circle cx="42" cy="24" r="2.5" fill="#ffffff" opacity="0.8"/>
      </svg>
    `;
  }

  /* ==========================================================================
     GAME CONFIGURATION & CONSTANTS
     ========================================================================== */
  const STORAGE_KEY_HIGHSCORE = 'gamility_pop_balloon_high_score';

  const CONFIG = {
    initialLives: 3,
    maxLives: 3,
    baseScoreRegular: 100,
    baseScoreGold: 300,

    // Spawn Timing (Relaxed, comfortable cadence)
    baseSpawnIntervalMs: 1350,
    minSpawnIntervalMs: 650,

    // Ascent Speed (Percentage of screen per second - calibrated for PC mouse aim)
    baseSpeedPercent: 14, // Takes ~8.9 seconds to cross screen initially (pleasant & manageable)
    maxSpeedPercent: 25,  // Smoothly scales as score climbs

    // Probabilities
    probBomb: 0.16,
    probGold: 0.10,
    probIce: 0.08,
    probHeart: 0.04
  };

  /* ==========================================================================
     GAME STATE
     ========================================================================== */
  let STATE = {
    status: 'IDLE', // 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAMEOVER'
    score: 0,
    highScore: 0,
    lives: CONFIG.initialLives,
    combo: 1,
    bestCombo: 1,
    balloonsPopped: 0,
    totalSpawned: 0,
    totalHits: 0,
    totalClicks: 0,
    isMuted: false,

    // Freeze Slow-Motion
    freezeMultiplier: 1.0,
    freezeTimeout: null,

    // Active Flying Balloons List
    balloons: [], // [{ id, type, palette, x, y, speed, swayFreq, swayAmp, time, element }]

    // Animation & Spawn Timers
    lastFrameTime: 0,
    spawnTimer: null
  };

  /* ==========================================================================
     DOM ELEMENTS
     ========================================================================== */
  const DOM = {
    hudScore: document.getElementById('hudScore'),
    hudHighScore: document.getElementById('hudHighScore'),
    hudComboBadge: document.getElementById('hudComboBadge'),
    hudHearts: document.getElementById('hudHearts'),
    btnToggleAudio: document.getElementById('btnToggleAudio'),
    audioIcon: document.getElementById('audioIcon'),
    btnPauseGame: document.getElementById('btnPauseGame'),

    skyStage: document.getElementById('skyStage'),
    balloonPlayfield: document.getElementById('balloonPlayfield'),
    particleOverlay: document.getElementById('particleOverlay'),
    shockFlashScreen: document.getElementById('shockFlashScreen'),
    frostFreezeScreen: document.getElementById('frostFreezeScreen'),

    startOverlay: document.getElementById('startOverlay'),
    btnStartGame: document.getElementById('btnStartGame'),

    pauseOverlay: document.getElementById('pauseOverlay'),
    btnResumeGame: document.getElementById('btnResumeGame'),
    btnRestartFromPause: document.getElementById('btnRestartFromPause'),

    gameOverOverlay: document.getElementById('gameOverOverlay'),
    finalScoreVal: document.getElementById('finalScoreVal'),
    finalBalloonsPopped: document.getElementById('finalBalloonsPopped'),
    finalBestCombo: document.getElementById('finalBestCombo'),
    finalAccuracy: document.getElementById('finalAccuracy'),
    finalHighScoreVal: document.getElementById('finalHighScoreVal'),
    btnPlayAgain: document.getElementById('btnPlayAgain')
  };

  /* ==========================================================================
     PROCEDURAL WEB AUDIO SYNTHESIZER
     ========================================================================== */
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (AudioClass) audioCtx = new AudioClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // 1. Crisp Acoustic Balloon Rubber Pop
  function playPopSound(pitchShift = 1.0) {
    if (STATE.isMuted || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      const startFreq = (450 + Math.random() * 120) * pitchShift;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(startFreq * 2.2, now + 0.04);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  // 2. Golden Star Fanfare Chime
  function playGoldChime() {
    if (STATE.isMuted || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1174.66, now + 0.06);
      osc.frequency.setValueAtTime(1479.98, now + 0.12);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.38);
    } catch (e) {}
  }

  // 3. Freeze Breeze Sound
  function playFreezeSound() {
    if (STATE.isMuted || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.3);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  // 4. Heart Recovery Chime
  function playHeartChime() {
    if (STATE.isMuted || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);        // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      osc.frequency.setValueAtTime(1046.5, now + 0.24); // C6

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.48);
    } catch (e) {}
  }

  // 5. Bomb Blast Explosion
  function playBombExplosion() {
    if (STATE.isMuted || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.42);
    } catch (e) {}
  }

  // 6. Game Over Fanfare
  function playGameOverFanfare() {
    if (STATE.isMuted || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(392, now);
      osc.frequency.setValueAtTime(349.23, now + 0.2);
      osc.frequency.setValueAtTime(329.63, now + 0.4);
      osc.frequency.setValueAtTime(261.63, now + 0.6);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 1.15);
    } catch (e) {}
  }

  /* ==========================================================================
     HIGH SCORE & PERSISTENCE
     ========================================================================== */
  function loadHighScore() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HIGHSCORE);
      if (saved) {
        STATE.highScore = parseInt(saved, 10) || 0;
      }
    } catch (e) {}
    DOM.hudHighScore.textContent = STATE.highScore.toLocaleString();
  }

  function saveHighScore() {
    if (STATE.score > STATE.highScore) {
      STATE.highScore = STATE.score;
      try {
        localStorage.setItem(STORAGE_KEY_HIGHSCORE, STATE.highScore.toString());
      } catch (e) {}
      DOM.hudHighScore.textContent = STATE.highScore.toLocaleString();
    }
  }

  /* ==========================================================================
     GAME LIFECYCLE (START, PAUSE, RESUME, GAMEOVER)
     ========================================================================== */
  function startGame() {
    initAudio();

    STATE.status = 'PLAYING';
    STATE.score = 0;
    STATE.lives = CONFIG.initialLives;
    STATE.combo = 1;
    STATE.bestCombo = 1;
    STATE.balloonsPopped = 0;
    STATE.totalSpawned = 0;
    STATE.totalHits = 0;
    STATE.totalClicks = 0;
    STATE.freezeMultiplier = 1.0;

    clearAllBalloons();
    updateHud();

    // Hide overlays
    DOM.startOverlay.classList.remove('active');
    DOM.startOverlay.style.display = 'none';

    DOM.pauseOverlay.classList.remove('active');
    DOM.pauseOverlay.style.display = 'none';

    DOM.gameOverOverlay.classList.remove('active');
    DOM.gameOverOverlay.style.display = 'none';

    DOM.frostFreezeScreen.classList.remove('active');

    // Start Physics and Spawn Loops
    STATE.lastFrameTime = performance.now();
    requestAnimationFrame(gameLoop);
    scheduleNextSpawn();
  }

  function pauseGame() {
    if (STATE.status !== 'PLAYING') return;

    STATE.status = 'PAUSED';
    clearTimeout(STATE.spawnTimer);

    DOM.pauseOverlay.style.display = 'flex';
    requestAnimationFrame(() => DOM.pauseOverlay.classList.add('active'));
  }

  function resumeGame() {
    if (STATE.status !== 'PAUSED') return;

    STATE.status = 'PLAYING';
    DOM.pauseOverlay.classList.remove('active');
    setTimeout(() => {
      DOM.pauseOverlay.style.display = 'none';
    }, 200);

    STATE.lastFrameTime = performance.now();
    requestAnimationFrame(gameLoop);
    scheduleNextSpawn();
  }

  function triggerGameOver(reasonText) {
    STATE.status = 'GAMEOVER';
    clearTimeout(STATE.spawnTimer);
    clearAllBalloons();
    saveHighScore();
    playGameOverFanfare();

    const accuracy = STATE.totalClicks > 0
      ? Math.round((STATE.totalHits / STATE.totalClicks) * 100)
      : 0;

    document.getElementById('gameOverReason').textContent = reasonText || 'The sky was too wild today!';
    DOM.finalScoreVal.textContent = STATE.score.toLocaleString();
    DOM.finalBalloonsPopped.textContent = STATE.balloonsPopped;
    DOM.finalBestCombo.textContent = `${STATE.bestCombo}x`;
    DOM.finalAccuracy.textContent = `${accuracy}%`;
    DOM.finalHighScoreVal.textContent = STATE.highScore.toLocaleString();

    DOM.gameOverOverlay.style.display = 'flex';
    requestAnimationFrame(() => DOM.gameOverOverlay.classList.add('active'));
  }

  /* ==========================================================================
     BALLOON SPAWNING & PHYSICS LOOP (60FPS)
     ========================================================================== */
  function scheduleNextSpawn() {
    if (STATE.status !== 'PLAYING') return;

    // Difficulty scaling: interval shortens as score rises gradually
    const progress = Math.min(1, STATE.score / 7500);
    const interval = Math.round(CONFIG.baseSpawnIntervalMs - (CONFIG.baseSpawnIntervalMs - CONFIG.minSpawnIntervalMs) * progress);

    STATE.spawnTimer = setTimeout(() => {
      spawnBalloon();
      scheduleNextSpawn();
    }, interval);
  }

  function spawnBalloon() {
    if (STATE.status !== 'PLAYING') return;

    // Determine type
    const rand = Math.random();
    let special = null;
    let palette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];

    if (rand < CONFIG.probBomb) {
      special = 'bomb';
    } else if (rand < CONFIG.probBomb + CONFIG.probGold) {
      special = 'gold';
    } else if (rand < CONFIG.probBomb + CONFIG.probGold + CONFIG.probIce) {
      special = 'ice';
    } else if (STATE.lives < CONFIG.maxLives && rand < CONFIG.probBomb + CONFIG.probGold + CONFIG.probIce + CONFIG.probHeart) {
      special = 'heart';
    }

    if (special !== 'bomb') {
      STATE.totalSpawned++;
    }

    const balloonId = `b_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    // Calculate Speed (Scales with score gradually)
    const speedProgress = Math.min(1, STATE.score / 7500);
    let speed = CONFIG.baseSpeedPercent + (CONFIG.maxSpeedPercent - CONFIG.baseSpeedPercent) * speedProgress;
    if (special === 'gold') speed *= 1.2; // Golden balloons are moderately faster

    // Horizontal placement
    const x = 14 + Math.random() * 72; // 14% to 86% width

    // Sway parameters (gentle, natural wind drift)
    const swayFreq = 1.0 + Math.random() * 1.2;
    const swayAmp = 2.5 + Math.random() * 3.5; // gentle percentage units

    // Create DOM Node
    const nodeEl = document.createElement('div');
    nodeEl.className = `balloon-node balloon-${special || palette.type}`;
    nodeEl.id = balloonId;
    nodeEl.setAttribute('data-id', balloonId);
    nodeEl.setAttribute('data-type', special || palette.type);
    nodeEl.setAttribute('data-special', special || 'none');
    nodeEl.innerHTML = getBalloonSVG(palette, special);
    nodeEl.style.left = `${x}%`;
    nodeEl.style.top = `110%`; // Starts just below bottom screen

    DOM.balloonPlayfield.appendChild(nodeEl);

    STATE.balloons.push({
      id: balloonId,
      type: special || palette.type,
      special: special,
      palette: palette,
      x: x,
      baseX: x,
      y: 110,
      speed: speed,
      swayFreq: swayFreq,
      swayAmp: swayAmp,
      time: Math.random() * 10,
      element: nodeEl
    });
  }

  function gameLoop(timestamp) {
    if (STATE.status !== 'PLAYING') return;

    const delta = Math.min(0.1, (timestamp - STATE.lastFrameTime) / 1000); // capped delta in seconds
    STATE.lastFrameTime = timestamp;

    const activeList = [];

    for (let i = 0; i < STATE.balloons.length; i++) {
      const b = STATE.balloons[i];

      // Update vertical position (affected by Ice Freeze)
      const currentSpeed = b.speed * STATE.freezeMultiplier;
      b.y -= currentSpeed * delta;
      b.time += delta;

      // Update horizontal sinusoidal sway
      b.x = b.baseX + Math.sin(b.time * b.swayFreq) * b.swayAmp;

      // Render position
      b.element.style.top = `${b.y}%`;
      b.element.style.left = `${b.x}%`;

      // Check if escaped off top of screen
      if (b.y < -15) {
        // Balloon has flown away!
        b.element.remove();

        if (b.special !== 'bomb') {
          // Regular balloon escaped -> reset combo streak
          resetCombo();
        }
      } else {
        activeList.push(b);
      }
    }

    STATE.balloons = activeList;
    requestAnimationFrame(gameLoop);
  }

  function clearAllBalloons() {
    STATE.balloons.forEach((b) => {
      if (b.element && b.element.parentNode) {
        b.element.remove();
      }
    });
    STATE.balloons = [];
  }

  /* ==========================================================================
     POP DETECTION & EFFECTS
     ========================================================================== */
  function handlePlayfieldPointer(e) {
    if (STATE.status !== 'PLAYING') return;

    STATE.totalClicks++;

    const balloonEl = e.target.closest('.balloon-node');
    if (!balloonEl || balloonEl.classList.contains('popped')) {
      return;
    }

    const balloonId = balloonEl.getAttribute('data-id');
    const index = STATE.balloons.findIndex((b) => b.id === balloonId);
    if (index === -1) return;

    const balloon = STATE.balloons[index];
    STATE.totalHits++;

    // Mark as popped and animate
    balloonEl.classList.add('popped');
    STATE.balloons.splice(index, 1);

    // Get stage-relative pop coordinates
    const rect = balloonEl.getBoundingClientRect();
    const stageRect = DOM.skyStage.getBoundingClientRect();
    const popX = rect.left + rect.width / 2 - stageRect.left;
    const popY = rect.top + rect.height / 2 - stageRect.top;

    if (balloon.special === 'bomb') {
      // 💣 HIT BOMB HAZARD!
      handleBombHit(popX, popY);
    } else {
      // 🎈 POPPED REGULAR OR BONUS BALLOON!
      handleBalloonPop(balloon, popX, popY);
    }

    setTimeout(() => {
      if (balloonEl.parentNode) balloonEl.remove();
    }, 180);
  }

  function handleBalloonPop(balloon, x, y) {
    STATE.balloonsPopped++;
    incrementCombo();

    let earnedPoints = 0;
    const mult = getComboMultiplier();

    if (balloon.special === 'gold') {
      earnedPoints = Math.round(CONFIG.baseScoreGold * mult);
      playGoldChime();
      spawnConfetti(x, y, '#facc15', 16);
      spawnScoreSplash(`+${earnedPoints}`, x, y, 'gold');
    } else if (balloon.special === 'ice') {
      earnedPoints = Math.round(CONFIG.baseScoreRegular * mult);
      triggerFreezeBreeze();
      playFreezeSound();
      spawnConfetti(x, y, '#7dd3fc', 16);
      spawnScoreSplash('❄️ FREEZE!', x, y, 'freeze');
    } else if (balloon.special === 'heart') {
      earnedPoints = Math.round(CONFIG.baseScoreRegular * mult);
      if (STATE.lives < CONFIG.maxLives) {
        STATE.lives++;
      }
      playHeartChime();
      spawnConfetti(x, y, '#f43f5e', 14);
      spawnScoreSplash('❤️ +1 LIFE!', x, y, 'gold');
    } else {
      // Standard colorful pop
      earnedPoints = Math.round(CONFIG.baseScoreRegular * mult);
      playPopSound(1.0 + Math.random() * 0.3);
      spawnConfetti(x, y, balloon.palette.base, 12);
      spawnScoreSplash(`+${earnedPoints}`, x, y, 'regular');
    }

    STATE.score += earnedPoints;
    updateHud();
    saveHighScore();
  }

  function handleBombHit(x, y) {
    STATE.lives--;
    resetCombo();
    playBombExplosion();

    triggerScreenFlash();
    spawnConfetti(x, y, '#ef4444', 24);
    spawnScoreSplash('BOOM! -1 ❤️', x, y, 'ouch');

    updateHud();

    if (STATE.lives <= 0) {
      setTimeout(() => {
        triggerGameOver('Those spiky bomb balloons brought you back down to earth!');
      }, 450);
    }
  }

  function triggerFreezeBreeze() {
    STATE.freezeMultiplier = 0.4;
    DOM.frostFreezeScreen.classList.add('active');

    clearTimeout(STATE.freezeTimeout);
    STATE.freezeTimeout = setTimeout(() => {
      STATE.freezeMultiplier = 1.0;
      DOM.frostFreezeScreen.classList.remove('active');
    }, 3500);
  }

  /* ==========================================================================
     COMBO ENGINE
     ========================================================================== */
  function incrementCombo() {
    STATE.combo++;
    if (STATE.combo > STATE.bestCombo) {
      STATE.bestCombo = STATE.combo;
    }
  }

  function resetCombo() {
    STATE.combo = 1;
    updateComboBadge();
  }

  function getComboMultiplier() {
    if (STATE.combo >= 15) return 3.0;
    if (STATE.combo >= 10) return 2.0;
    if (STATE.combo >= 5) return 1.5;
    return 1.0;
  }

  function updateComboBadge() {
    const mult = getComboMultiplier();
    if (mult > 1.0) {
      DOM.hudComboBadge.textContent = `${mult}x 🔥`;
      DOM.hudComboBadge.style.display = 'inline-block';
    } else {
      DOM.hudComboBadge.style.display = 'none';
    }
  }

  /* ==========================================================================
     HUD & VISUAL EFFECTS
     ========================================================================== */
  function updateHud() {
    DOM.hudScore.textContent = STATE.score.toLocaleString();
    updateComboBadge();

    const hearts = DOM.hudHearts.children;
    for (let i = 0; i < CONFIG.maxLives; i++) {
      if (i < STATE.lives) {
        hearts[i].classList.add('active');
      } else {
        hearts[i].classList.remove('active');
      }
    }
  }

  function spawnScoreSplash(text, x, y, type = 'regular') {
    const bubble = document.createElement('div');
    bubble.className = `score-bubble ${type}`;
    bubble.textContent = text;
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    DOM.particleOverlay.appendChild(bubble);
    setTimeout(() => bubble.remove(), 800);
  }

  function spawnConfetti(x, y, color, count = 12) {
    for (let i = 0; i < count; i++) {
      const bit = document.createElement('div');
      bit.className = 'confetti-bit';
      bit.style.backgroundColor = color;
      bit.style.left = `${x}px`;
      bit.style.top = `${y}px`;

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const distance = 40 + Math.random() * 60;
      const tx = `${Math.cos(angle) * distance}px`;
      const ty = `${Math.sin(angle) * distance}px`;

      bit.style.setProperty('--tx', tx);
      bit.style.setProperty('--ty', ty);

      DOM.particleOverlay.appendChild(bit);
      setTimeout(() => bit.remove(), 700);
    }
  }

  function triggerScreenFlash() {
    DOM.shockFlashScreen.classList.add('flash');
    setTimeout(() => {
      DOM.shockFlashScreen.classList.remove('flash');
    }, 200);
  }

  /* ==========================================================================
     AUDIO MUTE TOGGLE
     ========================================================================== */
  function toggleAudio() {
    STATE.isMuted = !STATE.isMuted;
    DOM.audioIcon.textContent = STATE.isMuted ? '🔇' : '🔊';
    if (!STATE.isMuted) {
      initAudio();
    }
  }

  /* ==========================================================================
     EVENT LISTENERS & BINDINGS
     ========================================================================== */
  function bindEvents() {
    DOM.btnStartGame.addEventListener('click', startGame);
    DOM.btnPlayAgain.addEventListener('click', startGame);
    DOM.btnPauseGame.addEventListener('click', pauseGame);
    DOM.btnResumeGame.addEventListener('click', resumeGame);
    DOM.btnRestartFromPause.addEventListener('click', startGame);

    DOM.btnToggleAudio.addEventListener('click', toggleAudio);

    // Balloon Popping Clicks and Touch Taps
    DOM.balloonPlayfield.addEventListener('pointerdown', handlePlayfieldPointer);

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (STATE.status === 'PLAYING') pauseGame();
        else if (STATE.status === 'PAUSED') resumeGame();
        else if (STATE.status === 'IDLE' || STATE.status === 'GAMEOVER') startGame();
      } else if (e.key.toLowerCase() === 'r') {
        if (STATE.status === 'PLAYING' || STATE.status === 'PAUSED' || STATE.status === 'GAMEOVER') {
          startGame();
        }
      }
    });

    // Auto-pause when switching tabs
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && STATE.status === 'PLAYING') {
        pauseGame();
      }
    });
  }

  /* ==========================================================================
     INITIALIZATION
     ========================================================================== */
  function init() {
    loadHighScore();
    bindEvents();
    updateHud();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
