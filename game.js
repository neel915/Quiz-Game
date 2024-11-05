import { cultureGeneral } from "./questions.js";
// === Sélection des éléments HTML ===
const text = document.getElementById("question-text"); // Conteneur pour afficher le texte de la question
const container = document.getElementById("options-container"); // Conteneur pour insérer dynamiquement les options de réponses
const next = document.getElementById("next-button"); // Bouton "Suivant" pour naviguer entre les questions
const replay = document.getElementById("replay-button"); // Bouton "Rejouer" pour recommencer le quiz
const progressBar = document.getElementById("progress-bar"); // Selection de la barre de progression
let score = 0; // Initialiser le score à 0
// Variable pour suivre l'état du quiz
let currentQuestionIndex = 0; // Index de la question courante, initialisé à zéro pour commencer au début du quiz
// === Fonction pour afficher une question en fonction de l'index courant ===
let countdownTime = 20; // Set countdown time in seconds
const countdownElement = document.getElementById("countdown");
const pTimer = document.querySelector(".paragraph");
const startCountdown = () => {
  let timeLeft = countdownTime;
  const interval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(interval);
      countdownElement.innerText = "Time's up :disappointed_relieved:!";
      // next.disabled = true;
      // optionsButton.disabled = true;
      pTimer.style.display = "none"; //  Hide the remaining text
      Array.from(container.children).forEach((btn) => (btn.disabled = true));
      next.disabled = true;
      next.style.display = "none";
      replay.disabled = false;
      replay.style.display = "inline-block";
    } else {
      countdownElement.innerText = timeLeft;
      timeLeft--;
    }
  }, 1000);
};
startCountdown();
function loadQuestion() {
  // === Réinitialisation du conteneur des options ===
  container.innerHTML = ""; // Vider le conteneur pour éviter d’afficher les options des questions précédentes
  // === Récupération et affichage de la question courante ===
  const currentQuestion = cultureGeneral.questions[currentQuestionIndex];
  text.innerText = currentQuestion.text; // Définit le texte de la question dans l'élément `text`
  next.disabled = true; // Bouton "suivant" desactivé tant qu'une reponse n'est pas selectionée
  // === Création des boutons d'options pour chaque réponse possible ===
  currentQuestion.options.forEach((optionText) => {
    const optionsButton = document.createElement("button"); // Création d'un bouton pour chaque option de réponse
    optionsButton.innerText = optionText; // Définit le texte du bouton d'option
    optionsButton.classList.add("button-container"); // Ajout d'une classe pour le style (CSS)
    // === Vérification de la réponse lorsque l'utilisateur clique sur une option ===
    optionsButton.addEventListener("click", () => {
      if (optionText === currentQuestion.correctAnswer) {
        optionsButton.classList.add("correct"); // Ajoute un style vert pour indiquer la bonne réponse
        score++; // Incrémente le score pour chaque bonne réponse
      } else {
        optionsButton.classList.add("incorrect"); // Ajoute un style rouge pour indiquer une mauvaise réponse
        //alert("Mauvaise réponse !")
      }
      // === Désactivation des options après sélection ===
      Array.from(container.children).forEach((btn) => (btn.disabled = true));
      next.disabled = false; // Bouton "suivant" activé après selection d'une reponse
    });
    // === Ajout dynamique des boutons dans le conteneur `options-container` ===
    container.appendChild(optionsButton); // Ajoute chaque bouton d'option au conteneur, pour qu'ils soient visibles dans l'interface utilisateur
  });
}
// === Gestion du bouton "Suivant" pour passer à la question suivante ===
next.addEventListener("click", () => {
  currentQuestionIndex++; // Incrémentation de l'index pour passer à la question suivante
  if (currentQuestionIndex < cultureGeneral.questions.length) {
    updateProgressBar();
    loadQuestion(); // Appel à `loadQuestion` pour charger la question suivante
  } else {
    // === Fin du quiz lorsque toutes les questions sont répondues ===
    text.innerText = `Fin du Quiz, votre score est de : ${score} / ${cultureGeneral.questions.length}`; // Indique la fin du quiz
    container.innerHTML = ""; // Vide le conteneur des options
    next.style.display = "none"; // Cache le bouton "Suivant" après la dernière question
    replay.style.display = "inline-block"; // Affiche le bouton "Rejouer" pour permettre de recommencer le quiz
    updateProgressBar(); //Mise à jour de la barre de protection
    // Stocker la valeur dans le local storage
    localStorage.setItem("LastResult", score); // localStorage.setItem("Nom de la clef", chaine de charactère vouluen resultat)
    const LastResultinStorage = localStorage.getItem("LastResult"); // Ajoute l'item de la clé "LastResult" dans l'onglet Appli de la console
    console.log(LastResultinStorage); // Test
    // Il y a 2 types de storage :
    // -localStorage pour garder la valeur indefiniment
    // -sessionStorage pour garder la valeur jusqu'a actualisation de la page
    // Pour integrer un objet et non une chaine de charactere  : localStorage.setItems('LastResult', JSON.stringify(score))
    // Pour clean les clefs et valeurs : localStorage.clear();
  }
});
let pBar = document.querySelector("#ProgressBar");
function updateProgressBar() {
  const totalQuestions = cultureGeneral.questions.length;
  const numberQuestion = currentQuestionIndex + 0;
  progressBar.innerText = numberQuestion + " / " + totalQuestions;
  pBar.max = totalQuestions;
  pBar.value = numberQuestion;
}
// === Gestion du bouton "Rejouer" pour réinitialiser le quiz ===
replay.addEventListener("click", () => {
  currentQuestionIndex = 0; // Réinitialise l'index de la question pour repartir du début
  score = 0;
  next.style.display = "inline-block"; // Réaffiche le bouton "Suivant"
  replay.style.display = "none"; // Cache le bouton "Rejouer"
  loadQuestion(); // Recharge la première question pour redémarrer le quiz
  updateProgressBar(); //Mise à jour de la barre de protection
  startCountdown();
});
// === Chargement initial de la première question ===
// Avant : `loadQuestion()` n’était pas appelé initialement, donc la première question ne s'affichait pas automatiquement.
// Après : `loadQuestion()` est appelé au démarrage pour que le quiz commence immédiatement avec la première question.
loadQuestion();
// Bouton suivant non grisé
// Compteur de point

// -------------------------------------------------
//      Timer
