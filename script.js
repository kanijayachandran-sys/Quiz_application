const questions = [
  {
    text: "Which keyword declares a constant in JavaScript?",
    options: ["let", "var", "const", "static"],
    answerIndex: 2
  },
  {
    text: "Which method converts a JSON string into a JavaScript object?",
    options: ["JSON.stringify()", "JSON.parse()", "Object.fromJSON()", "JSON.toObject()"],
    answerIndex: 1
  },
  {
    text: "What is the output type of document.querySelectorAll()?",
    options: ["Array", "HTMLCollection", "NodeList", "Element"],
    answerIndex: 2
  },
  {
    text: "Which symbol starts a single-line comment in JavaScript?",
    options: ["<!--", "//", "/*", "#"],
    answerIndex: 1
  }
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(questions);

let currentIndex = 0;
let score = 0;

const questionNumberEl = document.getElementById("question-number");
const scoreDisplayEl = document.getElementById("score-display");
const questionTextEl = document.getElementById("question-text");
const optionsListEl = document.getElementById("options-list");
const feedbackBarEl = document.getElementById("feedback");
const feedbackIconEl = document.getElementById("feedback-icon");
const feedbackTextEl = document.getElementById("feedback-text");
const nextBtn = document.getElementById("next-btn");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

const optionLetters = ["A", "B", "C", "D", "E", "F"];

loadQuestion();

function loadQuestion() {
  const q = questions[currentIndex];

  questionNumberEl.textContent = `${currentIndex + 1} / ${questions.length}`;
  scoreDisplayEl.textContent = `${score}`;

  questionTextEl.textContent = q.text;
  optionsListEl.innerHTML = "";
  resetFeedback();
  nextBtn.disabled = true;

  q.options.forEach((optionText, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.dataset.index = index;

    const labelSpan = document.createElement("span");
    labelSpan.className = "option-label";
    labelSpan.textContent = optionLetters[index] || String(index + 1);

    const textSpan = document.createElement("span");
    textSpan.className = "option-text";
    textSpan.textContent = optionText;

    button.appendChild(labelSpan);
    button.appendChild(textSpan);

    button.addEventListener("click", () => handleAnswer(index));

    li.appendChild(button);
    optionsListEl.appendChild(li);
  });
}

function resetFeedback() {
  feedbackBarEl.className = "feedback-bar";
  feedbackIconEl.textContent = "";
  feedbackTextEl.textContent = "Choose an answer to see feedback.";
  setTimeout(() => {
    feedbackBarEl.classList.add("visible");
  }, 0);
}

function handleAnswer(selectedIndex) {
  const q = questions[currentIndex];
  const buttons = document.querySelectorAll(".option-btn");
  const correctIndex = q.answerIndex;

  buttons.forEach(btn => (btn.disabled = true));

  if (selectedIndex === correctIndex) {
    score++;
    showFeedback("correct", "Correct! Nice one.");
  } else {
    const correctText = q.options[correctIndex];
    showFeedback("wrong", `Not quite. Correct answer: ${correctText}`);
  }

  buttons.forEach(btn => {
    const idx = Number(btn.dataset.index);
    if (idx === correctIndex) {
      btn.classList.add("option-correct");
    } else if (idx === selectedIndex) {
      btn.classList.add("option-wrong");
    }
  });

  scoreDisplayEl.textContent = `${score}`;
  nextBtn.disabled = false;
}

function showFeedback(type, message) {
  feedbackBarEl.className = "feedback-bar visible " + type;
  if (type === "correct") {
    feedbackIconEl.textContent = "✓";
  } else {
    feedbackIconEl.textContent = "!";
  }
  feedbackTextEl.textContent = message;
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  finalScoreEl.textContent = `You scored ${score} out of ${questions.length}.`;
}

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  shuffle(questions);
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
});
