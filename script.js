/* ===== Продукты ===== */
const PRODUCTS = [
  { id: 'cucumber',  name: 'Огурец',              category: 'vegetables', icon: 'cucumber.svg',  calories: 16,  be: 0, benefit: 'Увлажняет и низкокалорийный', fact: 'На 95% состоит из воды.' },
  { id: 'tomato',    name: 'Помидор',             category: 'vegetables', icon: 'tomato.svg',    calories: 18,  be: 0, benefit: 'Богат ликопином', fact: 'Помогает защищать клетки от стресса.' },
  { id: 'broccoli',  name: 'Брокколи',            category: 'vegetables', icon: 'broccoli.svg',  calories: 34,  be: 0, benefit: 'Источник витамина С и клетчатки', fact: 'Содержит витамин С больше апельсина.' },
  { id: 'cabbage',   name: 'Капуста',             category: 'vegetables', icon: 'cabbage.svg',   calories: 25,  be: 0, benefit: 'Поддерживает пищеварение', fact: 'Клетчатка помогает чувству сытости.' },
  { id: 'chicken',   name: 'Курица',              category: 'proteins',   icon: 'chicken.svg',   calories: 165, be: 0, benefit: 'Легкоусвояемый белок', fact: 'Отличный выбор для сытного обеда.' },
  { id: 'fish',      name: 'Рыба',                category: 'proteins',   icon: 'fish.svg',        calories: 120, be: 0, benefit: 'Полезные жиры для сердца', fact: 'Источник Омега-3.' },
  { id: 'egg',       name: 'Яйцо',                category: 'proteins',   icon: 'egg.svg',         calories: 78,  be: 0, benefit: 'Полный набор аминокислот', fact: 'Идеально для завтрака.' },
  { id: 'cottage',   name: 'Творог',              category: 'proteins',   icon: 'cottage.svg',     calories: 100, be: 0.5, benefit: 'Кальций и белок', fact: 'Подходит для лёгкого перекуса.' },
  { id: 'rice',      name: 'Рис',                 category: 'carbs',      icon: 'rice.svg',        calories: 130, be: 1, benefit: 'Быстрая энергия', fact: 'Легко сочетается с овощами и белком.' },
  { id: 'buckwheat', name: 'Гречка',              category: 'carbs',      icon: 'buckwheat.svg',   calories: 110, be: 1, benefit: 'Много железа и клетчатки', fact: 'Считается одной из самых полезных круп.' },
  { id: 'oatmeal',   name: 'Овсянка',             category: 'carbs',      icon: 'oatmeal.svg',     calories: 88,  be: 1, benefit: 'Долгое чувство сытости', fact: 'Классический продукт для завтрака.' },
  { id: 'bread',     name: 'Цельнозерновой хлеб', category: 'carbs',      icon: 'bread.svg',       calories: 80,  be: 1, benefit: 'Сложные углеводы', fact: 'Цельнозерновой хлеб богаче клетчаткой.' },
];

const CATEGORY_LABELS = { vegetables: 'Овощи', proteins: 'Белки', carbs: 'Углеводы' };

const LEVELS = [
  {
    id: 1, name: 'Классическая здоровая тарелка',
    task: 'Собери тарелку: 50% овощей, 25% белков, 25% углеводов',
    hint: 'Половина тарелки — овощи, четверть — белки, четверть — углеводы.',
    target: { vegetables: 50, proteins: 25, carbs: 25 },
    time: 60, minItems: 3, targetScore: 60, bonus: 1,
  },
  {
    id: 2, name: 'Полезный завтрак',
    task: 'Собери лёгкий завтрак с овсянкой или яйцом',
    hint: 'Для завтрака добавь овсянку, яйцо и свежие овощи.',
    target: { vegetables: 40, proteins: 25, carbs: 35 },
    time: 55, minItems: 3, targetScore: 65, bonus: 1.15,
    requireIds: ['oatmeal', 'egg', 'bread'],
    requireAny: true,
  },
  {
    id: 3, name: 'Обед для похудения',
    task: 'Лёгкий обед: больше овощей, меньше калорий',
    hint: 'Выбирай овощи и нежирный белок — курицу, рыбу или творог.',
    target: { vegetables: 55, proteins: 30, carbs: 15 },
    time: 50, minItems: 4, targetScore: 70, bonus: 1.25,
    maxCalories: 400,
  },
  {
    id: 4, name: 'Средиземноморская тарелка',
    task: 'Добавь рыбу и много овощей',
    hint: 'Средиземноморский стиль — рыба, овощи и умеренные углеводы.',
    target: { vegetables: 45, proteins: 30, carbs: 25 },
    time: 45, minItems: 4, targetScore: 75, bonus: 1.35,
    requireIds: ['fish'],
  },
  {
    id: 5, name: 'Тарелка долгожителя',
    task: 'Идеальный баланс всех групп продуктов',
    hint: 'Используй продукты из каждой категории — разнообразие продлевает здоровье.',
    target: { vegetables: 50, proteins: 25, carbs: 25 },
    time: 40, minItems: 5, targetScore: 85, bonus: 1.5,
    requireAllCategories: true,
  },
];

