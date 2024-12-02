


let sourceLangElement = document.getElementById("sourceLang");
let targetLangElement = document.getElementById("targetLang");

let userInput = document.getElementById("userInputContainer");
let userOutput = document.getElementById("userOutputContainer");

let translateBtnElement = document.getElementById("translateBtn");



function displayResponse(translatedText) {

    console.log("display response");

    userOutput.textContent = translatedText;
}



async function makeApiCalls(userText, sourceLanguage, targetLanguage) {
    console.log("reached here");


    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    const options = {
	    method: 'POST',
	    headers: {
            'x-rapidapi-key': 'be437f3ca7msh0bad5a17ce9f5e5p164dc6jsnbc89126b7671',
		    'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
		    'Content-Type': 'application/x-www-form-urlencoded',
		    'Accept-Encoding': 'application/gzip'
	    },
	    body: new URLSearchParams({
            q: userText,
            target: targetLanguage,
            source: sourceLanguage
	    })
};

try {
	const  response = await fetch(url, options);
	const result = await response.json();

    const translatedText = result.data.translations[0].translatedText;
	console.log(translatedText);
    displayResponse(translatedText);
} catch (error) {
	console.error(error);
    displayResponse("error occured while translating. Please Try again Later");
}

    
}





translateBtnElement.onclick = function () {

    let userText = userInput.value;

    if (userText === '') {
        return alert('Please Enter text')
    }

    let sourceLanguage = sourceLangElement.value;

    let targetLanguage = targetLangElement.value;


    if (sourceLanguage === targetLanguage) {
        return alert('Please Enter Different language to Translate')
    }

    makeApiCalls(userText, sourceLanguage, targetLanguage);

   
}