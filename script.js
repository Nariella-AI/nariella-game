/* ===== Данные продуктов ===== */
const PRODUCTS = [
  { id: 'cucumber',    name: 'Огурец',              category: 'vegetables', icon: 'cucumber.svg',    calories: 16,  be: 0 },
  { id: 'tomato',      name: 'Помидор',             category: 'vegetables', icon: 'tomato.svg',      calories: 18,  be: 0 },
  { id: 'broccoli',    name: 'Брокколи',            category: 'vegetables', icon: 'broccoli.svg',    calories: 34,  be: 0 },
  { id: 'cabbage',     name: 'Капуста',             category: 'vegetables', icon: 'cabbage.svg',     calories: 25,  be: 0 },
  { id: 'chicken',     name: 'Курица',              category: 'proteins',   icon: 'chicken.svg',     calories: 165, be: 0 },
  { id: 'fish',        name: 'Рыба',                category: 'proteins',   icon: 'fish.svg',        calories: 120, be: 0 },
  { id: 'egg',         name: 'Яйцо',                category: 'proteins',   icon: 'egg.svg',         calories: 78,  be: 0 },
  { id: 'cottage',     name: 'Творог',              category: 'proteins',   icon: 'cottage.svg',     calories: 100, be: 0.5 },
  { id: 'rice',        name: 'Рис',                 category: 'carbs',      icon: 'rice.svg',        calories: 130, be: 1 },
  { id: 'buckwheat',   name: 'Гречка',              category: 'carbs',      icon: 'buckwheat.svg',   calories: 110, be: 1 },
  { id: 'oatmeal',     name: 'Овсянка',             category: 'carbs',      icon: 'oatmeal.svg',     calories: 88,  be: 1 },
  { id: 'bread',       name: 'Цельнозерновой хлеб', category: 'carbs',      icon: 'bread.svg',       calories: 80,  be: 1 },
];

const CATEGORY_LABELS = {
  vegetables: 'Овощи',
  proteins: 'Белки',
  carbs: 'Углеводы',
};

const TARGET = { vegetables: 50, proteins: 25, carbs: 25 };

const LEVEL_CONFIG = [
  { time: 60, minItems: 3, targetScore: 60 },
  { time: 55, minItems: 4, targetScore: 70 },
  { time: 50, minItems: 4, targetScore: 75 },
  { time: 45, minItems: 5, targetScore: 80 },
  { time: 40, minItems: 5, targetScore: 85 },
  { time: 35, minItems: 6, targetScore: 90 },
];

/* ===== Состояние игры ===== */
const state = {
  plate: [],
  score: 0,
  level: 1,
  timeLeft: 60,
  timerId: null,
  isPlaying: false,
  activeCategory: 'all',
  checked: false,
};

/* ===== DOM ===== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
  timer: $('#timer'),
  score: $('#score'),
  level: $('#level'),
  plate: $('#plate'),
  plateItems: $('#plate-items'),
  plateHint: $('#plate-hint'),
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
};

/* ===== Инициализация ===== */
function init() {
  renderProducts();
  bindEvents();
}

function bindEvents() {
  dom.startBtn.addEventListener('click', startGame);
  dom.checkBtn.addEventListener('click', checkPlate);
  dom.modalBtn.addEventListener('click', onModalClose);

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

function startGame() {
  hideStartScreen(() => {
    resetRound();
    state.isPlaying = true;
    startTimer();
    setNariellaMessage('Отлично, начинаем! 🎯 Собери тарелку с правильными пропорциями и нажми «Проверить». У тебя <strong>' + getLevelConfig().time + ' секунд</strong>!');
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

  if (card) {
    card.addEventListener('transitionend', finish, { once: true });
  }
  setTimeout(finish, 650);
}

function showStartScreen() {
  dom.startScreen.classList.remove('hidden', 'start-screen--hiding');
  dom.startScreen.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      dom.startScreen.classList.add('start-screen--visible');
    });
  });
}

function resetRound() {
  state.plate = [];
  state.checked = false;
  state.timeLeft = getLevelConfig().time;
  dom.resultPanel.classList.add('hidden');
  dom.checkBtn.disabled = true;
  updateUI();
  renderPlate();
}

function getLevelConfig() {
  const idx = Math.min(state.level - 1, LEVEL_CONFIG.length - 1);
  return LEVEL_CONFIG[idx];
}

/* ===== Таймер ===== */
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
  if (state.timeLeft <= 10) {
    statItem.classList.add('timer-danger');
  } else if (state.timeLeft <= 20) {
    statItem.classList.add('timer-warning');
  }
}

/* ===== Рендер продуктов ===== */
function renderProducts() {
  dom.productsGrid.innerHTML = '';

  const filtered = state.activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === state.activeCategory);

  filtered.forEach((product) => {
    const card = document.createElement('div');
    card.className = `product-card cat-${product.category}`;
    card.dataset.id = product.id;
    card.innerHTML = `
      <img src="images/${product.icon}" alt="${product.name}" draggable="false">
      <span class="product-name">${product.name}</span>
      <span class="product-category">${CATEGORY_LABELS[product.category]}</span>
    `;
    setupDrag(card, product);
    dom.productsGrid.appendChild(card);
  });
}

