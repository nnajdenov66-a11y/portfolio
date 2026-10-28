// Пенка: часы в шапке героя, подсказка по времени суток и переключатель меню.

const OPEN_HOUR = 8;
const CLOSE_HOUR = 23;

// Что показываем в зависимости от часа.
const SLOTS = {
  morning: {
    head: 'Доброе утро',
    say: 'До 12:00 готовим завтраки: сырники, овсянку, бенедикт. Кофе наливаем с восьми.',
    tab: 'tab-morning'
  },
  day: {
    head: 'Добрый день',
    say: 'Сейчас обед: суп дня, паста и сэндвичи. Завтраки закончились, но круассан найдётся.',
    tab: 'tab-day'
  },
  evening: {
    head: 'Добрый вечер',
    say: 'Вечером у нас десерты и чай. Кухня работает до 22:30, кофе — до закрытия.',
    tab: 'tab-evening'
  },
  closed: {
    head: 'Сейчас закрыто',
    say: 'Откроемся в 8:00 и сразу начнём жарить сырники. Меню можно посмотреть и ночью.',
    tab: 'tab-morning'
  }
};

function slotFor(hour) {
  if (hour < OPEN_HOUR || hour >= CLOSE_HOUR) return 'closed';
  if (hour < 12) return 'morning';
  if (hour < 18) return 'day';
  return 'evening';
}

// --- часы ---
const clockEl = document.getElementById('clock');
const headEl = document.getElementById('nowHead');
const sayEl = document.getElementById('nowSay');

function paintNow() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  clockEl.textContent = hh + ':' + mm;

  const slot = SLOTS[slotFor(now.getHours())];
  headEl.textContent = slot.head;
  sayEl.textContent = slot.say;
  return slot.tab;
}

// --- переключатель меню ---
const tabs = [...document.querySelectorAll('.switch button')];
const panes = [...document.querySelectorAll('.pane')];

function showTab(id) {
  tabs.forEach(t => {
    const on = t.id === id;
    t.setAttribute('aria-selected', String(on));
    t.setAttribute('tabindex', on ? '0' : '-1');
  });
  panes.forEach(p => {
    p.hidden = p.id !== document.getElementById(id).getAttribute('aria-controls');
  });
}

tabs.forEach(t => t.addEventListener('click', () => showTab(t.id)));

// стрелками влево-вправо между вкладками
document.querySelector('.switch').addEventListener('keydown', (e) => {
  const i = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    e.preventDefault();
    const next = e.key === 'ArrowRight'
      ? (i + 1) % tabs.length
      : (i - 1 + tabs.length) % tabs.length;
    showTab(tabs[next].id);
    tabs[next].focus();
  }
});

// --- старт: открываем вкладку по текущему времени, часы идут дальше ---
showTab(paintNow());
setInterval(paintNow, 30000);

// --- мобильное меню ---
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});

nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});