const ACHIEVEMENTS = [
  { id: 'firstPlate', icon: '🥗', title: 'Первая тарелка', desc: 'Собрать первую правильную тарелку', type: 'firstSuccess' },
  { id: 'vegLover', icon: '🥦', title: 'Любитель овощей', desc: 'Собрать 10 овощных тарелок', type: 'vegPlates', value: 10 },
  { id: 'fishExpert', icon: '🐟', title: 'Рыбный эксперт', desc: 'Успешно использовать рыбу 5 раз', type: 'fishSuccess', value: 5 },
  { id: 'fastStart', icon: '⚡', title: 'Быстрый старт', desc: 'Пройти уровень быстрее чем за 20 секунд', type: 'fastLevel', value: 20 },
  { id: 'master', icon: '🏆', title: 'Мастер здоровой тарелки', desc: 'Пройти все уровни', type: 'allLevels' },
];

const DAILY_GOALS_POOL = [
  { id: 'veg3', text: 'Собери тарелку с 3 овощами' },
  { id: 'fish', text: 'Используй рыбу' },
  { id: 'flawless', text: 'Пройди уровень без ошибок' },
  { id: 'score100', text: 'Получи 100 очков' },
];

const DAILY_GOAL_BONUS = 50;

const DAILY_QUOTES = [
  'Каждая полезная тарелка — шаг к здоровью.',
  'Сегодня ты делаешь выбор в пользу энергии.',
  'Маленькие привычки создают большие результаты.',
  'Здоровое питание — это забота о себе каждый день.',
  'Твоя тарелка — твой лучший союзник.',
  'Баланс на тарелке — баланс в жизни.',
];

const STORAGE_KEY = 'nariella-game-save';

const state = {
  plate: [],
  score: 0,
  level: 1,
  timeLeft: 60,
  timerId: null,
  isPlaying: false,
  activeCategory: 'all',
  checked: false,
  soundEnabled: true,
  achievements: [],
  achievementDates: {},
  discoveredProducts: [],
  dailyGoal: { date: '', goalId: '', completed: false },
  levelRoundFailures: 0,
  stats: {
    totalChecks: 0,
    successfulChecks: 0,
    successStreak: 0,
    bestTimeLeft: 0,
    bestElapsed: null,
    highScore: 0,
    levelsCompleted: [],
    vegPlates: 0,
    fishSuccessCount: 0,
    successRate: 0,
  },
  roundStartTime: 0,
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
  timer: $('#timer'),
  score: $('#score'),
  level: $('#level'),
  levelName: $('#level-name'),
  levelProgressLabel: $('#level-progress-label'),
  levelProgressPct: $('#level-progress-pct'),
  levelProgressFill: $('#level-progress-fill'),
  dailyGoalText: $('#daily-goal-text'),
  dailyGoalStatus: $('#daily-goal-status'),
  dailyGoalCard: $('#daily-goal'),
  plate: $('#plate'),
  plateItems: $('#plate-items'),
  plateHint: $('#plate-hint'),
  plateGuide: $('#plate-guide'),
  checkBtn: $('#check-btn'),
  productsGrid: $('#products-grid'),
  nariellaMessage: $('#nariella-message'),
  resultPanel: $('#result-panel'),
  resultGrade: $('#result-grade'),
  resultCalories: $('#result-calories'),
  resultBe: $('#result-be'),
  resultVeg: $('#result-veg'),
  resultProtein: $('#result-protein'),
  resultCarbs: $('#result-carbs'),
  modal: $('#modal'),
  modalIcon: $('#modal-icon'),
  modalTitle: $('#modal-title'),
  modalText: $('#modal-text'),
  modalScore: $('#modal-score'),
  modalBtn: $('#modal-btn'),
  startScreen: $('#start-screen'),
  startBtn: $('#start-btn'),
  startDailyQuote: $('#start-daily-quote'),
  dailyQuote: $('#daily-quote'),
  scoreFloat: $('#score-float'),
  toastContainer: $('#toast-container'),
  achievementModal: $('#achievement-modal'),
  achievementsGrid: $('#achievements-grid'),
  achievementsBtn: $('#achievements-btn'),
  achievementsClose: $('#achievements-close'),
  achievementsCount: $('#achievements-count'),
  achievementsProgress: $('#achievements-progress'),
  achievementsPanelFill: $('#achievements-panel-fill'),
  victoryScreen: $('#victory-screen'),
  confettiCanvas: $('#confetti-canvas'),
  victoryScore: $('#victory-score'),
  victoryLevel: $('#victory-level'),
  victoryPlates: $('#victory-plates'),
  victoryAchievements: $('#victory-achievements'),
  victoryTime: $('#victory-time'),
  victoryReplay: $('#victory-replay'),
  victoryAchievementsBtn: $('#victory-achievements'),
  victoryEncyclopedia: $('#victory-encyclopedia'),
  encyclopediaModal: $('#encyclopedia-modal'),
  encyclopediaList: $('#encyclopedia-list'),
  encyclopediaBtn: $('#encyclopedia-btn'),
  encyclopediaClose: $('#encyclopedia-close'),
  soundBtn: $('#sound-btn'),
  scoreStat: $('#score-stat'),
};

let audioCtx = null;
let dragGhost = null;
let dragProduct = null;
let confettiAnimId = null;

/* ===== Звук (Web Audio API) ===== */
function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playSound(type) {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const t = ctx.currentTime;
    const presets = {
      points:    { f: [523, 659, 784], d: 0.12, type: 'sine', vol: 0.08 },
      success:   { f: [392, 523, 659, 784], d: 0.1, type: 'triangle', vol: 0.1 },
      achievement: { f: [523, 659, 784, 1047], d: 0.15, type: 'sine', vol: 0.12 },
      error:     { f: [200, 180], d: 0.15, type: 'sawtooth', vol: 0.06 },
    };
    const p = presets[type] || presets.points;
    p.f.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = p.type;
      o.frequency.value = freq;
      o.connect(g);
      g.connect(ctx.destination);
      const start = t + i * p.d;
      g.gain.setValueAtTime(0, start);
      g.gain.linearRampToValueAtTime(p.vol, start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, start + p.d * 2);
      o.start(start);
      o.stop(start + p.d * 2);
    });
    osc.disconnect();
    gain.disconnect();
  } catch (_) { /* ignore */ }
}

