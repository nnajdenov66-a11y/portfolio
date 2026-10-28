// ГРАЧ — две вещи: мобильное меню и разовая анимация вывески при загрузке.

// --- мобильное меню ---
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});

// закрываем меню после перехода по ссылке
nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

// --- вывеска: буквы «загораются» по очереди ---
const name = document.getElementById('heroName');
const letters = name.textContent.trim();

name.textContent = '';
[...letters].forEach((ch, i) => {
  const s = document.createElement('span');
  s.textContent = ch;
  s.style.animationDelay = (0.12 + i * 0.09) + 's';
  name.appendChild(s);
});
name.classList.add('lit');
