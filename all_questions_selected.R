
handling %>% 
 mean() %>% 
 round(1)

round(mean(handling), 1)

document.addEventListener("DOMContentLoaded", function () {
 
 const quiz = document.querySelector("#quiz");
 
 let questions = Array.from(document.querySelectorAll("#quiz .question"));
 
 const prev = document.getElementById("prev");
 const next = document.getElementById("next");
 const submit = document.getElementById("submit");
 const reset = document.getElementById("reset");
 const result = document.getElementById("result");
 
 let current = 0;
 
 function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [arr[i], arr[j]] = [arr[j], arr[i]];
  }
 }
 
 function show(i) {
  
  questions.forEach((q, idx) => {
   
   q.style.display = idx === i ? "block" : "none";
   
   const oldMeta = q.querySelector(".quiz-meta");
   if (oldMeta) oldMeta.remove();
   
  });
  
  current = i;
  
  const currentQuestion = questions[current];
  
  const metaDiv = document.createElement("div");
  metaDiv.className = "quiz-meta";
  metaDiv.textContent = `Question ${current + 1} of ${questions.length}`;
  
  currentQuestion.prepend(metaDiv);
  
  prev.style.display = current === 0 ? "none" : "inline-block";
  next.style.display = current === questions.length - 1 ? "none" : "inline-block";
  submit.style.display = current === questions.length - 1 ? "inline-block" : "none";
 }
 
 function randomize() {
  
  // STEP 1: convert questions to array
  const allQuestions = Array.from(document.querySelectorAll("#quiz .question"));
  
  // STEP 2: shuffle full list
  shuffle(allQuestions);
  
  // STEP 3: pick ONLY 4
  const selected = allQuestions.slice(0, 4);
  
  // STEP 4: rebuild quiz container with selected questions only
  const quiz = document.querySelector("#quiz");
  quiz.innerHTML = ""; // remove all questions
  
  selected.forEach(q => quiz.appendChild(q));
  
  // STEP 5: update questions reference (IMPORTANT)
  questions = selected;
  
  // STEP 6: shuffle selects inside chosen questions
  questions.forEach(q => {
   q.querySelectorAll("select").forEach(sel => {
    const first = sel.options[0];
    const rest = Array.from(sel.options).slice(1);
    shuffle(rest);
    
    sel.innerHTML = "";
    sel.appendChild(first);
    rest.forEach(o => sel.appendChild(o));
   });
  });
  
  // STEP 7: shuffle radio groups inside chosen questions
  questions.forEach(q => {
   const groups = {};
   
   q.querySelectorAll("input[type=radio]").forEach(r => {
    const name = r.name;
    if (!groups[name]) groups[name] = [];
    groups[name].push(r.closest("label"));
   });
   
   Object.values(groups).forEach(group => {
    shuffle(group);
    const parent = group[0].parentElement;
    group.forEach(el => parent.appendChild(el));
   });
  });
 }
 
 function grade() {
  
  let total = 0;
  
  questions.forEach(q => {
   
   let score = 0;
   
   const selects = q.querySelectorAll("select");
   const radios = q.querySelectorAll("input[type=radio]");
   
   if (selects.length > 0) {
    const weight = 1 / selects.length;
    
    selects.forEach(sel => {
     if (sel.value === sel.dataset.answer) score += weight;
    });
    
   } else {
    const checked = q.querySelector("input[type=radio]:checked");
    if (checked && checked.dataset.answer === "true") score = 1;
   }
   
   total += score;
  });
  
  result.textContent =
   `Score: ${total.toFixed(2)} / ${questions.length} = ${(total / questions.length * 100).toFixed(1)}%`;
 }
 
 next.onclick = () => show(current + 1);
 prev.onclick = () => show(current - 1);
 submit.onclick = grade;
 reset.onclick = () => location.reload();
 
 randomize();
 show(0);
 
});