// ===============================
// GLOBAL VARIABLES
// ===============================
let currentMode = "AI Study Coach";
let dataset = [];
let timer = null;


// ===============================
// LOAD DATASET
// ===============================
fetch("final_dataset.json")
  .then(res => res.json())
  .then(data => {
      dataset = data;
      console.log("✅ Dataset loaded:", dataset.length);
  })
  .catch(err => {
      console.error("❌ Failed to load dataset", err);
  });


// ===============================
// MODE SWITCH
// ===============================
function setMode(mode, event) {
    currentMode = mode;
    document.getElementById("featureTitle").innerText = "🧠 " + mode;

    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    if (event) {
        event.currentTarget.classList.add('active');
    }
}


// ===============================
// SMART AI SEARCH (FIXED)
// ===============================
function askTopperFrnd() {
    const input = document.getElementById("studentInput").value.toLowerCase();
    const output = document.getElementById("aiResponse");

    if (!input) return alert("Please type something!");

    output.innerHTML = "<i>🤔 Thinking...</i>";

    let bestMatch = null;
    let maxScore = 0;

    const inputWords = input.split(" ");

    dataset.forEach(item => {
        if (!item.question) return;

        let score = 0;
        const questionText = item.question.toLowerCase();

        inputWords.forEach(word => {
            if (questionText.includes(word)) {
                score++;
            }
        });

        if (score > maxScore) {
            maxScore = score;
            bestMatch = item;
        }
    });

    setTimeout(() => {
        if (bestMatch && maxScore > 1) {

            if (bestMatch.type === "mcq") {
                output.innerText =
                    `🎯 Question:\n${bestMatch.question}\n\nOptions:\n${bestMatch.options}\n\nAnswer: ${bestMatch.answer}`;
            } 
            else if (bestMatch.type === "coding") {
                output.innerText =
                    `💻 Coding Problem:\n${bestMatch.question}\n\n💡 Solution:\n${bestMatch.answer}`;
            } 
            else {
                output.innerText =
                    `💡 Topper Friend (${currentMode}):\n\n${bestMatch.answer}`;
            }

        } else {
            output.innerText =
                "🤔 I couldn't find a good match.\n👉 Try keywords like: stack, array, loop, python, queue";
        }
    }, 400);
}


// ===============================
// QUIZ ENGINE (5 RANDOM MCQs)
// ===============================
function startQuiz() {
    const output = document.getElementById("aiResponse");

    let mcqs = dataset.filter(d => d.type === "mcq");

    if (mcqs.length === 0) {
        output.innerText = "❌ No MCQs found in dataset!";
        return;
    }

    // Shuffle
    mcqs = mcqs.sort(() => 0.5 - Math.random()).slice(0, 5);

    let text = "🎯 QUIZ ENGINE\n\n";

    mcqs.forEach((q, i) => {
        text += `${i + 1}. ${q.question}\n${q.options}\n\n`;
    });

    text += "👉 Try answering before checking solutions!";

    output.innerText = text;
}


// ===============================
// LIGHTNING PRACTICE (10 MIN TEST)
// ===============================
function startLightningPractice() {
    const output = document.getElementById("aiResponse");

    let mcqs = dataset.filter(d => d.type === "mcq")
                      .sort(() => 0.5 - Math.random())
                      .slice(0, 5);

    let coding = dataset.filter(d => d.type === "coding")
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 2);

    let text = "⚡ LIGHTNING PRACTICE (10 MIN TEST)\n\n";

    text += "📝 5 MCQs:\n\n";
    mcqs.forEach((q, i) => {
        text += `${i + 1}. ${q.question}\n${q.options}\n\n`;
    });

    text += "💻 2 CODING QUESTIONS:\n\n";
    coding.forEach((c, i) => {
        text += `${i + 1}. ${c.question}\n\n`;
    });

    output.innerText = text;

    startTimer(600); // 10 minutes
}


// ===============================
// TIMER FUNCTION
// ===============================
function startTimer(seconds) {
    clearInterval(timer);

    const title = document.getElementById("featureTitle");

    timer = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(timer);
            alert("⏰ Time's up!");
        } else {
            let min = Math.floor(seconds / 60);
            let sec = seconds % 60;
            title.innerText = `⚡ Time Left: ${min}:${sec < 10 ? '0' : ''}${sec}`;
            seconds--;
        }
    }, 1000);
}


// ===============================
// SMART NOTES
// ===============================
function generateNotes() {
    const input = document.getElementById("studentInput").value.toLowerCase();
    const output = document.getElementById("aiResponse");

    if (!input) return alert("Enter topic!");

    let
