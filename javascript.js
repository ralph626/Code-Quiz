var time = 135;
var score = 0;
var current = 0;
var questions = [
  {
    message: "What is Tails' real name?",
    answers: ["Tails", "Sonic 2", "Knuckles", "Mouse"],
    correct: "Mouse",
  },
  {
    message: "What is Sonics real name?",
    answers: ["Tails", "Sonic the hedgehog", "Knuckles", "Mouse"],
    correct: "Sonic the hedgehog",
  },
  {
    message: "What is Ralph's real name?",
    answers: ["Tails", "Sonic 2", "Rafael", "Mouse"],
    correct: "Rafael",
  },
  {
    message: "What is Tails' real name?",
    answers: ["Tails", "Sonic 2", "Knuckles", "Mouse"],
    correct: "Mouse",
  },
  {
    message: "What is Tails' real name?",
    answers: ["Tails", "Sonic 2", "Knuckles", "Mouse"],
    correct: "Mouse",
  },
];
// <!--adding the timer start-->
// <!--should have a on click  button to initiate the quiz-->

$("#start").on("click", function () {
  var timer = setInterval(function () {
    var minute = Math.floor(time / 60);
    var second = ("0" + (time % 60)).slice(-2);
    $("#time").text(`${minute}:${second}`);
    time--;
    if (time < 0) {
      clearInterval(timer);
    }
  }, 1000);
  putQuestionOnPage();
});

function putQuestionOnPage() {
  // <!--add quiz questions-->
  $(".jumbotron").html(`
    <h3 class="mb-5">QUESTION ${current + 1} - ${
    questions[current].message
  }</h3>
    ${questions[current].answers.map(
      (ele) => `
    <button class="btn btn-success btn-lg">
        ${ele}
    </button>
    `
    ).join("")}
    `);
}

$(".jumbotron").on("click", "button", function(){
    // <!--logic for wrong and correct answers-->
    var chosen = $(this).text().trim();
   if(questions[current].correct === chosen){
       correct()
   }else{
       wrong()
   }
   current++;
   putQuestionOnPage();
})

//if correct
function correct(){
    //correct logic here
    alert("correct!")
}

//if wrong
function wrong(){
    //wrong logic here
    alert("wrong!")
}
// <!--logic for timer decreased-->

// <!--enter initials page with accepting inputs-->
// <!--add go back button-->
// <!--add clear high scores-->

// <!--add the view high scores page-->
// <!--re reading the value of the input field-->
