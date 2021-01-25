var time = 90;
var score = 0;
let submitButton = document;
var current = 0;
var highscores = JSON.parse(localStorage.getItem("highscore")) || [];
var questions = [
  {
    message: "Commonly used data types DO NOT include: ",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correct: "alerts",
  },
  {
    message: "The condition in an if/else statement is enclosed within _____. ",
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correct: "parentheses",
  },
  {
    message: "Arrays in Javascript can be used to store _____. ",
    answers: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correct: "all of the above",
  },
  {
    message:
      "Strings values must be enclosed within _____ when being assigned to variables. ",
    answers: ["commas", "curly brackets", "quotes", "parentheses"],
    correct: "quotes",
  },
  {
    message:
      "A very useful tool used during development and debugging for printing content to the debugger is: ",
    answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correct: "console.log",
  },
];
// <!--adding the timer start-->
// <!--the on click event to start the Quiz-->
//jquery
var timer;
$("#start").on("click", function () {
  timer = setInterval(function () {
    var minute = Math.floor(time / 60);
    var second = ("0" + (time % 60)).slice(-2);
    $("#time").text(`${minute}:${second}`);
    time--;
    if (time < 0) {
      clearInterval(timer);
      return endGame();
    }
  }, 1000);
  putQuestionOnPage();
});

function putQuestionOnPage() {
  // add quiz questions
  // this adds 1 to the current and goes through the array and displays the message
  if (current === questions.length) {
    return endGame();
  }
  //displays the questions in green boxes
  $(".jumbotron").html(`
    <h3 class="mb-5">QUESTION ${current + 1} - ${
    questions[current].message
  }</h3>
    ${questions[current].answers
      .map(
        (ele) => `
    <button class="btn btn-success answer btn-lg">
        ${ele}
    </button>
    `
      )
      .join("")}
  `);
}
// need to add the clear button
// <!--add clear high scores-->

highscores.forEach((score) => $("#scoreboard").append(`<p>${score}</p>`));

$("#hs").on("mouseenter", function () {
  $("#scoreboard").show();
});
$("#hs").on("mouseleave", function () {
  $("#scoreboard").hide();
});

function endGame() {
  $(".jumbotron").html(`
  <h2>Input your initials here</h2>
  <input id = "initials">
  <button class= "btn btn-lg btn-success" id="Submit">Submit</button> 
  `);
  clearInterval(timer);
  $("#time").text("0:00");
  $("#Submit").on("click", function () {
    const initials = $("#initials").val();
    highscores.push(initials + " - " + score);
    localStorage.setItem("highscore", JSON.stringify(highscores));
  });
}

$(".jumbotron").on("click", ".answer", function () {
  // <!--logic for wrong and correct answers-->
  var chosen = $(this).text().trim();
  if (questions[current].correct === chosen) {
    correct();
  } else {
    wrong();
  }
  current++;
  putQuestionOnPage();
});

//if correct
function correct() {
  //correct logic here
  $("#message").text("correct!");
  score++;
  //add a correct on the next page how they answered the question and fade after a few seconds
  $("#message").animate({ opacity: 0 }, 1000, () => {
    $("#message").text("").css("opacity", 1);
  });
}

//if wrong
function wrong() {
  //wrong logic here
  time -= 30;
  $("#message").text("Wrong");
  //add a Wrong on the next page how they answered the question and fade after a few seconds
  $("#message").animate({ opacity: 0 }, 1000, () => {
    $("#message").text("").css("opacity", 1);
  });

  if (time <= 0) {
    endGame();
  }
}