function updateSoundBtn() {
  dom.soundBtn.textContent = state.soundEnabled ? '🔊' : '🔇';
  dom.soundBtn.title = state.soundEnabled ? 'Звук ВКЛ' : 'Звук ВЫКЛ';
  dom.soundBtn.classList.toggle('btn-action--muted', !state.soundEnabled);
}

/* ===== Сохранение ===== */
function saveProgress() {
  try {
    if (state.score > state.stats.highScore) state.stats.highScore = state.score;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      score: state.score,
      level: state.level,
      achievements: state.achievements,
      achievementDates: state.achievementDates,
      discoveredProducts: state.discoveredProducts,
      soundEnabled: state.soundEnabled,
      dailyGoal: state.dailyGoal,
      stats: state.stats,
    }));
    updateAchievementsCount();
  } catch (_) { /* ignore */ }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    state.score = data.score || 0;
    state.level = Math.min(Math.max(data.level || 1, 1), LEVELS.length);
    state.achievements = data.achievements || [];
    state.achievementDates = data.achievementDates || {};
    state.discoveredProducts = data.discoveredProducts || [];
    if (data.dailyGoal) state.dailyGoal = data.dailyGoal;
    if (typeof data.soundEnabled === 'boolean') state.soundEnabled = data.soundEnabled;
    if (data.stats) {
      state.stats = { ...state.stats, ...data.stats };
    }
  } catch (_) { /* ignore */ }
}

/* ===== Инициализация ===== */
function init() {
  loadProgress();
  updateSoundBtn();
  setDailyQuote();
  initDailyGoal();
  updateLevelUI();
  renderProducts();
  bindEvents();
  updateUI();
  updateAchievementsCount();
  updateDailyGoalUI();
}

function bindEvents() {
  dom.startBtn.addEventListener('click', startGame);
  dom.checkBtn.addEventListener('click', checkPlate);
  dom.modalBtn.addEventListener('click', () => dom.modal.classList.add('hidden'));
  dom.achievementsBtn.addEventListener('click', openAchievementsPanel);
  dom.achievementsClose.addEventListener('click', () => dom.achievementModal.classList.add('hidden'));
  dom.encyclopediaBtn.addEventListener('click', openEncyclopedia);
  dom.encyclopediaClose.addEventListener('click', () => dom.encyclopediaModal.classList.add('hidden'));
  dom.victoryReplay.addEventListener('click', restartGame);
  dom.victoryAchievementsBtn.addEventListener('click', () => {
    hideVictoryScreen();
    openAchievementsPanel();
  });
  dom.victoryEncyclopedia.addEventListener('click', () => {
    hideVictoryScreen();
    openEncyclopedia();
  });
  dom.soundBtn.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    updateSoundBtn();
    saveProgress();
    if (state.soundEnabled) playSound('points');
  });

  $$('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('.tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeCategory = tab.dataset.category;
      renderProducts();
    });
  });

  setupDropZone(dom.plate);
}

function setDailyQuote() {
  const quote = DAILY_QUOTES[Math.floor(Math.random() * DAILY_QUOTES.length)];
  dom.dailyQuote.textContent = '«' + quote + '» — Нариелла';
  dom.startDailyQuote.textContent = '«' + quote + '»';
}

function getLevelConfig() {
  return LEVELS[Math.min(state.level - 1, LEVELS.length - 1)];
}

function updateLevelUI() {
  const cfg = getLevelConfig();
  const total = LEVELS.length;
  const pct = Math.round((state.level / total) * 100);
  dom.levelName.textContent = cfg.name;
  dom.levelProgressLabel.textContent = 'Уровень ' + state.level + ' из ' + total;
  dom.levelProgressPct.textContent = pct + '%';
  dom.levelProgressFill.style.width = pct + '%';
  const bar = dom.levelProgressFill.parentElement;
  if (bar) bar.setAttribute('aria-valuenow', pct);
  const t = cfg.target;
  dom.plateGuide.innerHTML =
    '<div class="guide-segment guide-veg">🥬 ' + t.vegetables + '%</div>' +
    '<div class="guide-segment guide-protein">🍗 ' + t.proteins + '%</div>' +
    '<div class="guide-segment guide-carbs">🌾 ' + t.carbs + '%</div>';
}

/* ===== Цель дня ===== */
function getTodayKey() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function initDailyGoal() {
  const today = getTodayKey();
  if (state.dailyGoal.date !== today || !state.dailyGoal.goalId) {
    const goal = DAILY_GOALS_POOL[Math.floor(Math.random() * DAILY_GOALS_POOL.length)];
    state.dailyGoal = { date: today, goalId: goal.id, completed: false };
    saveProgress();
  }
}

function getDailyGoalDef() {
  return DAILY_GOALS_POOL.find((g) => g.id === state.dailyGoal.goalId) || DAILY_GOALS_POOL[0];
}

