const API_URL = "https://api.mymemory.translated.net/get"; // Free translation API

// Function to change language dynamically
async function changeLanguage(lang) {
    // Update the language in the dropdown button text
    document.getElementById("selectedLanguage").innerText = lang === 'en' ? 'English' : 'Français';

    // Get all elements in the body
    const elements = document.body.getElementsByTagName("*");
    let textNodes = [];

    // Extract all text nodes
    for (const element of elements) {
        for (const node of element.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
                textNodes.push(node);
            }
        }
    }

    // Collect all text to be translated
    const originalTexts = textNodes.map(node => node.nodeValue.trim());

    try {
        const translatedTexts = await Promise.all(originalTexts.map(async text => {
            try {
                const response = await fetch(`${API_URL}?q=${encodeURIComponent(text)}&langpair=en|${lang}`);
                const data = await response.json();

                // If API has translated text, return it. Otherwise, return original text
                if (data.responseData) {
                    return data.responseData.translatedText || text;
                } else {
                    console.error("Translation failed for:", text);
                    return text;
                }
            } catch (error) {
                console.error("API Request failed:", error);
                return text; // Fallback to the original text in case of error
            }
        }));

        // Replace text content with translated content
        textNodes.forEach((node, i) => node.nodeValue = translatedTexts[i]);
    } catch (error) {
        console.error("Translation error:", error);
    }
}
