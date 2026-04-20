let coachData = [];

// 1. Load the dataset from the path you created
async function loadData() {
    try {
        const response = await fetch('datasets/final_dataset.json');
        coachData = await response.json();
        console.log("✅ Dataset loaded successfully!");
    } catch (error) {
        console.error("❌ Error loading dataset:", error);
    }
}

// Initialize data loading
loadData();

// 2. Search logic: This is the 'Brain' of your static site
function getAnswer() {
    const userInput = document.getElementById("userInput").value.toLowerCase();
    const outputDiv = document.getElementById("output");
    
    if (!userInput) {
        outputDiv.innerHTML = "Please enter a question or topic!";
        return;
    }

    // Filter data to find the best match
    // It checks if the question includes any part of the user's input
    const match = coachData.find(item => 
        item.question.toLowerCase().includes(userInput)
    );

    if (match) {
        // Displaying the result based on type
        outputDiv.innerHTML = `
            <div class="result-card">
                <p><strong>Category:</strong> ${match.type.toUpperCase()}</p>
                <p><strong>Question:</strong> ${match.question}</p>
                <p><strong>Answer:</strong> ${match.answer}</p>
            </div>
        `;
    } else {
        outputDiv.innerHTML = "I'm still learning! Try a different keyword (e.g., 'coding', 'math', 'career').";
    }
}