function updateDailyGoalUI() {
  const goal = getDailyGoalDef();
  if (!goal) return;
  if (state.dailyGoal.completed) {
    dom.dailyGoalText.textContent = goal.text;
    dom.dailyGoalStatus.textContent = '✓ Цель выполнена · +' + DAILY_GOAL_BONUS + ' очков';
    dom.dailyGoalStatus.classList.remove('hidden');
    dom.dailyGoalCard.classList.add('daily-goal--done');
  } else {
    dom.dailyGoalText.textContent = goal.text;
    dom.dailyGoalStatus.classList.add('hidden');
    dom.dailyGoalCard.classList.remove('daily-goal--done');
  }
}

function checkDailyGoal(plate, ctx) {
  if (state.dailyGoal.completed) return;
  const id = state.dailyGoal.goalId;
  let done = false;
  if (id === 'veg3') {
    done = plate.filter((p) => p.category === 'vegetables').length >= 3;
  } else if (id === 'fish') {
    done = plate.some((p) => p.id === 'fish');
  } else if (id === 'flawless') {
    done = ctx.flawlessLevel;
  } else if (id === 'score100') {
    done = state.score >= 100;
  }
  if (done) {
    state.dailyGoal.completed = true;
    state.score += DAILY_GOAL_BONUS;
    saveProgress();
    updateUI();
    updateDailyGoalUI();
    showToast('✓ Цель дня выполнена! +' + DAILY_GOAL_BONUS + ' очков', 'achievement');
    playSound('points');
    showScoreFloat('+' + DAILY_GOAL_BONUS, true);
  }
}

function formatAchDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return String(d.getDate()).padStart(2, '0') + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + d.getFullYear();
}

function startGame() {
  hideStartScreen(() => {
    state.levelRoundFailures = 0;
    resetRound();
    state.isPlaying = true;
    startTimer();
    const cfg = getLevelConfig();
    setNariellaMessage(
      '<strong>' + cfg.name + '</strong><br>' + cfg.hint +
      '<br>У тебя <strong>' + cfg.time + ' секунд</strong>. ' + cfg.task + '.'
    );
  });
}

function hideStartScreen(callback) {
  if (dom.startScreen.classList.contains('hidden')) {
    if (callback) callback();
    return;
  }
  const card = dom.startScreen.querySelector('.start-screen__card');
  let done = false;
  dom.startScreen.classList.remove('start-screen--visible');
  dom.startScreen.classList.add('start-screen--hiding');
  dom.startScreen.setAttribute('aria-hidden', 'true');
  const finish = () => {
    if (done) return;
    done = true;
    dom.startScreen.classList.add('hidden');
    dom.startScreen.classList.remove('start-screen--hiding');
    if (callback) callback();
  };
  if (card) card.addEventListener('transitionend', finish, { once: true });
  setTimeout(finish, 650);
}

function showStartScreen() {
  setDailyQuote();
  dom.startScreen.classList.remove('hidden', 'start-screen--hiding');
  dom.startScreen.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    dom.startScreen.classList.add('start-screen--visible');
  }));
}

function resetRound() {
  state.plate = [];
  state.checked = false;
  state.timeLeft = getLevelConfig().time;
  state.roundStartTime = Date.now();
  dom.resultPanel.classList.add('hidden');
  dom.checkBtn.disabled = true;
  dom.plate.classList.remove('plate--success', 'shake');
  updateUI();
  renderPlate();
}

function startTimer() {
  clearInterval(state.timerId);
  updateTimerDisplay();
  state.timerId = setInterval(() => {
    state.timeLeft--;
    updateTimerDisplay();
    if (state.timeLeft <= 0) {
      clearInterval(state.timerId);
      endGame(false);
    }
  }, 1000);
}

function updateTimerDisplay() {
  dom.timer.textContent = state.timeLeft;
  const statItem = dom.timer.closest('.stat-item');
  statItem.classList.remove('timer-warning', 'timer-danger');
  if (state.timeLeft <= 10) statItem.classList.add('timer-danger');
  else if (state.timeLeft <= 20) statItem.classList.add('timer-warning');
}

/* ===== Продукты ===== */
function discoverProduct(id) {
  if (!state.discoveredProducts.includes(id)) {
    state.discoveredProducts.push(id);
    saveProgress();
  }
}

function renderProducts() {
  dom.productsGrid.innerHTML = '';
  const filtered = state.activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === state.activeCategory);

  filtered.forEach((product, i) => {
    const card = document.createElement('div');
    card.className = 'product-card cat-' + product.category;
    card.dataset.id = product.id;
    card.style.animationDelay = (i * 0.05) + 's';
    card.innerHTML =
      '<img src="images/' + product.icon + '" alt="' + product.name + '" draggable="false">' +
      '<span class="product-name">' + product.name + '</span>' +
      '<span class="product-category">' + CATEGORY_LABELS[product.category] + '</span>';
    setupDrag(card, product);
    dom.productsGrid.appendChild(card);
  });
}

function setupDrag(el, product) {
  el.addEventListener('pointerdown', (e) => onDragStart(e, el, product));
}

function onDragStart(e, el, product) {
  if (!state.isPlaying || state.checked) return;
  e.preventDefault();
  dragProduct = product;
  el.classList.add('dragging');
  el.setPointerCapture(e.pointerId);

  dragGhost = document.createElement('div');
  dragGhost.className = 'drag-ghost drag-ghost--active';
  dragGhost.innerHTML =
    '<img src="images/' + product.icon + '" alt="">' +
    '<span>' + product.name + '</span>';
  document.body.appendChild(dragGhost);
  moveGhost(e);

  const onMove = (ev) => moveGhost(ev);
  const onUp = (ev) => {
    el.classList.remove('dragging');
    el.releasePointerCapture(ev.pointerId);
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', onUp);

    const plateRect = dom.plate.getBoundingClientRect();
    const dist = Math.hypot(
      ev.clientX - (plateRect.left + plateRect.width / 2),
      ev.clientY - (plateRect.top + plateRect.height / 2)
    );
    if (dist < plateRect.width / 2) addToPlate(product);

    if (dragGhost) { dragGhost.remove(); dragGhost = null; }
    dragProduct = null;
    dom.plate.classList.remove('drag-over');
  };
  document.addEventListener('pointermove', onMove);
  document.addEventListener('pointerup', onUp);
}

