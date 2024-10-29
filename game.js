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

//ETAPE EN COURS, A REVENIR DESSUS
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