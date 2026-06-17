/* ================================================================
   SWEET SIXTEEN BIRTHDAY LETTER — script.js
   ----------------------------------------------------------------
   Everything you need to personalize is in the CONFIG object below.
   You should not need to touch the rest of this file just to:
     - change the main letter text
     - add the 10 friends (name / photo / music / message)
     - change the final letter text
     - change the timeline
     - point to your own photos & music files

   FOLDER STRUCTURE EXPECTED (relative to index.html):
     assets/images/derly.jpg
     assets/images/final-photo.jpg
     assets/images/friends/friend1.jpg ... friend10.jpg
     assets/images/memory/memory1.jpg ... memory12.jpg
     assets/music/main-theme.mp3
     assets/music/final-letter.mp3
     assets/music/friends/friend1.mp3 ... friend10.mp3

   Missing files are handled gracefully (a soft placeholder is shown
   instead of a broken image, and the music player simply shows a
   small note instead of breaking) so you can preview the site before
   every asset is in place.
   ================================================================ */

const CONFIG = {

  person: {
    name: 'Lakeisha Derly Surayuda',
    born: '12 July 2010',
    birthday: '12 July 2026',
  },

  photos: {
    main: 'assets/images/derly.jpg',
    final: 'assets/images/final-photo.jpg',
    memoryCount: 12, // expects memory1.jpg ... memory{N}.jpg
    memoryFolder: 'assets/images/memory/',
  },

  music: {
    main: 'assets/music/main-theme.mp3',
    final: 'assets/music/final-letter.mp3',
  },

  // The main letter, revealed with a typewriter effect right after
  // the envelope is opened. Edit freely — line breaks become
  // paragraph breaks automatically.
  letters: {
    main: `On the day you turned sixteen, I wanted you to have something that felt like more than just a message — a little world made just for you.

Sixteen years ago, you arrived and quietly made everyone around you a little softer, a little happier. Since then you've grown into someone warm, funny, a little bit chaotic in the best way, and endlessly kind to the people lucky enough to know you.

This page is a small keepsake of that — a letter, some secrets from the people who love you, and one more thing waiting at the very end. Take your time. Open each envelope slowly.

You deserve every bit of this day, and every birthday after it.

With all my love, today and always.`,

    final: `If you've made it this far, that means you opened every secret and read every wish — and now it's just the two of us.

Watching you grow into sixteen has been one of my favourite things. I've seen you laugh until you cried, cry until you laughed again, chase ridiculous ideas, and somehow make every room you walk into feel a little warmer.

Sixteen is the beginning of a chapter where you get to decide more and more of who you become — and I already know it's going to be someone wonderful, because you already are.

So happy sweet sixteen, Derly. May this year give you everything your sixteen-year-old heart is hoping for, and a few things you didn't even know to wish for.

I'm so endlessly proud of you. Always in your corner.`,
  },

  // Exactly 10 friends. Replace photo / music / message for each.
  // togetherPhoto is optional — leave as null if you don't have one.
  friends: [
    { name: 'Friend Name 1',  photo: 'assets/images/friends/friend1.jpg',  togetherPhoto: null, music: 'assets/music/friends/friend1.mp3',  message: 'Happy sweet sixteen! I still can\'t believe how long we\'ve been friends — here\'s to many more years of inside jokes and late-night calls. I love you so much, Derly.' },
    { name: 'Friend Name 2',  photo: 'assets/images/friends/friend2.jpg',  togetherPhoto: null, music: 'assets/music/friends/friend2.mp3',  message: 'You have no idea how much brighter everything is with you around. Happy birthday to the kindest person I know — sixteen looks amazing on you already.' },
    { name: 'Friend Name 3',  photo: 'assets/images/friends/friend3.jpg',  togetherPhoto: null, music: 'assets/music/friends/friend3.mp3',  message: 'Happy birthday! Thank you for always being the friend who shows up, who listens, and who somehow always knows what to say. Sixteen is so lucky to have you.' },
    { name: 'Friend Name 4',  photo: 'assets/images/friends/friend4.jpg',  togetherPhoto: null, music: 'assets/music/friends/friend4.mp3',  message: 'Every memory with you is one of my favourites. Happy sweet sixteen — may this year be as wonderful and funny and warm as you are.' },
    { name: 'Friend Name 5',  photo: 'assets/images/friends/friend5.jpg',  togetherPhoto: null, music: 'assets/music/friends/friend5.mp3',  message: 'Happy birthday to my favourite person to overthink everything with. Sixteen years of you being amazing — let\'s make this year even better.' },
    { name: 'Friend Name 6',  photo: 'assets/images/friends/friend6.jpg',  togetherPhoto: null, music: 'assets/music/friends/friend6.mp3',  message: 'I hope today reminds you of how loved you are, because you really, really are. Happy sweet sixteen, Derly — you deserve the whole world.' },
    { name: 'Friend Name 7',  photo: 'assets/images/friends/friend7.jpg',  togetherPhoto: null, music: 'assets/music/friends/friend7.mp3',  message: 'Sixteen suits you so well already. Thank you for every laugh, every secret kept, and every memory made — happy birthday to one of the best people I know.' },
    { name: 'Friend Name 8',  photo: 'assets/images/friends/friend8.jpg',  togetherPhoto: null, music: 'assets/music/friends/friend8.mp3',  message: 'Happy birthday! You make even the most ordinary days feel a little special. Here\'s to sixteen and everything wonderful it\'s about to bring you.' },
    { name: 'Friend Name 9',  photo: 'assets/images/friends/friend9.jpg',  togetherPhoto: null, music: 'assets/music/friends/friend9.mp3',  message: 'I\'m so grateful this year gave me you. Happy sweet sixteen — may you laugh as much as you make the rest of us laugh.' },
    { name: 'Friend Name 10', photo: 'assets/images/friends/friend10.jpg', togetherPhoto: null, music: 'assets/music/friends/friend10.mp3', message: 'Happy birthday to someone who feels like home. Sixteen years of you in this world has made it so much better — I can\'t wait to see what this year brings you.' },
  ],

  timeline: [
    { year: '2010', text: 'Born and brought happiness to the world.' },
    { year: '2013', text: 'Learning and growing every day.' },
    { year: '2016', text: 'A cheerful little adventurer.' },
    { year: '2020', text: 'Creating memories and friendships.' },
    { year: '2023', text: 'Growing stronger and wiser.' },
    { year: '2026', text: 'Sweet Sixteen.' },
  ],
};