function moveGhost(e) {
  if (!dragGhost) return;
  dragGhost.style.left = e.clientX + 'px';
  dragGhost.style.top = e.clientY + 'px';
  const plateRect = dom.plate.getBoundingClientRect();
  const dist = Math.hypot(
    e.clientX - (plateRect.left + plateRect.width / 2),
    e.clientY - (plateRect.top + plateRect.height / 2)
  );
  dom.plate.classList.toggle('drag-over', dist < plateRect.width / 2);
}

function setupDropZone(zone) {
  zone.addEventListener('dragover', (e) => e.preventDefault());
}

/* ===== Тарелка ===== */
function addToPlate(product) {
  if (state.plate.length >= 12) {
    setNariellaMessage('Тарелка полная! Убери лишнее или нажми «Проверить».');
    dom.plate.classList.add('shake');
    playSound('error');
    setTimeout(() => dom.plate.classList.remove('shake'), 400);
    return;
  }
  discoverProduct(product.id);
  state.plate.push({ ...product, uid: Date.now() + Math.random() });
  state.checked = false;
  dom.resultPanel.classList.add('hidden');
  dom.checkBtn.disabled = false;
  renderPlate();
  updateLiveAdvice();
}

function removeFromPlate(uid) {
  state.plate = state.plate.filter((p) => p.uid !== uid);
  state.checked = false;
  dom.resultPanel.classList.add('hidden');
  dom.checkBtn.disabled = state.plate.length === 0;
  renderPlate();
  updateLiveAdvice();
}

function renderPlate() {
  dom.plateItems.innerHTML = '';
  if (state.plate.length === 0) {
    dom.plateHint.classList.remove('hidden');
    return;
  }
  dom.plateHint.classList.add('hidden');
  state.plate.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'plate-item cat-' + item.category;
    el.style.animationDelay = (i * 0.04) + 's';
    el.innerHTML =
      '<button class="remove-btn" aria-label="Убрать">✕</button>' +
      '<img src="images/' + item.icon + '" alt="' + item.name + '">' +
      '<span>' + item.name + '</span>';
    el.querySelector('.remove-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      removeFromPlate(item.uid);
    });
    dom.plateItems.appendChild(el);
  });
}

/* ===== Проверка ===== */
function checkPlate() {
  if (state.plate.length === 0 || state.checked) return;
  const config = getLevelConfig();

  if (state.plate.length < config.minItems) {
    state.levelRoundFailures++;
    setNariellaMessage('Добавь ещё продуктов! Нужно минимум <strong>' + config.minItems + '</strong>.');
    dom.plate.classList.add('shake');
    playSound('error');
    showToast('Нужно больше продуктов', 'error');
    setTimeout(() => dom.plate.classList.remove('shake'), 400);
    return;
  }

  const levelCheck = checkLevelRequirements(config);
  if (!levelCheck.ok) {
    state.levelRoundFailures++;
    setNariellaMessage(levelCheck.message);
    dom.plate.classList.add('shake');
    playSound('error');
    showToast(levelCheck.message, 'error');
    setTimeout(() => dom.plate.classList.remove('shake'), 400);
    return;
  }

  state.checked = true;
  const result = calculateResult(config);
  displayResult(result);

  const roundScore = result.score;
  const isSuccess = roundScore >= config.targetScore;

  state.stats.totalChecks++;
  if (isSuccess) {
    state.stats.successfulChecks++;
    state.stats.successStreak++;
    if (state.timeLeft > state.stats.bestTimeLeft) {
      state.stats.bestTimeLeft = state.timeLeft;
    }
    const elapsedSec = config.time - state.timeLeft;
    if (state.stats.bestElapsed === null || elapsedSec < state.stats.bestElapsed) {
      state.stats.bestElapsed = elapsedSec;
    }
    const vegCount = state.plate.filter((p) => p.category === 'vegetables').length;
    if (vegCount >= 3) state.stats.vegPlates++;
    if (state.plate.some((p) => p.id === 'fish')) state.stats.fishSuccessCount++;
  } else {
    state.stats.successStreak = 0;
    state.levelRoundFailures++;
  }
  state.stats.successRate = state.stats.totalChecks
    ? Math.round((state.stats.successfulChecks / state.stats.totalChecks) * 100)
    : 0;

  state.score += roundScore;
  updateUI();
  dom.scoreStat.classList.add('score-bump');
  setTimeout(() => dom.scoreStat.classList.remove('score-bump'), 500);

  const elapsed = config.time - state.timeLeft;
  const flawlessLevel = isSuccess && state.levelRoundFailures === 0;
  const unlockCtx = {
    roundScore,
    isSuccess,
    levelId: config.id,
    elapsed,
    flawlessLevel,
    plate: state.plate,
  };
  checkAchievements(unlockCtx);
  if (isSuccess) checkDailyGoal(state.plate, unlockCtx);
  saveProgress();

  if (isSuccess) {
    dom.plate.classList.add('plate--success');
    playSound('success');
    showScoreFloat('+' + roundScore, true);
    setTimeout(() => {
      if (state.level >= LEVELS.length) {
        if (!state.stats.levelsCompleted.includes(LEVELS.length)) {
          state.stats.levelsCompleted.push(LEVELS.length);
          saveProgress();
        }
        showVictoryScreen();
      } else {
        showModal('🎉', 'Отличная тарелка!', 'Ты набрал <strong>' + roundScore + '</strong> очков за этот раунд!', '+' + roundScore + ' · Всего: ' + state.score, () => nextLevel());
      }
    }, 600);
  } else {
    playSound('error');
    showScoreFloat('+' + roundScore, false);
    setTimeout(() => {
      showModal('💪', 'Почти получилось!', 'Нужно минимум <strong>' + config.targetScore + '</strong> очков.', '+' + roundScore + ' · Всего: ' + state.score, () => resetRound());
    }, 600);
  }
}

