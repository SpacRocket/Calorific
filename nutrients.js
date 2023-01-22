importScripts('./configuration/secrets.js');

/**
 * [Check if the string is in different language]
 * @param {[string]} text
 */
async function getEnglishText(textForTranslation) {
    return fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: {
            'Authorization': deeplKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: [textForTranslation],
            target_lang: 'EN'
        })
    }).then(
        response => {
            return response.json()
        }
    ).then(
        jsonConv => {
            console.log(jsonConv);
            return jsonConv.translations[0].text;
        }
    );
    ;

}

/**
 * [Calculates recipe nutritients based on english text.]
 * @param {[string]} recipe
 */
async function recipeNutrients(recipe) {
    recipe = await getEnglishText(recipe);
    return fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-app-id': apiAppId,
            'x-app-key': apiKey,
            'x-remote-user-id': '0'
        },
        body: JSON.stringify({
            query: recipe
        })
    })
        .then(res => res.json())
        .then(data => {

            let totalKcal = 0
            let totalFat = 0
            let totalProtein = 0
            let totalCarb = 0

            data.foods.forEach(ingredient => {
                totalKcal += ingredient.nf_calories
                totalProtein += ingredient.nf_protein
                totalFat += ingredient.nf_total_fat
                totalCarb += ingredient.nf_total_carbohydrate
            })

            return new Promise(resolve => {
                resolve({
                    kcal: totalKcal,
                    protein: totalProtein,
                    fat: totalFat,
                    carb: totalCarb
                }
                )
            });

        })
}