/* ================================================================
   STATE
   ================================================================ */
const state = {
  hasOpenedLetter: false,
  openedFriends: loadOpenedFriends(),
  currentAudioKey: null,    // 'main' | 'friend' | 'final' | null
  isMuted: false,
  volume: 0.6,
  activeFriendIndex: null,
};

/* ================================================================
   DOM REFS
   ================================================================ */
const $ = (sel, root = document) => root.querySelector(sel);
const $all = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const loadingScreen   = $('#loading-screen');
const loadingBarFill  = $('#loading-bar-fill');
const siteEl          = $('#site');
const particleLayer   = $('#particle-layer');

const heroEnvelopeBtn = $('#open-letter-btn');
const heroCtaBtn      = $('#open-letter-cta');

const friendsGrid     = $('#friends-grid');
const progressCountEl = $('#progress-count');
const progressBarFill = $('#progress-bar-fill');

const finalTeaser     = $('#final-teaser');
const finalEnvelopeBtn = $('#final-envelope-btn');

const memoryGrid      = $('#memory-grid');
const timelineTrack   = $('#timeline-track');

const friendModal        = $('#friend-modal');
const friendModalBackdrop= $('#friend-modal-backdrop');
const friendModalClose   = $('#friend-modal-close');
const modalEnvelope      = $('#modal-envelope');
const modalContent       = $('#modal-content');
const modalFriendPhoto   = $('#modal-friend-photo');
const modalTogetherWrap  = $('#modal-together-wrap');
const modalTogetherPhoto = $('#modal-together-photo');
const modalFriendName    = $('#modal-friend-name');
const modalFriendText    = $('#modal-friend-text');