function checkLevelRequirements(config) {
  const ids = state.plate.map((p) => p.id);
  const cats = { vegetables: 0, proteins: 0, carbs: 0 };
  state.plate.forEach((p) => cats[p.category]++);

  if (config.requireIds && config.requireAny) {
    const has = config.requireIds.some((id) => ids.includes(id));
    if (!has) return { ok: false, message: 'Для завтрака добавь овсянку, яйцо или цельнозерновой хлеб.' };
  }
  if (config.requireIds && !config.requireAny) {
    const missing = config.requireIds.filter((id) => !ids.includes(id));
    if (missing.length) return { ok: false, message: 'Добавь рыбу для средиземноморской тарелки.' };
  }
  if (config.requireAllCategories) {
    if (!cats.vegetables || !cats.proteins || !cats.carbs) {
      return { ok: false, message: 'Добавь продукты из всех трёх категорий: овощи, белки и углеводы.' };
    }
  }
  if (config.maxCalories) {
    const cal = state.plate.reduce((s, p) => s + p.calories, 0);
    if (cal > config.maxCalories) {
      return { ok: false, message: 'Слишком калорийно для обеда (' + cal + ' ккал). Выбери более лёгкие продукты.' };
    }
  }
  return { ok: true };
}

function calculateResult(config) {
  const target = config.target;
  const total = state.plate.length;
  const counts = { vegetables: 0, proteins: 0, carbs: 0 };
  state.plate.forEach((p) => counts[p.category]++);

  const percents = {
    vegetables: Math.round((counts.vegetables / total) * 100),
    proteins: Math.round((counts.proteins / total) * 100),
    carbs: Math.round((counts.carbs / total) * 100),
  };

  let calories = 0, be = 0;
  state.plate.forEach((p) => { calories += p.calories; be += p.be; });
  be = Math.round(be * 10) / 10;

  const totalDiff =
    Math.abs(percents.vegetables - target.vegetables) +
    Math.abs(percents.proteins - target.proteins) +
    Math.abs(percents.carbs - target.carbs);

  let score = Math.max(0, Math.round(100 - totalDiff * 1.2));
  score = Math.round(score * config.bonus);

  const grade = getGrade(score);
  const advice = getAdvice(percents, calories, be, target);

  return { percents, counts, calories, be, score, grade, advice, totalDiff };
}

function getGrade(score) {
  if (score >= 90) return { label: 'Отлично!', emoji: '⭐', color: '#2a9d62' };
  if (score >= 75) return { label: 'Хорошо!', emoji: '👍', color: '#3db87a' };
  if (score >= 60) return { label: 'Неплохо', emoji: '😊', color: '#6ec99e' };
  if (score >= 40) return { label: 'Можно лучше', emoji: '🤔', color: '#ffb74d' };
  return { label: 'Попробуй ещё', emoji: '💪', color: '#ff8a65' };
}

function getAdvice(percents, calories, be, target) {
  const tips = [];

  if (percents.vegetables < target.vegetables - 10) {
    tips.push('Добавьте больше овощей.');
  } else if (percents.vegetables > target.vegetables + 10) {
    tips.push('Овощей достаточно — добавьте белки и углеводы.');
  }

  if (percents.proteins < target.proteins - 10) {
    tips.push('Не хватает белка.');
  } else if (percents.proteins > target.proteins + 10) {
    tips.push('Слишком много белка — уменьшите долю.');
  }

  if (percents.carbs < target.carbs - 10) {
    tips.push('Добавьте углеводы для энергии.');
  } else if (percents.carbs > target.carbs + 10) {
    tips.push('Слишком много углеводов.');
  }

  if (tips.length === 0 && percents.vegetables >= target.vegetables - 5) {
    tips.push('Отличный баланс!');
    tips.push('Прекрасный выбор!');
  } else if (tips.length === 0) {
    tips.push('Хорошая тарелка — можно немного улучшить пропорции.');
  }

  if (calories > 500) tips.push('Тарелка калорийная (' + calories + ' ккал) — добавьте овощей.');
  if (be > 3) tips.push('Хлебных единиц: ' + be + ' ХЕ — учтите при планировании дня.');

  return tips;
}

function displayResult(result) {
  dom.resultPanel.classList.remove('hidden');
  dom.resultPanel.classList.add('result-panel--show');
  dom.resultGrade.textContent = result.grade.label + ' ' + result.grade.emoji;
  dom.resultGrade.style.color = result.grade.color;
  dom.resultCalories.textContent = result.calories + ' ккал';
  dom.resultBe.textContent = result.be + ' ХЕ';
  dom.resultVeg.textContent = result.percents.vegetables + '%';
  dom.resultProtein.textContent = result.percents.proteins + '%';
  dom.resultCarbs.textContent = result.percents.carbs + '%';

  const adviceHTML = result.advice.map((t) => '<p class="advice-item">' + t + '</p>').join('');
  setNariellaMessage('<strong>Оценка: ' + result.score + '/100</strong>' + adviceHTML);
}

