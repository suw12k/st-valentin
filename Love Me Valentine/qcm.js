document.getElementById('foodNext').addEventListener('click', () => {
  const food = document.querySelector('input[name="food"]:checked');
  if (!food) return alert("Choisis ce que tu veux manger, s'il te plaît 🙂");
  // désactiver choix nourriture
  document.querySelectorAll('input[name="food"]').forEach(i => i.disabled = true);
  document.getElementById('foodNext').disabled = true;
  // montrer bloc activités
  document.getElementById('activityBlock').classList.remove('hidden');
});

document.getElementById('activityFinish').addEventListener('click', () => {
  const act = document.querySelector('input[name="activity"]:checked');
  if (!act) return alert("Choisis une activité, s'il te plaît 🙂");
  document.querySelectorAll('input[name="activity"]').forEach(i => i.disabled = true);
  document.getElementById('activityFinish').disabled = true;

  const food = document.querySelector('input[name="food"]:checked').value;
  const activity = act.value;
  const result = document.getElementById('resultText');
  result.classList.remove('hidden');
  // Formuler le message au futur selon l'activité
  let activityPhrase = `au ${activity}`;
  if (activity.toLowerCase().includes('netflix')) activityPhrase = 'faire Netflix & chill';
  if (activity.toLowerCase().includes('cinéma')) activityPhrase = 'aller au cinéma';
  if (activity.toLowerCase().includes('balade')) activityPhrase = 'faire une balade à Paris';

  const foodPhrase = food === 'Autre' ? 'quelque chose de bon' : food;
  // Formuler la phrase au futur et ajouter un petit emoji koala
  let futureAction = '';
  const actLower = activity.toLowerCase();
  if (actLower.includes('cinéma')) futureAction = 'ira au cinéma';
  else if (actLower.includes('balade')) futureAction = 'fera une balade à Paris';
  else if (actLower.includes('netflix')) futureAction = 'fera Netflix & chill';
  else futureAction = `ira ${activityPhrase.replace(/^au\s*/i, '')}`;

  result.textContent = `Super ! On ${futureAction} et on mangera ${foodPhrase} pour la Saint‑Valentin. 🐨`;

  // Ouvrir le client mail via mailto: (remplace l'adresse par la tienne)
  const recipient = 'laszlochomel@gmail.com'; // adresse fournie par l'utilisateur
  const subject = encodeURIComponent('Invitation Saint-Valentin');
  const bodyText = `Super ! On ${futureAction} et on mangera ${foodPhrase} pour la Saint‑Valentin. 🐨\r\n\r\nAvec toi,\r\n`;
  const body = encodeURIComponent(bodyText);
  const mailto = `mailto:${recipient}?subject=${subject}&body=${body}`;
  // ouvrir le client mail (nouvelle fenêtre/onglet selon le navigateur)
  setTimeout(() => { window.location.href = mailto; }, 600);
});

// rendre cliquable la carte entière et gérer la sélection visuelle + swap des images sushi/italie
const foodCards = Array.from(document.querySelectorAll('#foodChoices .choice'));
const imgSushi = document.getElementById('imgSushi');
const imgItalie = document.getElementById('imgItalie');

foodCards.forEach(card => {
  const input = card.querySelector('input[type="radio"]');
  card.addEventListener('click', (e) => {
    if (!input || input.disabled) return;
    // cocher
    input.checked = true;
    // visuel
    foodCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    // activer le bouton valider
    const foodNextBtn = document.getElementById('foodNext');
    if (foodNextBtn) foodNextBtn.disabled = false;
    // swap images si sushi ou italien sélectionné
    if (input.value === 'Sushi' || input.value === 'Italien') {
      if (imgSushi && imgItalie) {
        const t = imgSushi.src;
        imgSushi.src = imgItalie.src;
        imgItalie.src = t;
      }
    }
  });
  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// garder le comportement clavier pour les cartes d'activité
Array.from(document.querySelectorAll('#activityBlock .choice')).forEach(card => {
  const input = card.querySelector('input[type="radio"]');
  card.addEventListener('click', () => {
    if (!input || input.disabled) return;
    input.checked = true;
    Array.from(document.querySelectorAll('#activityBlock .choice')).forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    // activer le bouton valider activité
    const actBtn = document.getElementById('activityFinish');
    if (actBtn) actBtn.disabled = false;
  });
  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});
