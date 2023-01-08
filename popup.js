import {apiAppId, apiKey} from './secrets.js';

const request = {
    query: `
	2	eggs
    50g	sugar
    125g	salted butter
    125g	dark chocolate of your choice (but choose a good one)
    1 tbsp	cocoa powder
    1 tbsp	cornflour or potato flour
    100g	sweet orange marmalade (ideally chopped)
    zest of 1 orange
    2 tbsp	coffee liqueur
` 
}

fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-app-id': apiAppId,
        'x-app-key': apiKey,
        'x-remote-user-id': '0'
    },
    body: JSON.stringify(request)
})
.then(res => res.json())
.then(data => {
    console.log(data)

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

    return {
        kcal: totalKcal,
        protein: totalProtein,
        fat: totalFat,
        carb: totalCarb
    }

})