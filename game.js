'use strict';

import { cultureGeneral } from './questions.js';
console.log(cultureGeneral.questions[0]);

// Récupérer les emplacements pour injecter la question et les options
const question = document.querySelector('.question');
const options = document.querySelector('.options');
//const correct_answer = document.querySelector('Correct_answer');
//const container = document.getElementById('button-container');
//const nextButton = document.createElement('button');
//const nextButton = document.getElementById('nextButton');
console.log(question);

// Récupérer la première question
const firstQuestion = cultureGeneral.questions[0];
console.log(firstQuestion)


// Injecter le texte de la question dans l'emplacement dédié
question.textContent = firstQuestion.text;
//console.log(); 

// // Pour chaque option, créer un bouton et l'ajouter au conteneur
firstQuestion.options.forEach(optiontext => {
const optionsButton = document.createElement('button');// Créez un bouton pour chaque option
optionsButton.textContent = optiontext ;// Assignez le texte de l'option au bouton
optionsButton.classList.add('button-container');// Ajoutez une classe pour styliser si nécessaire
options.appendChild(optionsButton); // Ajoutez le bouton au conteneur d'options
})

console.log(options);

// ETAPE 5
// Variables pour suivre l'état du quiz
let currentQuestionIndex = 0; // Commence à la première question

// Sélection des éléments HTML
const text = document.getElementById('question-text');
const container = document.getElementById('options-container');
const next = document.getElementById('next-button');

// Fonction pour afficher une question basée sur l'index actuel
function loadQuestion() {
  // Vider le conteneur des options
  container.innerHTML = '';

  // Récupérer la question actuelle
  const currentQuestion = cultureGeneral.questions[currentQuestionIndex];
console.log(currentQuestion)

  // Injecter la question dans le HTML
  text.innerText = currentQuestion.text

  // Injecter les options dans le HTML 
  currentQuestion.options.forEach(optiontext => {
    const optionsButton = document.createElement('button');
    optionsButton.innerText = optiontext;
    optionsButton.classList.add('button-container');
    container.appendChild(optionsButton);
  });
}

// Ajouter un écouteur d'événements pour le bouton "Suivant"
next.addEventListener('click', () => {
  // Incrémenter l'index de la question
  currentQuestionIndex++;

  // Vérifier s'il reste des questions
  if (currentQuestionIndex < cultureGeneral.questions.length) {
    // Afficher la question suivante
    loadQuestion();
  } else {
    // Si plus de questions, indiquer la fin du quiz
    text.innerText = 'Fin du Quiz';
    options.innerHTML = ''; // Effacer les options
    next.style.display = 'none'; // Cacher le bouton Suivant
  }
});

// Charger la première question au chargement de la page
loadQuestion();