var question = document.querySelector("#question");
var choices = Array.from(document.querySelectorAll(".choice-text"));
var progressText = document.querySelector("#progressText");
var scoreText = document.querySelector("#score");
var progressBarFull = document.querySelector("#progressBarFull");
var timeEl = document.querySelector("#time");

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
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
var maxQuestions = 4;
var secondsLeft = 60;

function startGame() {
  questionCounter = 0;
  score = 0;
  setTime();
  availableQuestions = [...questions];
  getNewQuestion();
}

function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);

      return window.location.assign("./end.html");
    }
  }, 1000);
}

var getNewQuestion = function () {
  if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("./end.html");
  }

  questionCounter++;

  var questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(function (choice) {
    var number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(function (choice) {
  choice.addEventListener("click", (event) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    var selectedChoice = event.target;
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

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 100);
  });
});

var incrementScore = function (num) {
  score += num;
  scoreText.innerText = score;
};

startGame();