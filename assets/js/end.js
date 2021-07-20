var user = document.querySelector("#user");
var saveScoreBtn = document.querySelector("#saveScoreBtn");
var finalScore = document.querySelector("#finalScore");
var mostRecentScore = localStorage.getItem("mostRecentScore");

var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

var maxHighScore = 5;

finalScore.innerText = mostRecentScore;

user.addEventListener("keyup", function () {
  saveScoreBtn.disabled = !user.value;
});

saveHighScore = function (event) {
  event.preventDefault();

  var score = {
    score: mostRecentScore,
    name: user.value,
  };

  highScores.push(score);

  highScores.sort(function (a, b) {
    return b.score - a.score;
  });

  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("./highscores.html");
};
