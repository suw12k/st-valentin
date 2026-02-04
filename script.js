const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// change the position of no button (esquive) — improved: avoid overlapping the Yes button
const btnContainer = document.querySelector('.button-container');
if (btnContainer) {
  const area = questionContainer || btnContainer;
  if (getComputedStyle(area).position === 'static') area.style.position = 'relative';
  noBtn.style.transition = 'left 200ms ease, top 200ms ease, transform 120ms ease';

  noBtn.addEventListener('mouseover', () => {
    const areaRect = area.getBoundingClientRect();
    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;

    const padding = 8;
    const centerX = Math.round(areaRect.width / 2 - btnW / 2);
    const centerY = Math.round(areaRect.height / 2 - btnH / 2);

    const radiusX = Math.max(40, Math.floor(areaRect.width / 3));
    const radiusY = Math.max(40, Math.floor(areaRect.height / 3));

    const angle = Math.random() * Math.PI * 2;
    const rX = Math.floor((0.4 + Math.random() * 0.6) * radiusX);
    const rY = Math.floor((0.4 + Math.random() * 0.6) * radiusY);
    let left = centerX + Math.round(Math.cos(angle) * rX);
    let top = centerY + Math.round(Math.sin(angle) * rY);

    // clamp into area (allow top to be slightly negative to go above)
    left = Math.max(padding, Math.min(left, Math.max(padding, Math.round(areaRect.width - btnW - padding))));
    top = Math.max(-btnH, Math.min(top, Math.max(0, Math.round(areaRect.height - btnH - padding))));

    noBtn.style.position = 'absolute';
    noBtn.style.left = left + 'px';
    noBtn.style.top = top + 'px';
    noBtn.style.transform = 'scale(1.04)';
    setTimeout(() => { noBtn.style.transform = 'scale(1)'; }, 180);
  });

  window.addEventListener('resize', () => {
    noBtn.style.position = '';
    noBtn.style.left = '';
    noBtn.style.top = '';
    noBtn.style.transform = '';
  });
}

// yes button functionality: animation then redirect to qcm page
yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  heartLoader.style.display = "inherit";

  setTimeout(() => {
    heartLoader.style.display = "none";
    // rediriger vers la nouvelle page de QCM/choix
    window.location.href = "qcm.html";
  }, 2000);
});