const finalModal         = $('#final-modal');
const finalModalBackdrop = $('#final-modal-backdrop');
const finalModalClose    = $('#final-modal-close');
const finalPhotoEl       = $('#final-photo');
const finalLetterTextEl  = $('#final-letter-text');

const audioMain   = $('#audio-main');
const audioFriend = $('#audio-friend');
const audioFinal  = $('#audio-final');

const musicPlayer     = $('#music-player');
const musicToggleBtn  = $('#music-toggle');
const musicPlayPause  = $('#music-play-pause');
const musicMuteBtn    = $('#music-mute');
const musicVolume     = $('#music-volume');
const musicTrackName  = $('#music-track-name');

const mainLetterTextEl = $('#main-letter-text');

/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', init);

function init() {
  applyConfigText();
  renderFriendCards();
  renderMemoryWall();
  renderTimeline();
  restoreProgressUI();
  setupRevealObserver();
  setupAmbientParticles();
  setupMusicPlayerUI();
  setupEventListeners();
  runLoadingSequence();
}

/* Push CONFIG copy into the DOM (single source of truth) */
function applyConfigText() {
  mainLetterTextEl.dataset.fullText = CONFIG.letters.main;
  finalLetterTextEl.dataset.fullText = CONFIG.letters.final;
  finalPhotoEl.src = CONFIG.photos.final;
  attachImageFallback(finalPhotoEl, 'final-photo.jpg');

  const derlyPhoto = $('#derly-photo');
  derlyPhoto.src = CONFIG.photos.main;
  attachImageFallback(derlyPhoto, 'derly.jpg');
}

/* ================================================================
   LOADING SCREEN
   ================================================================ */
function runLoadingSequence() {
  let progress = 0;
  const duration = 2200; // ms
  const start = performance.now();

  function tick(now) {
    progress = Math.min(1, (now - start) / duration);
    loadingBarFill.style.width = `${progress * 100}%`;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      finishLoading();
    }
  }
  requestAnimationFrame(tick);
}

function finishLoading() {
  loadingScreen.classList.add('is-hidden');
  siteEl.removeAttribute('aria-hidden');
  siteEl.classList.add('is-visible');
  setTimeout(() => loadingScreen.remove(), 1000);
}

/* ================================================================
   SCROLL REVEAL
   ================================================================ */
function setupRevealObserver() {
  const targets = $all(
    '.photo-reveal, .birthday-title, .main-letter, ' +
    '.friends-section .section-eyebrow, .friends-section .section-title, .progress-tracker, .friend-card, ' +
    '.memory-wall .section-eyebrow, .memory-wall .section-title, .memory-tile, ' +
    '.timeline-section .section-eyebrow, .timeline-section .section-title, .timeline-item, ' +
    '.footer__text'
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 6) * 70}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');

        // Kick off the main-letter typewriter the first time it appears
        if (entry.target === $('.main-letter')) {
          startTypewriterOnce(mainLetterTextEl);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  targets.forEach((el) => observer.observe(el));
}

/* ================================================================
   AMBIENT PARTICLE BACKGROUND (sparkles, flowers, hearts, balloons)
   ================================================================ */
const AMBIENT_SYMBOLS = [
  { char: '✦', cls: 'particle--sparkle' },
  { char: '✧', cls: 'particle--sparkle' },
  { char: '🌸', cls: 'particle--flower' },
  { char: '🌷', cls: 'particle--flower' },
  { char: '💕', cls: 'particle--heart' },
  { char: '🎈', cls: 'particle--balloon' },
];

