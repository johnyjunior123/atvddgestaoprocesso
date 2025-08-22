export function capitalizeWords(text: string): string {
    if (!text) return "";

    const lowercaseWords = ["da", "de", "do", "das", "dos"];

    return text
        .toLowerCase()
        .split(" ")
        .map((word, index) => {
            if (index === 0 || !lowercaseWords.includes(word)) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word;
        })
        .join(" ");
}
