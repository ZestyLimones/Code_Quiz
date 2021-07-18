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
    question: "this is questions 1?",
    choice1: "choice 1",
    choice2: "correct answer",
    choice3: "choice 3",
    choice4: "choice 4",
    answer: 2,
  },
  {
    question: "this is questions 2?",
    choice1: "choice 1",
    choice2: "correct answer",
    choice3: "choice 3",
    choice4: "choice 4",
    answer: 2,
  },
  {
    question: "this is questions 3?",
    choice1: "choice 1",
    choice2: "correct answer",
    choice3: "choice 3",
    choice4: "choice 4",
    answer: 2,
  },
  {
    question: "this is questions 4?",
    choice1: "choice 1",
    choice2: "correct answer",
    choice3: "choice 3",
    choice4: "choice 4",
    answer: 2,
  },
];

var SCORE_POINTS = 100;
var MAX_QUESTIONS = 4;
var secondsLeft = 60;

function startGame() {
  questionCounter = 0;
  socre = 0;
  setTime();
  availableQuestions = [...questions];
  getNewQuestion();
  console.log("from inside the start game function");
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

getNewQuestion = () => {
  console.log("from inside getNewQuestion");
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("./end.html");
  }

  questionCounter++;

  var questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    var number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (event) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    var selectedChoice = event.target;
    var selectedAnswer = selectedChoice.dataset["number"];

    var classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    console.log(classToApply);

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    } else {
      secondsLeft = secondsLeft - 10;
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 100);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