function setupAmbientParticles() {
  setInterval(spawnAmbientParticle, 900);
}

function spawnAmbientParticle() {
  if (document.hidden) return;
  const pick = AMBIENT_SYMBOLS[Math.floor(Math.random() * AMBIENT_SYMBOLS.length)];
  const el = document.createElement('span');
  el.className = `particle ${pick.cls}`;
  el.textContent = pick.char;
  el.style.left = `${Math.random() * 100}%`;
  el.style.setProperty('--drift', `${(Math.random() - 0.5) * 120}px`);
  const duration = 9 + Math.random() * 6;
  el.style.animationDuration = `${duration}s`;
  particleLayer.appendChild(el);
  setTimeout(() => el.remove(), duration * 1000 + 200);
}

/* One-shot celebratory burst (confetti / hearts / flowers / balloons) */
function spawnBurst(originX, originY, { count = 26, symbols = ['🎉', '🎊', '✨', '💖', '🌸', '🎈'] } = {}) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'burst';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 220;
    const bx = Math.cos(angle) * distance;
    const by = Math.sin(angle) * distance - 60; // bias upward
    el.style.left = `${originX}px`;
    el.style.top = `${originY}px`;
    el.style.fontSize = `${14 + Math.random() * 14}px`;
    el.style.setProperty('--bx', `${bx}px`);
    el.style.setProperty('--by', `${by}px`);
    el.style.setProperty('--br', `${(Math.random() - 0.5) * 480}deg`);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }
}

function burstFromElement(el, opts) {
  const rect = el.getBoundingClientRect();
  spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, opts);
}

/* ================================================================
   TYPEWRITER EFFECT (click any letter to skip to the full text)
   ================================================================ */
function startTypewriterOnce(el) {
  if (el.dataset.typed === 'true' || el.dataset.typing === 'true') return;
  typewrite(el, el.dataset.fullText || '');
}

function typewrite(el, fullText, speed = 16) {
  el.dataset.typing = 'true';
  el.textContent = '';

  const paragraphs = fullText.split(/\n\s*\n/);
  el.innerHTML = paragraphs.map(() => '<p></p>').join('');
  const pEls = $all('p', el);

  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';

  let pIndex = 0;
  let cIndex = 0;
  let cancelled = false;

  function finishInstantly() {
    cancelled = true;
    pEls.forEach((p, i) => { p.textContent = paragraphs[i]; });
    cursor.remove();
    el.dataset.typing = 'false';
    el.dataset.typed = 'true';
  }

  el.addEventListener('click', finishInstantly, { once: true });

  function step() {
    if (cancelled) return;
    const currentParagraph = paragraphs[pIndex] || '';

    if (cIndex <= currentParagraph.length) {
      pEls[pIndex].textContent = currentParagraph.slice(0, cIndex);
      pEls[pIndex].appendChild(cursor);
      cIndex++;
      setTimeout(step, speed);
    } else if (pIndex < paragraphs.length - 1) {
      pIndex++;
      cIndex = 0;
      setTimeout(step, speed * 4);
    } else {
      cursor.remove();
      el.dataset.typing = 'false';
      el.dataset.typed = 'true';
    }
  }
  step();
}

/* ================================================================
   IMAGE FALLBACKS (graceful placeholder if an asset is missing)
   ================================================================ */
function attachImageFallback(imgEl, label) {
  imgEl.addEventListener('error', () => {
    const wrap = document.createElement('div');
    wrap.className = 'img-fallback';
    wrap.innerHTML = `<span class="icon">🖼️</span><span>Add photo:<br>${label}</span>`;
    imgEl.replaceWith(wrap);
  }, { once: true });
}

/* ================================================================
   HERO: OPEN LETTER EXPERIENCE
   ================================================================ */
