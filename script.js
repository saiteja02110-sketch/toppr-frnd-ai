let currentMode = "AI Study Coach";

function setMode(mode) {
    currentMode = mode;
    document.getElementById("featureTitle").innerText = mode;
    // Remove active class from all and add to clicked
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

async function askTopperFrnd() {
    const input = document.getElementById("studentInput").value;
    const output = document.getElementById("aiResponse");

    if(!input) return alert("Please type something first!");

    output.innerHTML = "<i>Topper Frnd is thinking...</i>";

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/toppr-frnd-ai/topper-frnd-ai", 
            {
                headers: { 
                    Authorization: "Bearer YOUR_HF_TOKEN", // Replace with your actual token
                    "Content-Type": "application/json" 
                },
                method: "POST",
                body: JSON.stringify({ "inputs": `Mode: ${currentMode}. User Question: ${input}` }),
            }
        );

        const data = await response.json();
        // Hugging Face returns an array, we take the first text result
        output.innerText = data[0].generated_text || "I'm a bit stuck. Ask me again!";
    } catch (error) {
        output.innerText = "Error connecting to the AI. Check your internet or API token.";
    }
}
let timer;

function startLightningPractice() {
    let timeLeft = 600; // 10 Minutes in seconds
    const output = document.getElementById("aiResponse");
    
    // Clear any old timers
    clearInterval(timer);
    
    // Start Countdown
    timer = setInterval(() => {
        if(timeLeft <= 0) {
            clearInterval(timer);
            alert("Time is up! Let's see how you did.");
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById("featureTitle").innerText = `⚡ Practice Timer: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timeLeft--;
        }
    }, 1000);

    // Ask AI to generate the questions
    document.getElementById("studentInput").value = "Generate 5 MCQs and 2 coding questions on Data Structures for a 10-minute test.";
    askTopperFrnd(); // This triggers the AI call
}
async function startQuiz() {
    const output = document.getElementById("aiResponse");
    output.innerHTML = "<i>Generating a custom quiz for you...</i>";

    const quizPrompt = "Act as a Topper. Generate 3 Multiple Choice Questions (MCQs) about Computer Science with options A, B, C, and D. Provide the correct answers at the bottom.";

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/YOUR_USERNAME/topper-frnd-ai", 
            {
                headers: { 
                    Authorization: "Bearer YOUR_HF_TOKEN", 
                    "Content-Type": "application/json" 
                },
                method: "POST",
                body: JSON.stringify({ "inputs": quizPrompt }),
            }
        );

        const data = await response.json();
        // Formatting the response to look nice
        output.innerHTML = `<pre style="white-space: pre-wrap;">${data[0].generated_text}</pre>`;
    } catch (error) {
        output.innerText = "Error generating quiz. Please check your API connection.";
    }
}
