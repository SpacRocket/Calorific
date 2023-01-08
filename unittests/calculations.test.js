const recipeNutritients = require('../nutrients.js');

test('Create a request', async () => {
    const result = await recipeNutritients("10 medium sized eggs and 100g of butter. It's a perfect recipe!");
    console.log(result);
});