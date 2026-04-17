async function askTopperFrnd() {
    const userInput = document.getElementById("studentInput").value;
    const outputArea = document.getElementById("aiResponse");

    outputArea.innerText = "Thinking like a topper...";

    // This connects to YOUR fine-tuned model
    const response = await fetch(
        "https://api-inference.huggingface.co/models/YOUR_USERNAME/topper-frnd-ai", 
        {
            headers: { 
                Authorization: "Bearer hf_xxxxxxxxxxxxxxxxxxxx", // Your Access Token
                "Content-Type": "application/json" 
            },
            method: "POST",
            body: JSON.stringify({ "inputs": userInput }),
        }
    );

    const result = await response.json();
    
    // Display the output from the dataset-trained model
    outputArea.innerText = result[0].generated_text || "Try again, friend!";
}
