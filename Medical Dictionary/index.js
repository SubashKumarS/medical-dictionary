// Elements
const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const speakBtn = document.getElementById("speakBtn");

// Medical Search Function
async function fetchMedicalTerm(term) {

    try {
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "none";

        infoTextEl.innerText = `Searching medical information for "${term}"...`;

        // Wikipedia API
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${term}`;

        const response = await fetch(url);
        const data = await response.json();

        // Not found case
        if (!data.extract) {
            infoTextEl.innerText = "Medical term not found ❌";
            return;
        }

        // Show result
        infoTextEl.style.display = "none";
        meaningContainerEl.style.display = "block";

        titleEl.innerText = data.title;
        meaningEl.innerText = data.extract;

    } catch (error) {
        infoTextEl.innerText = "Error fetching data ⚠";
        console.log(error);
    }
}

// Enter key search
inputEl.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
        fetchMedicalTerm(e.target.value.trim());
    }
});


// 🔊 TEXT TO SPEECH (VOICE)
speakBtn.addEventListener("click", () => {

    const text = meaningEl.innerText;

    if (!text || text === "_______") {
        alert("Search a medical term first!");
        return;
    }

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.cancel(); // stop previous speech
    window.speechSynthesis.speak(speech);
});