function updateLiveAdvice() {
  const cfg = getLevelConfig();
  if (state.plate.length === 0) {
    setNariellaMessage(cfg.hint);
    return;
  }
  const total = state.plate.length;
  const counts = { vegetables: 0, proteins: 0, carbs: 0 };
  state.plate.forEach((p) => counts[p.category]++);
  const veg = Math.round((counts.vegetables / total) * 100);
  const prot = Math.round((counts.proteins / total) * 100);
  const carb = Math.round((counts.carbs / total) * 100);
  const t = cfg.target;

  let hint = 'На тарелке ' + total + ' ' + pluralize(total, 'продукт', 'продукта', 'продуктов') + '. ';
  if (veg < t.vegetables - 10) hint += 'Нужно больше овощей!';
  else if (prot < t.proteins - 10) hint += 'Добавь белковый продукт!';
  else if (carb < t.carbs - 10) hint += 'Не хватает углеводов!';
  else hint += 'Выглядит неплохо — можешь проверить!';
  setNariellaMessage(hint);
}

/* ===== Достижения ===== */
function checkAchievementCondition(ach, ctx) {
  switch (ach.type) {
    case 'firstSuccess': return ctx.isSuccess && state.stats.successfulChecks >= 1;
    case 'vegPlates': return state.stats.vegPlates >= ach.value;
    case 'fishSuccess': return state.stats.fishSuccessCount >= ach.value;
    case 'fastLevel': return ctx.isSuccess && ctx.elapsed <= ach.value;
    case 'allLevels': return state.stats.levelsCompleted.length >= LEVELS.length;
    default: return false;
  }
}

function checkAchievements(ctx) {
  const unlocked = [];
  ACHIEVEMENTS.forEach((ach) => {
    if (state.achievements.includes(ach.id)) return;
    if (checkAchievementCondition(ach, ctx)) {
      state.achievements.push(ach.id);
      state.achievementDates[ach.id] = new Date().toISOString();
      unlocked.push(ach);
    }
  });
  if (unlocked.length) {
    saveProgress();
    updateAchievementsCount();
    unlocked.forEach((ach, i) => {
      setTimeout(() => {
        playSound('achievement');
        showAchievementToast(ach);
      }, i * 400);
    });
  }
}

function showAchievementToast(ach) {
  const toast = document.createElement('div');
  toast.className = 'toast toast--achievement toast--achievement-new';
  toast.innerHTML = '<strong>🏆 Новое достижение!</strong><span>' + ach.title + '</span>';
  dom.toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast--visible'));
  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function updateAchievementsCount() {
  const count = state.achievements.length;
  const total = ACHIEVEMENTS.length;
  const pct = total ? Math.round((count / total) * 100) : 0;
  if (dom.achievementsCount) dom.achievementsCount.textContent = count;
  if (dom.achievementsProgress) {
    dom.achievementsProgress.textContent = count + ' из ' + total + ' · ' + pct + '%';
  }
  if (dom.achievementsPanelFill) dom.achievementsPanelFill.style.width = pct + '%';
}

function openAchievementsPanel() {
  dom.achievementsGrid.innerHTML = ACHIEVEMENTS.map((ach) => {
    const unlocked = state.achievements.includes(ach.id);
    const dateStr = unlocked && state.achievementDates[ach.id]
      ? formatAchDate(state.achievementDates[ach.id])
      : '';
    return '<article class="achievement-card' + (unlocked ? ' achievement-card--unlocked' : ' achievement-card--locked') + '">' +
      '<div class="achievement-card__icon">' + (unlocked ? ach.icon : '🔒') + '</div>' +
      '<h3>' + ach.title + '</h3>' +
      '<p>' + ach.desc + '</p>' +
      (unlocked
        ? '<span class="achievement-card__badge">Получено' + (dateStr ? ' · ' + dateStr : '') + '</span>'
        : '<span class="achievement-card__locked-label">Заблокировано</span>') +
    '</article>';
  }).join('');
  updateAchievementsCount();
  dom.achievementModal.classList.remove('hidden');
}

function getSuccessRate() {
  return state.stats.successRate || 0;
}

/* ===== Экран победы ===== */
function showVictoryScreen() {
  state.isPlaying = false;
  clearInterval(state.timerId);
  checkAchievements({ isSuccess: true, levelId: LEVELS.length, elapsed: 0, flawlessLevel: state.levelRoundFailures === 0, roundScore: 0, plate: [] });
  saveProgress();

  dom.victoryScore.textContent = state.score;
  dom.victoryLevel.textContent = LEVELS.length;
  dom.victoryTime.textContent = state.stats.bestElapsed !== null
    ? state.stats.bestElapsed + ' сек'
    : '—';
  dom.victoryPlates.textContent = state.stats.successfulChecks;
  dom.victoryAchievements.textContent = state.achievements.length + ' / ' + ACHIEVEMENTS.length;

  dom.victoryScreen.classList.remove('hidden');
  dom.victoryScreen.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => {
    dom.victoryScreen.classList.add('victory-screen--visible');
    startConfetti();
  });
  playSound('achievement');
}

function hideVictoryScreen() {
  stopConfetti();
  dom.victoryScreen.classList.remove('victory-screen--visible');
  dom.victoryScreen.setAttribute('aria-hidden', 'true');
  setTimeout(() => dom.victoryScreen.classList.add('hidden'), 500);
}