/* ===== Drag & Drop ===== */
let dragGhost = null;
let dragProduct = null;
let dragOffset = { x: 0, y: 0 };

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
  dragGhost.className = 'drag-ghost';
  dragGhost.innerHTML = `
    <img src="images/${product.icon}" alt="${product.name}">
    <span>${product.name}</span>
  `;
  document.body.appendChild(dragGhost);
  moveGhost(e);

  const onMove = (ev) => moveGhost(ev);
  const onUp = (ev) => {
    el.classList.remove('dragging');
    el.releasePointerCapture(ev.pointerId);
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', onUp);

    const plateRect = dom.plate.getBoundingClientRect();
    const cx = ev.clientX;
    const cy = ev.clientY;

    const dist = Math.hypot(
      cx - (plateRect.left + plateRect.width / 2),
      cy - (plateRect.top + plateRect.height / 2)
    );

    if (dist < plateRect.width / 2) {
      addToPlate(product);
    }

    if (dragGhost) {
      dragGhost.remove();
      dragGhost = null;
    }
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
    setNariellaMessage('Тарелка полная! 🍽️ Убери лишнее или нажми «Проверить».');
    dom.plate.classList.add('shake');
    setTimeout(() => dom.plate.classList.remove('shake'), 400);
    return;
  }

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

  state.plate.forEach((item) => {
    const el = document.createElement('div');
    el.className = `plate-item cat-${item.category}`;
    el.innerHTML = `
      <button class="remove-btn" aria-label="Убрать">✕</button>
      <img src="images/${item.icon}" alt="${item.name}">
      <span>${item.name}</span>
    `;
    el.querySelector('.remove-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      removeFromPlate(item.uid);
    });
    dom.plateItems.appendChild(el);
  });
}

/* ===== Проверка тарелки ===== */
function checkPlate() {
  if (state.plate.length === 0 || state.checked) return;

  const config = getLevelConfig();
  if (state.plate.length < config.minItems) {
    setNariellaMessage(`Добавь ещё продуктов! На уровне ${state.level} нужно минимум <strong>${config.minItems}</strong> продукта. 🥗`);
    dom.plate.classList.add('shake');
    setTimeout(() => dom.plate.classList.remove('shake'), 400);
    return;
  }

  state.checked = true;
  const result = calculateResult();
  displayResult(result);

  const roundScore = result.score;
  state.score += roundScore;
  updateUI();

  if (roundScore >= config.targetScore) {
    setTimeout(() => {
      showModal(
        '🎉',
        'Отличная тарелка!',
        `Ты набрал <strong>${roundScore}</strong> очков за этот раунд!`,
        `+${roundScore} очков · Всего: ${state.score}`,
        () => nextLevel()
      );
    }, 800);
  } else {
    setTimeout(() => {
      showModal(
        '💪',
        'Почти получилось!',
        `Нужно набрать минимум <strong>${config.targetScore}</strong> очков. Попробуй ещё раз!`,
        `+${roundScore} очков · Всего: ${state.score}`,
        () => resetRound()
      );
    }, 800);
  }
}

function calculateResult() {
  const total = state.plate.length;
  const counts = { vegetables: 0, proteins: 0, carbs: 0 };

  state.plate.forEach((p) => counts[p.category]++);

  const percents = {
    vegetables: Math.round((counts.vegetables / total) * 100),
    proteins: Math.round((counts.proteins / total) * 100),
    carbs: Math.round((counts.carbs / total) * 100),
  };

  let calories = 0;
  let be = 0;
  state.plate.forEach((p) => {
    calories += p.calories;
    be += p.be;
  });
  be = Math.round(be * 10) / 10;

  const vegDiff = Math.abs(percents.vegetables - TARGET.vegetables);
  const proteinDiff = Math.abs(percents.proteins - TARGET.proteins);
  const carbDiff = Math.abs(percents.carbs - TARGET.carbs);
  const totalDiff = vegDiff + proteinDiff + carbDiff;

  const score = Math.max(0, Math.round(100 - totalDiff * 1.2));

  const grade = getGrade(score);
  const advice = getAdvice(percents, counts, calories, be);

  return { percents, counts, calories, be, score, grade, advice, totalDiff };
}

function getGrade(score) {
  if (score >= 90) return { label: 'Отлично! ⭐', emoji: '⭐', color: '#2a9d62' };
  if (score >= 75) return { label: 'Хорошо! 👍', emoji: '👍', color: '#3db87a' };
  if (score >= 60) return { label: 'Неплохо 😊', emoji: '😊', color: '#6ec99e' };
  if (score >= 40) return { label: 'Можно лучше 🤔', emoji: '🤔', color: '#ffb74d' };
  return { label: 'Попробуй ещё 💪', emoji: '💪', color: '#ff8a65' };
}

