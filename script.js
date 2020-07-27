let currentQuestion = 0;
let currentAnswer = 0;
let currentRightScore = 0;
let currentWrongScore = 0;
let rightScore = 10;
let wrongScore = 5;

/**
	HTML SELECTORS
*/
let startButton = document.querySelector('.start-button');
let score = document.querySelector('.score');
startButton.addEventListener('click', startGame);
let scoreRight = document.querySelector('.score-right');
let scoreWrong = document.querySelector('.score-wrong');
let question = document.querySelector('.question');
let answer = document.querySelector('.answer');
let flashcard = document.querySelector('#flashcard');
let controls = document.querySelector('#controls');
let form = document.querySelector('form');
let userInput = document.querySelector('.input');
let resetButton = document.querySelector('.reset-game');
let text = document.querySelector('.text');
let nextCard = document.querySelector('.next-card');
let questionContainer = document.querySelector('.question-container');
let answerContainer = document.querySelector('.answer-container');

resetButton.addEventListener('click', resetGame);

// Hou comment: consider refactoring the callback function into a named function declared
// in the outside scope
form.addEventListener('submit', function (event) {
  event.preventDefault();
  let answer = cards[currentAnswer];
  currentAnswer = currentAnswer + 1;
  // Hou comment: I notice we're using .style.display throughout this file. Could you use classList.add/classList.remove instead? Which approach seems cleaner to you?
  nextCard.style.display = 'flex';
  form.style.display = 'none';
  if (answer.a === userInput.value) {
    flashcard.innerText = 'Correct!';
    scoreRight.innerText = ++currentRightScore;
    flashcard.style.background = 'green';
  } else {
    flashcard.innerText = 'Incorrect! ' + answer.a;
    scoreWrong.innerText = ++currentWrongScore;
    flashcard.style.background = 'red';
  }
  if (rightScore === currentRightScore) {
    flashcard.innerText = 'You have won the game!';
    nextCard.style.display = 'none';
    resetButton.style.display = 'block';
  } else if (wrongScore === currentWrongScore) {
    document.querySelector('#modal').style.display = 'block';
    nextCard.style.display = 'none';
    resetButton.style.display = 'block';
  }
});

nextCard.addEventListener('click', theNextCard);
function theNextCard() {
  showQuestion();
  userInput.value = null;
  nextCard.style.display = 'none';
  form.style.display = 'flex';
  flashcard.style.background = 'white';
}

// Hou comment: I'd move `cards` to the top of the file for better readability
// Hou comment: use let or const instead of var.
// var has some strange behaviors: https://blog.usejournal.com/awesome-javascript-no-more-var-working-title-999428999994
let cards = [
  // Hou comment: try to avoid using highly abbreviated property names like `q` and `a`. Just use `question` and `answer`
  // as they are more descriptive/readable
  { q: 'Civic', a: 'Honda' },
  { q: 'Camry', a: 'Toyota' },
  { q: 'Santa Fe', a: 'Hyundai' },
  { q: 'Buick', a: 'Chevrolet' },
  { q: 'Compass', a: 'Jeep' },
  { q: 'Tribute', a: 'Mazda' },
  { q: 'Outback', a: 'Subaru' },
  { q: 'Escape', a: 'Ford' },
  { q: 'Sierra', a: 'GMC' },
  { q: 'Jetta', a: 'Volkswagen' },
  { q: 'Benz', a: 'Mercedes' },
  { q: 'M4', a: 'BMW' },
  { q: 'Sorento', a: 'KIA' },
];

// Hou comment: Add a comment to explain what this for-loop is doing
for (let i = cards.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * i);
  const temp = cards[i];
  cards[i] = cards[j];
  cards[j] = temp;
}

function startGame(event) {
  event.preventDefault();
  score.style.display = 'block';
  startButton.style.display = 'none';
  form.style.display = 'flex';
  userInput.value = null;
  showQuestion();
}

function showQuestion() {
  const question = cards[currentQuestion];
  currentQuestion = currentQuestion + 1;
  flashcard.innerText = question.q;
}

function resetGame(event) {
  event.preventDefault();
  document.location.href = '';
}