function setupEventListeners() {
  heroEnvelopeBtn.addEventListener('click', handleOpenLetter);
  heroCtaBtn.addEventListener('click', handleOpenLetter);

  friendModalClose.addEventListener('click', closeFriendModal);
  friendModalBackdrop.addEventListener('click', closeFriendModal);

  finalEnvelopeBtn.addEventListener('click', openFinalLetter);
  finalModalClose.addEventListener('click', closeFinalModal);
  finalModalBackdrop.addEventListener('click', closeFinalModal);

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (friendModal.classList.contains('is-active')) closeFriendModal();
    if (finalModal.classList.contains('is-active')) closeFinalModal();
  });
}

function handleOpenLetter() {
  if (state.hasOpenedLetter) return;
  state.hasOpenedLetter = true;

  heroEnvelopeBtn.classList.add('is-open');
  heroCtaBtn.disabled = true;
  heroCtaBtn.textContent = 'Opening...';

  burstFromElement(heroEnvelopeBtn, { count: 34 });
  playMain();

  setTimeout(() => {
    $('#reveal-stage').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 650);
}

/* ================================================================
   FRIEND CARDS + PROGRESS
   ================================================================ */
function renderFriendCards() {
  CONFIG.friends.forEach((friend, index) => {
    const isOpen = state.openedFriends.has(index);
    const card = document.createElement('button');
    card.className = `friend-card${isOpen ? ' is-opened' : ''}`;
    card.dataset.index = String(index);
    card.innerHTML = `
      <span class="friend-card__icon">${isOpen ? '💙' : '🔒'}</span>
      <span class="friend-card__label">${isOpen ? friend.name : `Secret Letter #${index + 1}`}</span>
      <span class="friend-card__status">${isOpen ? 'Opened' : 'Locked'}</span>
    `;
    card.addEventListener('click', () => openFriendModal(index));
    friendsGrid.appendChild(card);
  });
}

function updateFriendCard(index) {
  const card = friendsGrid.querySelector(`[data-index="${index}"]`);
  if (!card) return;
  card.classList.add('is-opened');
  card.querySelector('.friend-card__icon').textContent = '💙';
  card.querySelector('.friend-card__label').textContent = CONFIG.friends[index].name;
  card.querySelector('.friend-card__status').textContent = 'Opened';
}

function restoreProgressUI() {
  const count = state.openedFriends.size;
  progressCountEl.textContent = String(count);
  progressBarFill.style.width = `${(count / CONFIG.friends.length) * 100}%`;
  if (count >= CONFIG.friends.length) {
    finalTeaser.hidden = false;
  }
}

function markFriendOpened(index) {
  if (state.openedFriends.has(index)) return;
  state.openedFriends.add(index);
  saveOpenedFriends(state.openedFriends);
  updateFriendCard(index);

  const count = state.openedFriends.size;
  progressCountEl.textContent = String(count);
  progressBarFill.style.width = `${(count / CONFIG.friends.length) * 100}%`;

  if (count === CONFIG.friends.length) {
    revealFinalTeaser();
  }
}

function revealFinalTeaser() {
  finalTeaser.hidden = false;
  setTimeout(() => {
    finalTeaser.scrollIntoView({ behavior: 'smooth', block: 'center' });
    burstFromElement(finalEnvelopeBtn, { count: 20, symbols: ['✨', '💙', '🤍'] });
  }, 900);
}

/* localStorage helpers (safe fallback if storage is unavailable) */
function loadOpenedFriends() {
  try {
    const raw = localStorage.getItem('derly16-opened-friends');
    return new Set(raw ? JSON.parse(raw) : []);
  } catch (e) {
    return new Set();
  }
}
function saveOpenedFriends(set) {
  try {
    localStorage.setItem('derly16-opened-friends', JSON.stringify(Array.from(set)));
  } catch (e) { /* storage unavailable — progress just won't persist */ }
}

/* ================================================================
   FRIEND LETTER MODAL — open / close cinematic sequence
   ================================================================ */
function openFriendModal(index) {
  state.activeFriendIndex = index;
  const friend = CONFIG.friends[index];

  // Reset modal to closed-envelope state
  modalEnvelope.classList.remove('is-open');
  modalEnvelope.hidden = false;
  modalContent.hidden = true;
  modalFriendText.dataset.typed = 'false';
  modalFriendText.dataset.typing = 'false';

  document.body.classList.add('modal-open');
  friendModal.classList.add('is-active');
  friendModal.setAttribute('aria-hidden', 'false');

  fadeOut(audioMain).then(() => playFriendAudio(friend));

  setTimeout(() => {
    modalEnvelope.classList.add('is-open');
    burstFromElement(modalEnvelope, { count: 16, symbols: ['✨', '💌', '💖'] });
  }, 500);

  setTimeout(() => {
    modalEnvelope.hidden = true;
    modalContent.hidden = false;

    modalFriendPhoto.src = friend.photo;
    modalFriendPhoto.alt = friend.name;
    attachImageFallback(modalFriendPhoto, friend.photo.split('/').pop());

    if (friend.togetherPhoto) {
      modalTogetherWrap.hidden = false;
      modalTogetherPhoto.src = friend.togetherPhoto;
      modalTogetherPhoto.alt = `${friend.name} and Derly`;
      attachImageFallback(modalTogetherPhoto, friend.togetherPhoto.split('/').pop());
    } else {
      modalTogetherWrap.hidden = true;
    }

    modalFriendName.textContent = friend.name;
    modalFriendText.dataset.fullText = friend.message;
    typewrite(modalFriendText, friend.message);

    markFriendOpened(index);
  }, 1300);
}

function closeFriendModal() {
  if (!friendModal.classList.contains('is-active')) return;
  friendModal.classList.remove('is-active');
  friendModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  fadeOut(audioFriend).then(() => {
    if (state.hasOpenedLetter) playMain();
  });
}

/* ================================================================
   FINAL LETTER MODAL
   ================================================================ */
function openFinalLetter() {
  document.body.classList.add('modal-open');
  finalModal.classList.add('is-active');
  finalModal.setAttribute('aria-hidden', 'false');

  finalLetterTextEl.dataset.typed = 'false';
  finalLetterTextEl.dataset.typing = 'false';

  Promise.all([fadeOut(audioMain), fadeOut(audioFriend)]).then(playFinalAudio);

  burstFromElement(finalEnvelopeBtn, { count: 30, symbols: ['💙', '🤍', '✨', '🎉'] });

  setTimeout(() => {
    typewrite(finalLetterTextEl, CONFIG.letters.final);
  }, 500);
}

function closeFinalModal() {
  finalModal.classList.remove('is-active');
  finalModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  fadeOut(audioFinal).then(() => {
    if (state.hasOpenedLetter) playMain();
  });
}

/* ================================================================
   MEMORY WALL
   ================================================================ */
function renderMemoryWall() {
  for (let i = 1; i <= CONFIG.photos.memoryCount; i++) {
    const tile = document.createElement('div');
    tile.className = 'memory-tile reveal';
    const img = document.createElement('img');
    img.src = `${CONFIG.photos.memoryFolder}memory${i}.jpg`;
    img.alt = `Memory ${i}`;
    img.loading = 'lazy';
    attachImageFallback(img, `memory${i}.jpg`);
    tile.appendChild(img);
    memoryGrid.appendChild(tile);
  }
}

/* ================================================================
   TIMELINE
   ================================================================ */
function renderTimeline() {
  CONFIG.timeline.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'timeline-item reveal';
    el.innerHTML = `
      <p class="timeline-item__year">${item.year}</p>
      <p class="timeline-item__text">${item.text}</p>
    `;
    timelineTrack.appendChild(el);
  });
}

/* ================================================================
   MUSIC SYSTEM
   Only one track plays at a time:
   main theme <-> friend track <-> final track
   ================================================================ */
function setVolumeImmediate(audioEl, vol) {
  audioEl.volume = Math.max(0, Math.min(1, vol));
}

function fadeIn(audioEl, target = state.volume, duration = 3000) {
  return new Promise((resolve) => {
    audioEl.volume = 0;
    audioEl.muted = state.isMuted;
    const playPromise = audioEl.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(() => { /* autoplay blocked or file missing — fail silently */ });
    }
    const steps = 24;
    const stepTime = duration / steps;
    let i = 0;
    const id = setInterval(() => {
      i++;
      audioEl.volume = Math.min(target, (target * i) / steps);
      if (i >= steps) { clearInterval(id); resolve(); }
    }, stepTime);
  });
}

function fadeOut(audioEl, duration = 900) {
  return new Promise((resolve) => {
    if (audioEl.paused || audioEl.volume === 0) { resolve(); return; }
    const startVol = audioEl.volume;
    const steps = 14;
    const stepTime = duration / steps;
    let i = 0;
    const id = setInterval(() => {
      i++;
      audioEl.volume = Math.max(0, startVol * (1 - i / steps));
      if (i >= steps) {
        clearInterval(id);
        audioEl.pause();
        resolve();
      }
    }, stepTime);
  });
}

function playMain() {
  if (audioMain.getAttribute('src') !== CONFIG.music.main) {
    audioMain.src = CONFIG.music.main;
  }
  audioMain.loop = true;
  state.currentAudioKey = 'main';
  musicTrackName.textContent = 'Main Theme';
  fadeIn(audioMain);
  bindAudioErrorNote(audioMain, CONFIG.music.main);
}

function playFriendAudio(friend) {
  audioFriend.src = friend.music;
  audioFriend.loop = false;
  state.currentAudioKey = 'friend';
  musicTrackName.textContent = `${friend.name}'s Song`;
  fadeIn(audioFriend);
  bindAudioErrorNote(audioFriend, friend.music);
}

function playFinalAudio() {
  audioFinal.src = CONFIG.music.final;
  audioFinal.loop = true;
  state.currentAudioKey = 'final';
  musicTrackName.textContent = 'Final Letter';
  fadeIn(audioFinal);
  bindAudioErrorNote(audioFinal, CONFIG.music.final);
}

function bindAudioErrorNote(audioEl, path) {
  audioEl.addEventListener('error', () => {
    musicTrackName.textContent = `Add music file: ${path.split('/').pop()}`;
  }, { once: true });
}

function getCurrentAudio() {
  if (state.currentAudioKey === 'main') return audioMain;
  if (state.currentAudioKey === 'friend') return audioFriend;
  if (state.currentAudioKey === 'final') return audioFinal;
  return null;
}

/* ---------------- Floating Music Player UI ---------------- */
function setupMusicPlayerUI() {
  musicVolume.value = String(state.volume);

  musicToggleBtn.addEventListener('click', () => {
    musicPlayer.classList.toggle('is-open');
  });

  musicPlayPause.addEventListener('click', () => {
    const audio = getCurrentAudio();
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      musicPlayPause.textContent = '⏸';
    } else {
      audio.pause();
      musicPlayPause.textContent = '▶';
    }
  });

  musicMuteBtn.addEventListener('click', () => {
    state.isMuted = !state.isMuted;
    [audioMain, audioFriend, audioFinal].forEach((a) => { a.muted = state.isMuted; });
    musicMuteBtn.textContent = state.isMuted ? '🔈' : '🔊';
  });

  musicVolume.addEventListener('input', (e) => {
    state.volume = parseFloat(e.target.value);
    const audio = getCurrentAudio();
    if (audio) setVolumeImmediate(audio, state.volume);
  });

  [audioMain, audioFriend, audioFinal].forEach((audio) => {
    audio.addEventListener('play', () => { musicPlayPause.textContent = '⏸'; });
    audio.addEventListener('pause', () => { musicPlayPause.textContent = '▶'; });
  });
}