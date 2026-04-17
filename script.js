function askTopperFrnd() {
    const input = document.getElementById("studentInput").value.toLowerCase().trim();
    const output = document.getElementById("aiResponse");

    if (!input) return alert("Type something!");

    output.innerHTML = "<i>🤔 Searching...</i>";

    for (let i = 0; i < dataset.length; i++) {
        let item = dataset[i];

        if (!item.question || !item.answer) continue;

        if (item.question.toLowerCase().includes(input)) {
            output.innerText = `💡 Answer:\n\n${item.answer}`;
            return;
        }
    }

    // fallback: keyword search
    for (let i = 0; i < dataset.length; i++) {
        let item = dataset[i];

        if (!item.question || !item.answer) continue;

        let words = input.split(" ");

        for (let word of words) {
            if (item.question.toLowerCase().includes(word)) {
                output.innerText = `💡 Answer:\n\n${item.answer}`;
                return;
            }
        }
    }

    output.innerText = "❌ No match found. Try simple keywords like: stack, array, loop.";
}
