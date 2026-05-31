document.addEventListener("DOMContentLoaded", function () {

  // ============================
  // ROOT QUIZ
  // ============================
  const quiz = document.querySelector(".quiz-bank");
  if (!quiz) return;

  const questionContainer = quiz.querySelector(".questions");
  let questions = Array.from(questionContainer.querySelectorAll(".q"));

  let currentQuestion = 0;

  const randomQ = quiz.dataset.randomQuestions === "true";
  const randomOpt = quiz.dataset.randomOptions === "true";

  // ============================
  // SHUFFLE FUNCTION
  // ============================
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // ============================
  // RANDOMIZE QUESTIONS
  // ============================
  if (randomQ) {
    shuffle(questions);
    questions.forEach(q => questionContainer.appendChild(q));
  }

  // refresh after shuffle
  questions = Array.from(questionContainer.querySelectorAll(".q"));

  // ============================
  // SHOW ONLY ONE QUESTION
  // ============================
  function showQuestion(index) {
    questions.forEach((q, i) => {
      q.style.display = (i === index) ? "block" : "none";
    });
    currentQuestion = index;
  }

  showQuestion(0);

  // ============================
  // RANDOMIZE OPTIONS
  // ============================
  if (randomOpt) {

    questions.forEach(q => {

      // RANDOMIZE SELECTS
      q.querySelectorAll("select").forEach(sel => {

        const first = sel.options[0];
        const others = Array.from(sel.options).slice(1);

        shuffle(others);

        sel.innerHTML = "";
        sel.appendChild(first);
        others.forEach(o => sel.appendChild(o));
      });

      // RANDOMIZE RADIO GROUPS
      const radioGroups = new Map();

      q.querySelectorAll("input[type=radio]").forEach(radio => {
        const wrapper = radio.closest("div");
        if (!wrapper) return;

        const parent = wrapper.parentNode;
        if (!radioGroups.has(parent)) {
          radioGroups.set(parent, []);
        }

        radioGroups.get(parent).push(wrapper);
      });

      radioGroups.forEach((items, parent) => {
        shuffle(items);
        items.forEach(item => parent.appendChild(item));
      });

    });
  }

  // ============================
  // NAVIGATION BUTTONS
  // ============================
  const prev = quiz.querySelector(".prev-btn");
  const next = quiz.querySelector(".next-btn");
  const submit = quiz.querySelector(".grade-btn");
  const reset = quiz.querySelector(".reset-btn");
  const scoreBox = quiz.querySelector(".score");

  function updateButtons() {
    if (prev) prev.style.display = currentQuestion === 0 ? "none" : "inline-block";
    if (next) next.style.display = currentQuestion === questions.length - 1 ? "none" : "inline-block";
    if (submit) submit.style.display = currentQuestion === questions.length - 1 ? "inline-block" : "none";
  }

  updateButtons();

  if (next) {
    next.onclick = () => {
      if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion + 1);
        updateButtons();
      }
    };
  }

  if (prev) {
    prev.onclick = () => {
      if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
        updateButtons();
      }
    };
  }

  // ============================
  // GRADING
  // ============================
  if (submit) {

    submit.onclick = () => {

      let total = 0;
      let max = questions.length;

      questions.forEach(q => {

        let score = 0;

        const selects = q.querySelectorAll("select");
        const radios = q.querySelectorAll("input[type=radio]");

        // DROPDOWNS
        if (selects.length > 0) {

          const weight = 1 / selects.length;

          selects.forEach(sel => {
            if (sel.value === sel.dataset.answer) {
              score += weight;
            }
          });

        }

        // RADIOS
        else if (radios.length > 0) {

          const checked = q.querySelector("input[type=radio]:checked");

          if (checked && checked.dataset.answer === "true") {
            score = 1;
          }

        }

        total += score;

      });

      const percent = (total / max) * 100;

      if (scoreBox) {
        scoreBox.textContent =
          `Score: ${total.toFixed(2)}/${max} (${percent.toFixed(1)}%)`;
      }

    };
  }

  // ============================
  // RESET
  // ============================
  if (reset) {
    reset.onclick = () => location.reload();
  }

});