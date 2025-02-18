const API_URL = "https://lingvanex.com/translate"; // Alternative Free Translation API

document.addEventListener("DOMContentLoaded", function () {
    async function changeLanguage(lang) {
        const languageElement = document.getElementById("selectedLanguage");

        if (!languageElement) {
            console.error("Element with ID 'selectedLanguage' not found.");
            return;
        }

        languageElement.innerText = lang === "en" ? "English" : "Français";

        const elements = document.body.getElementsByTagName("*");
        let textNodes = [];

        for (const element of elements) {
            for (const node of element.childNodes) {
                if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
                    textNodes.push(node);
                }
            }
        }

        const originalTexts = textNodes.map(node => node.nodeValue.trim());

        if (originalTexts.length === 0) {
            console.warn("No translatable text found.");
            return;
        }

        try {
            const translatedTexts = await Promise.all(originalTexts.map(async text => {
                try {
                    const response = await fetch(`${API_URL}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            q: text,
                            source: "en",
                            target: lang,
                            format: "text"
                        })
                    });
                    const data = await response.json();
                    return data.translatedText || text;
                } catch (error) {
                    console.error("API Request failed:", error);
                    return text;
                }
            }));

            textNodes.forEach((node, i) => node.nodeValue = translatedTexts[i]);
        } catch (error) {
            console.error("Translation error:", error);
        }
    }

    // Attach event listeners to dropdown items
    document.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", function () {
            const lang = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            changeLanguage(lang);
        });
    });
});
