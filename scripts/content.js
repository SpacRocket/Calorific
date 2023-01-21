function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function showTheNutritionTable(nutrition) {
    let table = document.getElementById('nutriTable');
    if(table) {table.remove();}
    var c, r, t;
    let nutriTable = document.createElement('table');
    nutriTable.id = 'nutriTable';

    let counter = 0;
    for(key of Object.keys(nutrition.calculatedMacros)){
        r = nutriTable.insertRow(counter);
        c = r.insertCell(0);
        c.innerHTML = key;
        c = r.insertCell(1);
        c.innerHTML = Math.round(100 * nutrition.calculatedMacros[key]) / 100;

        counter++;
    }

    window.getSelection().baseNode.after(nutriTable);
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message === 'calculateCalories') {
        sendResponse({ recipeText: getSelectionText() });
    }

    if ( ('calculatedMacros') in message == true) {
        showTheNutritionTable(message);
    }

});