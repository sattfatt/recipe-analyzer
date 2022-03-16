import fetch from "node-fetch";

const API_KEY = "c005168537ed49d0a105af50c280725b"
const URI = "https://api.spoonacular.com/recipes/parseIngredients"

async function getNutritionData(ingredients, servings) {

    const joinedIngredients = ingredients.join('\n')

    const res = await fetch(URI + `?apiKey=${API_KEY}`, {
        method: 'POST',
        'Content-Type': 'application/x-www-form-urlencoded',
        body: new URLSearchParams({
            'ingredientList': joinedIngredients,
            'servings': servings,
            'includeNutrition': true
        })
    })

    const data = await res.json()

    let totalCalories = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    

    for (let i = 0; i < data.length; i++) {       
        const nutrients = data[i].nutrition.nutrients;       

        for (let j = 0; j < nutrients.length; j++) {
            const nutrient = nutrients[j];

            if (nutrient.name == "Calories") {
                totalCalories += nutrient.amount
            } else if (nutrient.name == "Fat") {
                totalFat += nutrient.amount
            } else if (nutrient.name == "Carbohydrates") {
                totalCarbs += nutrient.amount
            } else if (nutrient.name == "Protein") {
                totalProtein += nutrient.amount
            }
        }
    }

    totalCalories /= servings
    totalFat /= servings
    totalCarbs /= servings
    totalProtein /= servings

    // calculate dist to 40 30 30
    
    const total_cal_from_macros = 9*totalFat + 4*totalCarbs + 4*totalProtein

    const percent_fat = 9*totalFat / total_cal_from_macros
    const percent_carb = 4*totalCarbs / total_cal_from_macros
    const percent_prot = 4*totalProtein / total_cal_from_macros

    const dist_from_optimal = Math.sqrt(
        Math.pow(percent_fat-0.3, 2) + 
        Math.pow(percent_carb-0.3, 2) + 
        Math.pow(percent_prot-0.3,2))

    const score = (1 - dist_from_optimal) * 1000 


    return {
        'score': score.toFixed(2),
        'fat': totalFat.toFixed(2),
        'carbs': totalCarbs.toFixed(2),
        'protein': totalProtein.toFixed(2)
    }
};

export default getNutritionData;