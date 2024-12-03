
import languageMap from './languageMap.js';

let sourceLangElement = document.getElementById("sourceLang");
let targetLangElement = document.getElementById("targetLang");

let userInput = document.getElementById("userInputContainer");
let userOutput = document.getElementById("userOutputContainer");

let translateBtnElement = document.getElementById("translateBtn");

let isLanguageFetched = false;


async function mapLanguagesInOptions(languageResults) {
    console.log("mapLanguage in options");

    languageResults.data.languages.map((eachLanguage) => {
        // console.log(eachLanguage);

        if (languageMap[eachLanguage.language]){
            let optionsElement = document.createElement("option");
            optionsElement.textContent = languageMap[eachLanguage.language]
            
            optionsElement.value = eachLanguage.language
            
            sourceLangElement.appendChild(optionsElement.cloneNode(true));
            targetLangElement.appendChild(optionsElement);
            
        }
    })

}





async function sourceLanguageApi () {

    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages';

    const options = {
        method : "GET",
        headers : {
            'x-rapidapi-key': 'be437f3ca7msh0bad5a17ce9f5e5p164dc6jsnbc89126b7671',
		    'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
		    'Accept-Encoding': 'application/gzip'
        }
    }

    const fetchLanguageResults = await fetch(url, options);

    const languageResults = await fetchLanguageResults.json();

    await mapLanguagesInOptions(languageResults);

    // console.log(languageResults);
}



sourceLangElement.onclick = async function() {
    console.log("reached Source Language");

    if (!isLanguageFetched) {
        sourceLanguageApi();
    }

    isLanguageFetched = true;

    
}






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





translateBtnElement.onclick = async function () {

    let userText = userInput.value;

    if (userText === '') {
        return alert('Please Enter text')
    }

    let sourceLanguage = sourceLangElement.value;

    let targetLanguage = targetLangElement.value;


    if (sourceLanguage === targetLanguage) {
        return alert('Please Enter Different language to Translate')
    }

    
    translateBtnElement.disabled = true; // Before API call
    await makeApiCalls(userText, sourceLanguage, targetLanguage);
    translateBtnElement.disabled = false; // After API call


    // makeApiCalls(userText, sourceLanguage, targetLanguage);

   
}
