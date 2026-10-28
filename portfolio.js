// Превью работ — это настоящие сайты в iframe шириной 1440px.
// Подгоняем масштаб под фактическую ширину карточки, чтобы превью
// занимало её целиком на любом экране.

const BASE_W = 1440;

function fitPreviews() {
  document.querySelectorAll('.work__frame').forEach(frame => {
    const iframe = frame.querySelector('iframe');
    if (!iframe) return;
    const scale = frame.clientWidth / BASE_W;
    iframe.style.transform = 'scale(' + scale + ')';
  });
}

fitPreviews();
window.addEventListener('resize', fitPreviews);
window.addEventListener('load', fitPreviews);
