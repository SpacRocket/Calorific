function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message === 'calculateCalories') {
        sendResponse({ recipeText: getSelectionText() });
    }

    if ( ('calculatedMacros') in message == true) {
        alert(JSON.stringify(message)); 
    }

});