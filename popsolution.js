// 🌟 STEM Educational Technology Quiz JS
const startBtn = document.getElementById("start-quiz-btn");
const instructionsContainer = document.getElementById("instructions-container");
const quizContainer = document.querySelector(".quiz-container");
const aboutLink = document.getElementById("about-link");
const homeLink = document.getElementById("home-link");
const contactLink = document.getElementById("contact-link");
const aboutSection = document.getElementById("about-section");
const contactSection = document.getElementById("contact-section");

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const feedbackDiv = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const hintElement = document.getElementById("hint");
const correctCountElement = document.getElementById("correct-count");
const wrongCountElement = document.getElementById("wrong-count");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const hintBtn = document.getElementById("hint-btn");

let currentQuestion = 0;
let correctCount = 0;
let wrongCount = 0;
let answeredCount = 0;
let hintsUsed = 0;

const quizData = [
  { question: "What does STEM stand for?",
    options: ["Science, Technology, Engineering, and Mathematics","Software, Tools, Education, and Mechanics","Systematic Teaching for Educational Management","Scientific Training for Engineering Majors"],
    answer: "Science, Technology, Engineering, and Mathematics",
    hint: "Think about the four main disciplines in modern education." },
  { question: "Which of the following tools supports educational technology?",
    options: ["Google Classroom","Instagram","Reddit","LinkedIn"],
    answer: "Google Classroom",
    hint: "It's a Google product widely used in schools." },
  { question: "What is the main purpose of educational games?",
    options: ["Entertainment only","Motivation and learning","Time management","Distraction reduction"],
    answer: "Motivation and learning",
    hint: "They make learning fun and engaging." },
  { question: "Which programming language is commonly used in educational robotics?",
    options: ["Python","HTML","CSS","SQL"],
    answer: "Python",
    hint: "It's known for simplicity and used in Raspberry Pi projects." },
  { question: "Cognitive load theory focuses on:",
    options: ["Reducing unnecessary mental effort in learning","Increasing memory storage","Measuring student emotions","Testing physical endurance"],
    answer: "Reducing unnecessary mental effort in learning",
    hint: "It’s about how much information a learner’s brain can handle at once." },
  { question: "Virtual Reality (VR) helps in:",
    options: ["Passive learning","Immersive learning","Traditional lectures","Textbook reading"],
    answer: "Immersive learning",
    hint: "It puts learners inside a simulated environment." },
  { question: "Which is NOT part of STEM?",
    options: ["Science","Technology","Engineering","Medicine"],
    answer: "Medicine",
    hint: "It’s more related to healthcare than engineering or science." },
  { question: "AI tutors in education mainly support:",
    options: ["Personalized learning","Manual grading","Physical activities","Paper-based exams"],
    answer: "Personalized learning",
    hint: "They adjust to each student’s pace and needs." },
  { question: "Which technology allows real-time collaboration in education?",
    options: ["Google Docs","Photoshop","Notepad","Excel offline"],
    answer: "Google Docs",
    hint: "You can see others typing live." },
  { question: "Gamification in education means:",
    options: ["Using game elements to enhance learning","Playing video games during class","Avoiding competition","Focusing only on scores"],
    answer: "Using game elements to enhance learning",
    hint: "Think of points, badges, and levels." }
];

// 🌟 Start Quiz
startBtn.addEventListener("click", () => {
  instructionsContainer.style.display = "none";
  quizContainer.style.display = "block";
  aboutSection.classList.remove("show");
  contactSection.classList.remove("show");
  loadQuestion();
});

// 🌟 Show Hint
hintBtn.addEventListener("click", () => {
  const q = quizData[currentQuestion];
  if (hintsUsed < 2) {
    hintElement.textContent = q.hint;
    hintsUsed++;
  } else {
    hintElement.textContent = "⚠️ You’ve used both hints for this quiz!";
  }
});

// 🌟 Load Question
function loadQuestion() {
  if (currentQuestion >= quizData.length) {
    feedbackDiv.innerHTML = `🏁 Quiz complete! 🎉<br>Your Final Score: <span style="color:green;">${correctCount}</span> / ${quizData.length}`;
    progressBar.style.width = "100%";
    progressText.textContent = `${quizData.length} of ${quizData.length}`;
    optionsContainer.innerHTML = "";
    hintElement.textContent = "";
    return;
  }

  const q = quizData[currentQuestion];
  questionElement.textContent = `Question ${currentQuestion + 1}: ${q.question}`;
  optionsContainer.innerHTML = "";
  feedbackDiv.textContent = "";
  hintElement.textContent = "";
  hintsUsed = 0;

  q.options.forEach(option => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "question";
    radio.value = option;
    radio.onclick = () => checkAnswer(option);
    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + option));
    optionsContainer.appendChild(label);
  });

  updateProgress();
  updateScore();
}

// 🌟 Check Answer
function checkAnswer(selectedOption) {
  const q = quizData[currentQuestion];
  answeredCount++;

  if (selectedOption === q.answer) {
    feedbackDiv.innerHTML = "🎉 Correct! Great job!";
    feedbackDiv.style.color = "green";
    correctCount++;
    showConfetti();
  } else {
    feedbackDiv.innerHTML = "😢 Wrong answer!";
    feedbackDiv.style.color = "red";
    wrongCount++;
  }

  updateScore();
  updateProgress();

  if (wrongCount === 3) {
    setTimeout(() => { alert("You made 3 mistakes. Try again!"); location.reload(); }, 500);
    return;
  }

  setTimeout(() => { currentQuestion++; loadQuestion(); }, 1500);
}

// 🌟 Update Progress
function updateProgress() {
  const progressPercent = (answeredCount / quizData.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
  progressText.textContent = `${Math.min(currentQuestion + 1, quizData.length)} of ${quizData.length}`;
}

// 🌟 Update Score
function updateScore() {
  correctCountElement.textContent = `Correct: ${correctCount}`;
  wrongCountElement.textContent = `Wrong: ${wrongCount}`;
}

// 🌟 Confetti
function showConfetti() {
  const emojis = ["🎉","🌟","✨","🎈","💖"];
  const duration = 1200;
  const end = Date.now() + duration;
  (function frame() {
    const particle = document.createElement('div');
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.position = "fixed";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 50 + "%";
    particle.style.fontSize = `${Math.random()*20 + 20}px`;
    particle.style.zIndex = "9999";
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), duration);
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// 🌟 Navigation
prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) { currentQuestion--; loadQuestion(); }
});
nextBtn.addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) { currentQuestion++; loadQuestion(); }
});

// 🌟 Navbar Links
aboutLink.addEventListener("click", (e) => {
  e.preventDefault();
  instructionsContainer.style.display = "none";
  quizContainer.style.display = "none";
  contactSection.classList.remove("show");
  aboutSection.classList.toggle("show");
});
contactLink.addEventListener("click", (e) => {
  e.preventDefault();
  instructionsContainer.style.display = "none";
  quizContainer.style.display = "none";
  aboutSection.classList.remove("show");
  contactSection.classList.toggle("show");
});
homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  aboutSection.classList.remove("show");
  contactSection.classList.remove("show");
  instructionsContainer.style.display = "block";
  quizContainer.style.display = "none";
});
