// Страница репетитора: раскрытие решения задачи и мобильное меню.

// --- решение задачи на первом экране ---
const solveBtn = document.getElementById('solveBtn');
const solution = document.getElementById('solution');

solveBtn.addEventListener('click', () => {
  const open = solution.hidden;
  solution.hidden = !open;
  solveBtn.setAttribute('aria-expanded', String(open));
  solveBtn.textContent = open ? 'Свернуть решение' : 'Показать решение';
});

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
