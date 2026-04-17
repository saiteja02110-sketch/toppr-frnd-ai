function askTopperFrnd() {
    const input = document.getElementById("studentInput").value.toLowerCase().trim();
    const output = document.getElementById("aiResponse");

    if (!input) return alert("Type something!");

    output.innerHTML = "<i>🤔 Thinking...</i>";

    let bestMatch = null;
    let maxScore = 0;

    dataset.forEach(item => {
        if (!item.question || !item.answer) return;

        const question = item.question.toLowerCase();
        const words = input.split(" ");

        let score = 0;

        words.forEach(word => {
            if (question.includes(word)) {
                score += 2;
            }
        });

        // bonus if full sentence partially matches
        if (question.includes(input)) {
            score += 5;
        }

        if (score > maxScore) {
            maxScore = score;
            bestMatch = item;
        }
    });

    setTimeout(() => {
        if (bestMatch && maxScore > 0) {
            output.innerText = `💡 Answer:\n\n${bestMatch.answer}`;
        } else {
            output.innerText = "🤔 No match found.\n👉 Try simple keywords like: stack, array, loop";
        }
    }, 300);
}