function restartGame() {
  hideVictoryScreen();
  state.score = 0;
  state.level = 1;
  state.levelRoundFailures = 0;
  state.stats = {
    totalChecks: 0,
    successfulChecks: 0,
    successStreak: 0,
    bestTimeLeft: 0,
    bestElapsed: null,
    highScore: state.stats.highScore,
    levelsCompleted: [],
    vegPlates: 0,
    fishSuccessCount: 0,
    successRate: 0,
  };
  initDailyGoal();
  saveProgress();
  showStartScreen();
  resetRound();
  updateUI();
  updateLevelUI();
  updateDailyGoalUI();
}

function startConfetti() {
  const canvas = dom.confettiCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#3db87a', '#6ec99e', '#a8e0c4', '#ffb74d', '#ff8a65', '#ffffff', '#2a9d62'];
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    w: 6 + Math.random() * 6,
    h: 10 + Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 2 + Math.random() * 3,
    swing: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.15,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.y += p.speed;
      p.swing += 0.04;
      p.x += Math.sin(p.swing) * 1.5;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.swing);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    });
    confettiAnimId = requestAnimationFrame(draw);
  }
  draw();
}

function stopConfetti() {
  if (confettiAnimId) {
    cancelAnimationFrame(confettiAnimId);
    confettiAnimId = null;
  }
  const canvas = dom.confettiCanvas;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/* ===== Энциклопедия ===== */
function openEncyclopedia() {
  dom.encyclopediaList.innerHTML = PRODUCTS.map((p) => {
    const discovered = state.discoveredProducts.includes(p.id);
    return '<article class="encyclopedia-item' + (discovered ? '' : ' encyclopedia-item--locked') + '">' +
      '<div class="encyclopedia-item__head">' +
        '<img src="images/' + p.icon + '" alt="">' +
        '<div><h3>' + p.name + '</h3><span class="encyclopedia-cat">' + CATEGORY_LABELS[p.category] + '</span></div>' +
      '</div>' +
      (discovered
        ? '<p class="encyclopedia-benefit">' + p.benefit + '</p><p class="encyclopedia-fact">💡 ' + p.fact + '</p>'
        : '<p class="encyclopedia-locked">Добавь продукт на тарелку, чтобы открыть</p>') +
    '</article>';
  }).join('');
  dom.encyclopediaModal.classList.remove('hidden');
}

/* ===== Уровни ===== */
function nextLevel() {
  const completedLevel = state.level;
  const cfg = getLevelConfig();
  const elapsed = cfg.time - state.timeLeft;
  if (!state.stats.levelsCompleted.includes(completedLevel)) {
    state.stats.levelsCompleted.push(completedLevel);
  }
  checkAchievements({
    isSuccess: true,
    levelId: completedLevel,
    elapsed,
    flawlessLevel: state.levelRoundFailures === 0,
    roundScore: 0,
    plate: [],
  });
  if (state.dailyGoal.goalId === 'flawless' && state.levelRoundFailures === 0) {
    checkDailyGoal([], { flawlessLevel: true, roundScore: 0 });
  }
  state.level++;
  state.levelRoundFailures = 0;
  saveProgress();
  updateLevelUI();
  const newCfg = getLevelConfig();
  setNariellaMessage(
    '<strong>Уровень ' + state.level + ': ' + newCfg.name + '</strong><br>' +
    newCfg.hint + '<br>Цель — <strong>' + newCfg.targetScore + '</strong> очков за ' + newCfg.time + ' сек.'
  );
  resetRound();
  updateUI();
  playSound('points');
}

function endGame(won) {
  state.isPlaying = false;
  clearInterval(state.timerId);
  saveProgress();
  showModal(
    won ? '🏆' : '⏰',
    won ? 'Победа!' : 'Время вышло!',
    won ? 'Ты прошёл все 5 уровней! Нариелла гордится тобой!'
      : 'Итоговый счёт: <strong>' + state.score + '</strong> очков.',
    'Уровень ' + state.level + ' · ' + state.score + ' очков',
    () => { showStartScreen(); resetRound(); }
  );
}

/* ===== UI ===== */
function updateUI() {
  dom.score.textContent = state.score;
  dom.level.textContent = state.level;
  dom.timer.textContent = state.timeLeft;
}

function setNariellaMessage(html) {
  dom.nariellaMessage.innerHTML = '<p>' + html + '</p>';
}

function showModal(icon, title, text, scoreText, callback) {
  dom.modalIcon.textContent = icon;
  dom.modalTitle.textContent = title;
  dom.modalText.innerHTML = text;
  dom.modalScore.textContent = scoreText;
  dom.modal.classList.remove('hidden');
  dom.modalBtn.onclick = () => {
    dom.modal.classList.add('hidden');
    if (callback) callback();
  };
}

function showScoreFloat(text, success) {
  const el = dom.scoreFloat;
  el.textContent = text;
  el.className = 'score-float score-float--show' + (success ? ' score-float--success' : '');
  el.setAttribute('aria-hidden', 'false');
  if (success) playSound('points');
  setTimeout(() => {
    el.classList.remove('score-float--show');
    el.setAttribute('aria-hidden', 'true');
  }, 1200);
}

function showToast(message, type) {
  const toast = document.createElement('div');
  toast.className = 'toast toast--' + (type || 'info');
  toast.textContent = message;
  dom.toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast--visible'));
  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

function pluralize(n, one, few, many) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

document.addEventListener('DOMContentLoaded', init);
