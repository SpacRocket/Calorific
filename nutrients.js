importScripts('./configuration/secrets.js');

/**
 * [Calculates recipe nutritients based on english text.]
 * @param {[string]} recipe
 */
async function recipeNutrients(recipe) {

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