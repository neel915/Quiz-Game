// // on recupère les elements HTML
// const text = document.getElementById("question-text");       // Conteneur pour afficher le texte de la question
// const container = document.getElementById("options-container"); // Conteneur pour insérer dynamiquement les options de réponses
// const next = document.getElementById("next-button");          // Bouton "Suivant" pour naviguer entre les questions
// const replay = document.getElementById("replay-button");      // Bouton "Rejouer" pour recommencer le quiz

// let score = 0;// Variable pour suivre le score;
// let currentQuestionIndex = 0; // Index de la question courante, initialisé à zéro pour commencer au début du quiz
// // Fonction pour charger chaque question avec ses options de reponse
// function loadQuestion() {
//   // === Réinitialisation du conteneur des options ===
//   // Avant : Le conteneur des options n'était pas nettoyé avant de charger une nouvelle question, ce qui causait des doublons.
//   // Après : On utilise `container.innerHTML = ""` pour vider le conteneur des options avant de les recréer pour la nouvelle question.
//   container.innerHTML = ""; // Vider le conteneur pour éviter d’afficher les options des questions précédentes
//   // === Récupération et affichage de la question courante ===
//   // Avant : Le texte de la question n'était pas mis à jour dynamiquement.
//   // Après : Le texte de la question est injecté dynamiquement dans l'élément `text` à chaque appel de `loadQuestion`.
  
//   const currentQuestion = cultureGeneral.questions[currentQuestionIndex];
//   text.innerText = currentQuestion.text; // Définit le texte de la question dans l'élément `text`
//   next.disabled = true; //desactiver le bouton suivant
//   // === Création des boutons d'options pour chaque réponse possible ===
//   // Avant : Les boutons d’options n’étaient créés que pour la première question et ne se mettaient pas à jour.
//   // Après : Chaque option est transformée en bouton avec vérification de la réponse, et les boutons sont insérés dans `options-container`.
//   currentQuestion.options.forEach((optionText) => {
//     const optionsButton = document.createElement("button"); // Création d'un bouton pour chaque option de réponse
//     optionsButton.innerText = optionText;                   // Définit le texte du bouton d'option
//     optionsButton.classList.add("button-container");        // Ajout d'une classe pour le style (CSS)
//     // === Vérification de la réponse lorsque l'utilisateur clique sur une option ===
//     // Avant : La vérification de la réponse ne fonctionnait que pour la première question.
//     // Après : Chaque bouton a un événement `click` pour vérifier si l’option est correcte ou non.
//     optionsButton.addEventListener("click", () => {
//       if (optionText === currentQuestion.correctAnswer) {
//         optionsButton.classList.add("correct"); // Ajoute un style vert pour indiquer la bonne réponse
//         //alert("Bonne réponse !");
//         score ++
//       } else {
//         optionsButton.classList.add("incorrect"); // Ajoute un style rouge pour indiquer une mauvaise réponse
//         //alert("Mauvaise réponse !");
//       }
//       // === Désactivation des options après sélection ===
//       // Avant : Les autres options restaient activables, permettant plusieurs sélections.
//       // Après : Une fois qu’une réponse est sélectionnée, toutes les options sont désactivées pour éviter d'autres clics.
//       Array.from(container.children).forEach((btn) => (btn.disabled = true));
//       next.disabled = false;
//     });
//     // === Ajout dynamique des boutons dans le conteneur `options-container` ===
//     // Avant : Les options de réponse étaient définies statiquement dans le HTML, limitant leur affichage aux premières options.
//     // Après : `container.appendChild(optionsButton)` ajoute chaque bouton d'option dans le conteneur HTML, permettant d’afficher les options de chaque question dynamiquement.
//     container.appendChild(optionsButton); // Ajoute chaque bouton d'option au conteneur, pour qu'ils soient visibles dans l'interface utilisateur
//   });
// }
// // === Gestion du bouton "Suivant" pour passer à la question suivante ===
// // Avant : L'incrémentation de l'index de question et la logique de fin de quiz étaient dispersées et causait des erreurs d'affichage.
// // Après : Le bouton "Suivant" incrémente l'index proprement, charge la prochaine question, et gère la fin du quiz.
// next.addEventListener("click", () => {
//   currentQuestionIndex++; // Incrémentation de l'index pour passer à la question suivante
//   if (currentQuestionIndex < cultureGeneral.questions.length) {
//     loadQuestion(); // Appel à `loadQuestion` pour charger la question suivante
//   } else {
//     // === Fin du quiz lorsque toutes les questions sont répondues ===
//     // Avant : La fin du quiz n'était pas structurée, causant des erreurs d'affichage.
//     // Après : Le code gère la fin du quiz, en affichant un message et en ajustant les boutons "Suivant" et "Rejouer".
//     text.innerHTML = `Fin du Quiz ! votre score est : ${score} sur ${cultureGeneral.questions.length}`;      // Indique la fin du quiz
//     //text.innerHTML = 'Fin du Quiz ! votre score est : '+score ;
//     container.innerHTML = "";            // Vide le conteneur des options
//     next.style.display = "none";         // Cache le bouton "Suivant" après la dernière question
//     replay.style.display = "inline-block"; // Affiche le bouton "Rejouer" pour permettre de recommencer le quiz
//   }
// });
// // === Gestion du bouton "Rejouer" pour réinitialiser le quiz ===
// // Avant : La réinitialisation du quiz n'était pas fonctionnelle, et l'index de la question n'était pas remis à zéro.
// // Après : Le bouton "Rejouer" remet à zéro l'index, cache "Rejouer" et réaffiche la première question.
// replay.addEventListener("click", () => {
//   currentQuestionIndex = 0;             // Réinitialise l'index de la question pour repartir du début
//   score =0;
//   next.style.display = "inline-block";  // Réaffiche le bouton "Suivant"
//   replay.style.display = "none";        // Cache le bouton "Rejouer"
//   loadQuestion();                       // Recharge la première question pour redémarrer le quiz
// });
// // === Chargement initial de la première question ===
// // Avant : `loadQuestion()` n’était pas appelé initialement, donc la première question ne s'affichait pas automatiquement.
// // Après : `loadQuestion()` est appelé au démarrage pour que le quiz commence immédiatement avec la première question.
// loadQuestion();