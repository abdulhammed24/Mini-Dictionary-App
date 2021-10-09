const inputBox = document.getElementById("input-text");
const searchResult = document.querySelector(".search-result");
const synonymEl = document.querySelector(".synonyms");
const textEl = document.querySelector(".text");
const cancelBtn = document.querySelector(".cancel");
const speakerBtn = document.querySelector(".speaker");
let audio;

inputBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && inputBox.value !== "") {
        fetchAPI(inputBox.value)
    }

})

async function fetchAPI(word) {
    searchResult.classList.remove("active");
    textEl.style.display = "block";
    textEl.style.color = "#000"
    textEl.innerHTML = `Searching for the meaning of <span>"${word}"</span>.`;
    try {
        const baseURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const response = await fetch(baseURL);
        const result = await response.json();
        console.log(result)
        generateHTML(result);
    } catch {
        textEl.innerHTML = `<span>"${inputBox.value}"</span> not found.Please, try to search for another word.`;
        textEl.style.color = "#000"
    }

}



function generateHTML(data) {

    if (data.title) {
        textEl.innerHTML = `<span>"${inputBox.value}"</span> not found.Please, try to search for another word.`;
        textEl.style.color = "#000"
    } else {

        let name = data[0].word;
        let phonetics = data[0].phonetic;
        let pos = data[0].meanings[0].partOfSpeech;
        let define = data[0].meanings[0].definitions[0].definition;
        let examples = data[0].meanings[0].definitions[0].example;
        // let synonym = data[0].meanings[0].definitions[0].synonyms;
        audio = new Audio("https:" + data[0].phonetics[0].audio);


        document.querySelector(".name").innerText = name;
        document.querySelector(".translation").innerText = `${pos} /${phonetics}/`;
        document.querySelector(".list-subheader").innerText = define;
        if (examples.title) {
            document.querySelector(".list-subheader-2").parentElement.parentElement.style.display = "none";
        } else {
            document.querySelector(".list-subheader-2").innerText = examples;
        }

        searchResult.classList.add("active");
        textEl.style.display = "none";
    }
}

speakerBtn.addEventListener("click", () => {
    speakerBtn.style.color = "#9b0707";
    audio.play();
    setTimeout(() => {
        speakerBtn.style.color = "#999";
    }, 700)
})

cancelBtn.addEventListener("click", () => {
    inputBox.focus();
    searchResult.classList.remove("active")
    inputBox.value = "";
    textEl.style.color = "#989898";
    textEl.style.display = "block";
    textEl.innerHTML = `Start typing to search word`
})