import { cultureGeneral } from './questions.js';
console.log(cultureGeneral.questions[0]);

// Récupérer les emplacements pour injecter la question et les options
const question = document.querySelector('question');
const options = document.querySelector('options');
const Correct1 = document.getElementById('Correct1');
const nextButton = document.getElementById('nextButton');
console.log(question);

// Récupérer la première question
//const firstQuestion = cultureGeneral.questions[0];
//console.log(firstQuestion)

//ETAPE EN COURS, A REVENIR DESSUS
// Injecter le texte de la question dans l'emplacement dédié
//Text.innerText = cultureGeneral;
//console.log();

// // Pour chaque option, créer un bouton et l'ajouter au conteneur
cultureGeneral.options.forEach((question) => {
    console.log('question:',
        question.text1 ||
        question.text2 ||
        question.text3 ||
        question.text4 ||
        question.text5 


);
    console.log(question.options);
    console.log(question.correct_answer);
});

// const optionsButton = document.querySelector('button');
// _________.innerText = __________;
// _________.classList.add('__________');
// __________.appendChild(__________);
// }
