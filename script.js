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
