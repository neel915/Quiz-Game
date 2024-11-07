
import { cultureGeneral } from "./questions.js";  // Import du fichier "question.js"
import { informatique } from "./questions2.js";
import { cinema } from "./questions3.js";

// Sélection des éléments HTML
const text = document.getElementById("question-text"); // Récupère l'élément affichant le texte de la question
const container = document.getElementById("options-container"); // Récupère l'élément contenant les options de réponse
const next = document.getElementById("next-button"); // Récupère le bouton "Suivant"
const replay = document.getElementById("replay-button"); // Récupère le bouton "Rejouer"
const progressBar = document.getElementById("progress-bar"); // Selection de la barre de progression

let countdownTime = 29; // Définir le temps du compte à rebours en secondes
let currentQuiz = null; // Variable pour stocker le quiz actuel sélectionné 
let score = 0; // Variable pour garder la trace du score
let currentQuestionIndex = 0; // Variable pour l'index de la question actuelle
let interval
// Quizzes disponibles
const quizzes = { //on définit un objet contenant les différents quizzes
  culturegenerale: cultureGeneral, // on a stocké le theme cultureGenerale dans une clé culturegenerale
  informatique: informatique, // Quiz sur l'informatique
  cinema: cinema, // Quiz sur le cinéma
};

// Fonction pour charger un quiz en fonction du thème sélectionné
function loadQuiz(quizName) {
  currentQuiz = quizzes[quizName]; // Assigne le quiz sélectionné à currentQuiz

  if (!currentQuiz) { // Vérifie si le quiz existe
    console.log("Quiz introuvable:", quizName); // Affiche une erreur si le quiz n'est pas trouvé
    return; // Quitte la fonction si le quiz n'existe pas
  }else{
    currentQuestionIndex = 0; // Réinitialise l'index de la question à 0
    score = 0; // Réinitialise le score à 0
    loadQuestion(); // Charge la première question du quiz sélectionné
  }
}

// Ajout d'événements pour les boutons de navigation (sélection de quiz)
document.querySelectorAll(".navbar button").forEach((button) => { // Sélectionne tous les boutons de la barre de navigation
  button.addEventListener("click", () => { // Ajoute un événement de clic sur chaque bouton
    //Récupérer l'attribut de données 'quizName' du bouton et utiliser cet attribut comme paramètre.
    loadQuiz(button.dataset.quizName);    
  });
});


let timeLeft = countdownTime;
const countdownElement = document.getElementById("countdown");
const pTimer = document.querySelector(".paragraph");
let startCountdown = () => {
  
   interval = setInterval(() => {
    if (timeLeft <= 0 ) {
      clearInterval(interval);
      countdownElement.innerText = "Temps restant: 😢!";
      text.innerHTML = `Temps ecoulé ! Votre score est : ${score} sur ${currentQuiz.questions.length}`; //@TODO A revoir avec l'équipe
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
startCountdown();// @TODO revoir lemplacement de lapl pour que le decompte commence quant on commence à repondre

// Fonction pour afficher une question en fonction de l'index courant
function loadQuestion() {
  if (!currentQuiz) { // Vérifie si un quiz est chargé
    console.log("Aucun quiz chargé."); // Affiche une erreur si aucun quiz n'est chargé
    return; // Quitte la fonction si aucun quiz n'est chargé
  }
  container.innerHTML = ""; // Vide le conteneur des options avant d'ajouter de nouvelles options
  const currentQuestion = currentQuiz.questions[currentQuestionIndex]; // Récupère la question actuelle
  text.innerText = currentQuestion.text; // Affiche le texte de la question
  next.disabled = true; // Désactive le bouton "Suivant" jusqu'à ce qu'une option soit sélectionnée

  currentQuestion.options.forEach((optionText) => { // Parcourt chaque option de réponse
    const optionsButton = document.createElement("button"); // Crée un bouton pour chaque option
    optionsButton.innerText = optionText; // Définit le texte du bouton
    optionsButton.classList.add("button-container"); // Ajoute une classe pour le style
    
    optionsButton.addEventListener("click", () => { // Ajoute un événement de clic sur le bouton
      //startCountdown(); //@TODO A revoir avec l'équipe
      if (optionText === currentQuestion.correctAnswer) { // Vérifie si la réponse est correcte
        optionsButton.classList.add("correct"); // Ajoute une classe pour indiquer la bonne réponse
        score++; // Incrémente le score
      } else {
        optionsButton.classList.add("incorrect"); // Ajoute une classe pour indiquer la mauvaise réponse
      }
      Array.from(container.children).forEach((btn) => (btn.disabled = true)); // Désactive tous les boutons d'options
      
      next.disabled = false; // Active le bouton "Suivant"
      
    });
    container.appendChild(optionsButton); // Ajoute le bouton d'option au conteneur
  });
}

// Gère le bouton "Suivant" pour passer à la question suivante
next.addEventListener("click", () => { // Ajoute un événement de clic au bouton "Suivant"
  currentQuestionIndex++; // Incrémente l'index de la question actuelle
  if (currentQuestionIndex < currentQuiz.questions.length) { // Vérifie s'il y a encore des questions
    updateProgressBar();
    loadQuestion(); // Charge la question suivante
    
  } else {
    clearInterval(interval)
    text.innerHTML = `Fin du Quiz ! Votre score est : ${score} sur ${currentQuiz.questions.length}`; // Affiche le score final
    container.innerHTML = ""; // Vide le conteneur des options
    next.style.display = "none"; // Cache le bouton "Suivant"
    replay.style.display = "inline-block"; // Affiche le bouton "Rejouer"
    updateProgressBar();

    localStorage.setItem("LastResult", score); // localStorage.setItem("Nom de la clef", chaine de charactère vouluen resultat)
    const LastResultinStorage = localStorage.getItem("LastResult"); // Ajoute l'item de la clé "LastResult" dans l'onglet Appli de la console
    console.log(LastResultinStorage); // Test
  }
});


let pBar = document.querySelector("#ProgressBar");
function updateProgressBar() {
  const totalQuestions = currentQuiz.questions.length;
  const numberQuestion = currentQuestionIndex + 0;
  progressBar.innerText = numberQuestion + " / " + totalQuestions;
  pBar.max = totalQuestions;
  pBar.value = numberQuestion;
}

replay.addEventListener("click", () => { // Ajoute un événement de clic au bouton "Rejouer"
  clearInterval(interval)
  currentQuestionIndex = 0; // Réinitialise l'index de la question à 0
  score = 0; // Réinitialise le score à 0
  timeLeft = countdownTime
  next.style.display = "inline-block"; // Affiche le bouton "Suivant"
  replay.style.display = "none"; // Cache le bouton "Rejouer"
  loadQuestion(); // Recharge la première question
  updateProgressBar(); //Mise à jour de la barre de protection
  startCountdown();
});
loadQuestion();