importScripts('nutrients.js');

chrome.action.onClicked.addListener(
    async (tab) => {
        chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 'calculateCalories', async function (response) { 
                if( ('recipeText') in response == true ){

                    nutrients = await recipeNutrients(response.recipeText);
                    let calculatedMacros = { calculatedMacros: nutrients };
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, calculatedMacros, function (response) { });
                    });

                }
            });
        });
    }
)