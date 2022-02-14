const call_recipe_scraper = async (url) => {
    // send get request with url query parameter for the site we are scraping
    const res = await fetch("http://localhost:3500" + "?" + "url=" + url, {
        method: 'GET'
    });
    // convert to json
    const data = await res.json();
    // return the data
    return data;
}

const call_nutrient_service = async (ingredients) => {
    const res = await fetch("http://localhost:3600", {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(ingredients)
    });
    const data = await res.json();
    return data;
} 

const call_image_service = async (query) => {
    const res = await fetch("http://localhost:3700", {
        method: 'GET',
    })
    return res;
} 

const call_product_service = async (query) => {
    const res = await fetch("http://localhost:3800", {
        method: 'GET',
    })
    return res;
}


const generate_report_data = async (url) => {
    let reportData = {};
    reportData["products"] = [];
    reportData["ingredientImages"] = [];
    reportData["productImages"] = [];
    reportData["productNames"] = [];
    
    const recipeData = await call_recipe_scraper(url);

    const nutritionInfo = await call_nutrient_service(recipeData);
    
    // get all the products and put then in products list
    for (const tool of recipeData.tools) {
        const link = await (await call_product_service(tool)).json();
        reportData["products"].push(link.link);
        reportData["productNames"].push(tool);

        const img = await (await call_image_service(tool)).json();
        reportData["productImages"].push(img.link);
    }

    // get all the image links for the recipes
    for (const ingredient of recipeData.ingredients) {
        const link = await (await call_image_service(ingredient)).json();
        reportData["ingredientImages"].push(link.link);
    }

    reportData["ingredients"] = recipeData.ingredients;
    reportData["nutrition"] = nutritionInfo;



    return reportData;
}



export {generate_report_data, call_image_service, call_nutrient_service, call_recipe_scraper, call_product_service}