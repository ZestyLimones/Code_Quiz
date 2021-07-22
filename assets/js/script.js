var question = document.querySelector("#question");
var choices = document.querySelectorAll(".choice-text");
var scoreText = document.querySelector("#score");
var timeEl = document.querySelector("#time");
var gameContainer = document.querySelector("#game-container");

var currentQuestion = {};
var acceptedAnswers = true;
var score = 0;
var qCounter = 0;
var quizQuestions = [];

var quizQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<scripting>",
    choice2: "<js>",
    choice3: "<script>",
    choice4: "<javascript>",
    answer: 3,
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    choice1: "In the <head> of the HTML.",
    choice2: "In the <body> of the HTML.",
    choice3: "In the <head> and <body> of the HTML.",
    choice4: "In the CSS",
    answer: 2,
  },
  {
    question: "How do we write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World')",
    choice2: "msg('Hello World')",
    choice3: "alertBox('Hello World')",
    choice4: "alert('Hello World')",
    answer: 4,
  },
  {
    question: "How do you create a function in JavaScript?",
    choice1: "function myFunction()",
    choice2: "function {myFunction()}",
    choice3: "function:myFunction()",
    choice4: "function = myFunction()",
    answer: 1,
  },
  {
    question: "How do you write an IF statement in JavaScript?",
    choice1: "if i = 5",
    choice2: "if i === 5",
    choice3: "if i === 5 then",
    choice4: "if (i ===5)",
    answer: 4,
  },
];

var scorePoints = 10;
var maxQuestions = 5;
var secondsLeft = 60;

function startGame() {
  qCounter = 0;
  score = 0;
  setTime();
  getNewQuestion();
  gameContainer.addEventListener("click", gameClick);
}

function gameClick(event) {
  if (!acceptedAnswers) return;

  acceptedAnswers = false;
  var selectedChoice = event.target;
  console.log(event.target);
  var selectedAnswer = selectedChoice.dataset["number"];

  var classToApply;

  if (selectedAnswer == currentQuestion.answer) {
    classToApply = "correct";
    incrementScore(scorePoints);
  } else {
    classToApply = "incorrect";
    secondsLeft = secondsLeft - 10;
  }

  selectedChoice.parentElement.classList.add(classToApply);

  setTimeout(function () {
    selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestion();
  }, 100);
}

function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);

      window.location.assign("./end.html");
    }
  }, 1000);
}

var getNewQuestion = function () {
  if (quizQuestions.length === 0 || qCounter > maxQuestions) {
    localStorage.setItem("recentScore", score);

    window.location.assign("./end.html");
  }

  qCounter++;

  var qIndex = Math.floor(Math.random() * quizQuestions.length);
  currentQuestion = quizQuestions[qIndex];
  question.innerText = currentQuestion.question;

  for (var i = 0; i < choices.length; i++) {
    var number = choices[i].dataset["number"];
    choices[i].innerText = currentQuestion["choice" + number];
  }

  quizQuestions.splice(qIndex, 1);
  acceptedAnswers = true;
};

var incrementScore = function (num) {
  score += num;
  scoreText.innerText = score;
};

startGame();
