
var timeLeft = 60; // Total time for the quiz
var currentQuestionIndex = 0; // Index of the current question
var score = 0; // Total score for the quiz
var timer; // Variable to store the timer

// Define an array of objects for the quiz questions and answers
var questions = [
  {
    question: "What does HTML stand for?",
    choices: ["Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Markup Language", "Hyperlinking Text Marking Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What does CSS stand for?",
    choices: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does JS stand for?",
    choices: ["JavaScript", "JavaSource", "JavaSolve", "JavaStyle"],
    answer: "JavaScript"
  }
];

// Function to start the quiz
function startQuiz() {
  // Hide the start screen and show the questions screen
  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("questions").classList.remove("hide");

  // Start the timer
  timer = setInterval(function() {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);

  // Display the first question
  displayQuestion();
}

// Function to display a question
function displayQuestion() {
  // Get the current question from the questions array
  var currentQuestion = questions[currentQuestionIndex];

  // Display the question title and choices
  document.getElementById("question-title").textContent = currentQuestion.question;
  var choicesEl = document.getElementById("choices");
  choicesEl.innerHTML = "";
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var buttonEl = document.createElement("button");
    buttonEl.textContent = choice;
    buttonEl.addEventListener("click", function() {
      // Check if the answer is correct
      if (this.textContent === currentQuestion.answer) {
        score++;
        document.getElementById("feedback").textContent = "Correct!";
      } else {
        timeLeft -= 10;
        document.getElementById("feedback").textContent = "Wrong!";
      }
      // Move on to the next question
      currentQuestionIndex++;
      if (currentQuestionIndex >= questions.length) {
        endQuiz();
      } else {
        displayQuestion();
      }
    });
    choicesEl.appendChild(buttonEl);
  }
}

// Function to end the quiz
function endQuiz() {
  // Stop the timer
  clearInterval(timer);

  // Hide the questions screen and show the end screen
  document.getElementById("questions").classList.add("hide");
  document.getElementById("end-screen").classList.remove("hide");

  // Display the final score
  document.getElementById("final-score").textContent = score;

  // Save the score and initials
  var submitBtn = document.getElementById("submit");
  submitBtn.addEventListener("click", function() {
    var initials = document.getElementById("initials").value;
    localStorage.setItem("highscore", score);
    localStorage.setItem("initials", initials);
    window.location.href = "highscores.html";
  });
}

// Add an event listener to the start button
var startBtn = document.getElementById("start");
startBtn.addEventListener("click", startQuiz);