function getAdvice(percents, counts, calories, be) {
  const tips = [];

  if (percents.vegetables < 40) {
    tips.push('Добавь больше овощей — они должны занимать половину тарелки! 🥬');
  } else if (percents.vegetables > 60) {
    tips.push('Овощей многовато — добавь белки и углеводы для баланса. 🍗');
  }

  if (percents.proteins < 15) {
    tips.push('Не хватает белков! Добавь курицу, рыбу, яйцо или творог. 🥚');
  } else if (percents.proteins > 35) {
    tips.push('Слишком много белков — уменьши их долю до 25%. 🐟');
  }

  if (percents.carbs < 15) {
    tips.push('Добавь углеводы: рис, гречку, овсянку или цельнозерновой хлеб. 🌾');
  } else if (percents.carbs > 35) {
    tips.push('Углеводов слишком много — сократи до 25%. 🍞');
  }

  if (calories > 500) {
    tips.push('Тарелка довольно калорийная (' + calories + ' ккал). Попробуй добавить больше овощей! 🔥');
  } else if (calories < 200) {
    tips.push('Тарелка лёгкая (' + calories + ' ккал) — отличный вариант для лёгкого приёма пищи! ✨');
  }

  if (be > 3) {
    tips.push('Хлебных единиц много (' + be + ' ХЕ) — учти это при планировании дня. 📊');
  }

  if (tips.length === 0) {
    tips.push('Идеальный баланс! Ты отлично справился с пропорциями тарелки! 🎉');
  }

  return tips;
}

function displayResult(result) {
  dom.resultPanel.classList.remove('hidden');
  dom.resultGrade.textContent = result.grade.label;
  dom.resultGrade.style.color = result.grade.color;
  dom.resultCalories.textContent = result.calories + ' ккал';
  dom.resultBe.textContent = result.be + ' ХЕ';
  dom.resultVeg.textContent = result.percents.vegetables + '%';
  dom.resultProtein.textContent = result.percents.proteins + '%';
  dom.resultCarbs.textContent = result.percents.carbs + '%';

  const adviceHTML = result.advice.map((t) => `<p>${t}</p>`).join('');
  setNariellaMessage(
    `<strong>${result.grade.emoji} Оценка: ${result.score}/100</strong><br>${adviceHTML}`
  );
}

function updateLiveAdvice() {
  if (state.plate.length === 0) {
    setNariellaMessage('Перетащи продукты на тарелку! Помни: <strong>50% овощей</strong>, <strong>25% белков</strong>, <strong>25% углеводов</strong>. 🥗');
    return;
  }

  const total = state.plate.length;
  const counts = { vegetables: 0, proteins: 0, carbs: 0 };
  state.plate.forEach((p) => counts[p.category]++);

  const veg = Math.round((counts.vegetables / total) * 100);
  const prot = Math.round((counts.proteins / total) * 100);
  const carb = Math.round((counts.carbs / total) * 100);

  let hint = `На тарелке ${total} ${pluralize(total, 'продукт', 'продукта', 'продуктов')}. `;

  if (veg < 40) hint += 'Нужно больше овощей! 🥬';
  else if (prot < 15) hint += 'Добавь белковый продукт! 🍗';
  else if (carb < 15) hint += 'Не хватает углеводов! 🌾';
  else hint += 'Выглядит неплохо — можешь проверить! ✅';

  setNariellaMessage(hint);
}

/* ===== Уровни ===== */
function nextLevel() {
  state.level++;
  const config = getLevelConfig();
  setNariellaMessage(`Уровень <strong>${state.level}</strong>! 🚀 Теперь у тебя <strong>${config.time} секунд</strong> и нужно минимум <strong>${config.minItems}</strong> продукта. Цель — <strong>${config.targetScore}</strong> очков!`);
  resetRound();
  updateUI();
}

function endGame(won) {
  state.isPlaying = false;
  clearInterval(state.timerId);

  showModal(
    won ? '🏆' : '⏰',
    won ? 'Победа!' : 'Время вышло!',
    won
      ? 'Ты прошёл все уровни! Нариелла гордится тобой!'
      : `Игра окончена! Твой итоговый счёт: <strong>${state.score}</strong> очков на уровне ${state.level}.`,
    `Итого: ${state.score} очков`,
    () => {
      state.score = 0;
      state.level = 1;
      showStartScreen();
      resetRound();
      updateUI();
    }
  );
}

/* ===== UI Helpers ===== */
function updateUI() {
  dom.score.textContent = state.score;
  dom.level.textContent = state.level;
  dom.timer.textContent = state.timeLeft;
}

function setNariellaMessage(html) {
  dom.nariellaMessage.innerHTML = `<p>${html}</p>`;
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

function onModalClose() {
  dom.modal.classList.add('hidden');
}

function pluralize(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

/* ===== Запуск ===== */
document.addEventListener('DOMContentLoaded', init);
