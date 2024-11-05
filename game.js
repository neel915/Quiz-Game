
import { cultureGeneral } from "./questions.js";
import { informatique } from "./questions2.js";
import { cinema } from "./questions3.js";

// Sélection des éléments HTML
const text = document.getElementById("question-text"); // Récupère l'élément affichant le texte de la question
const container = document.getElementById("options-container"); // Récupère l'élément contenant les options de réponse
const next = document.getElementById("next-button"); // Récupère le bouton "Suivant"
const replay = document.getElementById("replay-button"); // Récupère le bouton "Rejouer"

// Quizzes disponibles
const quizzes = { // Définit un objet contenant les différents quizzes
  culturegenerale: cultureGeneral, // Quiz sur la culture générale
  informatique: informatique, // Quiz sur l'informatique
  cinema: cinema, // Quiz sur le cinéma
};

let currentQuiz = null; // Variable pour stocker le quiz actuel sélectionné
let score = 0; // Variable pour garder la trace du score
let currentQuestionIndex = 0; // Variable pour l'index de la question actuelle

// Fonction pour charger un quiz en fonction du thème sélectionné
function loadQuiz(quizName) {
  currentQuiz = quizzes[quizName]; // Assigne le quiz sélectionné à currentQuiz

  if (!currentQuiz) { // Vérifie si le quiz existe
    console.error("Quiz introuvable:", quizName); // Affiche une erreur si le quiz n'est pas trouvé
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


// Fonction pour afficher une question en fonction de l'index courant
function loadQuestion() {
  if (!currentQuiz) { // Vérifie si un quiz est chargé
    console.error("Aucun quiz chargé."); // Affiche une erreur si aucun quiz n'est chargé
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
    loadQuestion(); // Charge la question suivante
  } else {
    text.innerHTML = `Fin du Quiz ! Votre score est : ${score} sur ${currentQuiz.questions.length}`; // Affiche le score final
    container.innerHTML = ""; // Vide le conteneur des options
    next.style.display = "none"; // Cache le bouton "Suivant"
    replay.style.display = "inline-block"; // Affiche le bouton "Rejouer"
  }
});

// Gère le bouton "Rejouer" pour réinitialiser le quiz
replay.addEventListener("click", () => { // Ajoute un événement de clic au bouton "Rejouer"
  currentQuestionIndex = 0; // Réinitialise l'index de la question à 0
  score = 0; // Réinitialise le score à 0
  next.style.display = "inline-block"; // Affiche le bouton "Suivant"
  replay.style.display = "none"; // Cache le bouton "Rejouer"
  loadQuestion(); // Recharge la première question
});


