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
                    `💻 Coding:\n${bestMatch.question}\n\n💡 Solution:\n${bestMatch.answer}`;
            } 
            else {
                output.innerText =
                    `💡 Topper Friend:\n${bestMatch.answer}`;
            }
        } else {
            output.innerText =
                "🤔 I couldn't find a good match. Try simpler keywords like 'stack', 'array', 'loop'.";
        }
    }, 400);
}
