const SCRAPER_URI = "http://localhost:3500";
const NUTRIENT_URI = "http://localhost:3600";
const IMAGE_URI = "https://cs361-image-service.herokuapp.com/photo/";
const PRODUCT_URI = "http://localhost:3800"
const USER_DATA_URI = "http://localhost:4500";

// USER DATA SERVICE
const new_user_data = async (name, email) => {
    const res = await fetch(USER_DATA_URI + "/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": name, "email": email })
    });
}

const push_history = async (email, data) => {
    const res = await fetch(USER_DATA_URI + "/update", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "email": email, "data": data })
    });
}

const get_user_data = async (email) => {
    const res = await fetch(USER_DATA_URI + `/userdata?email=${email}`, { method: "GET" });
    const jsonRes = await res.json();
    if (res.status !== 200) throw (jsonRes);
    return await jsonRes;
}

// RECIPE SCRAPER SERVICE
const call_recipe_scraper = async (url) => {
    const res = await fetch(SCRAPER_URI + "?" + "url=" + url, {
        method: 'GET'
    });
    const data = await res.json();

    if (data.error) {
        throw (data.error)
    }

    return data;
}

// NUTRIENT SERVICE
const call_nutrient_service = async (ingredients, servings) => {
    const res = await fetch(NUTRIENT_URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "ingredients": ingredients, "servings": servings })
    });
    const data = await res.json();
    return data;
}

// IMAGE SERVICE
const call_image_service = async (query) => {
    const processed = query.split(" ").join("_");
    const res = await fetch(IMAGE_URI + `${processed}`, {
        method: 'GET',
    })
    return res;
}

// PRODUCT SERVICE
const call_product_service = async (store, query) => {
    const res = await fetch(PRODUCT_URI + "?store=" + store + "&product=" + query, {
        method: 'GET',
    })
    return res;
}

// CREATE REPORT FROM SERVICES
const generate_report_data = async (url) => {
    let reportData = {};
    reportData["products"] = [];
    reportData["ingredientImages"] = [];
    reportData["productImages"] = [];
    reportData["productNames"] = [];
    reportData["ingredientLinks"] = [];

    const recipeData = await call_recipe_scraper(url);
    const nutritionInfo = await call_nutrient_service(recipeData.rawIngredients, recipeData.servings);
    console.log(recipeData.servings)

    // get all the products and put then in products list
    for (const tool of recipeData.tools) {
        const link = await (await call_product_service("amazon", tool)).json();
        reportData["products"].push(link.link);
        reportData["productNames"].push(tool);
        let img = await (await call_image_service(tool)).text();
        img = img.charAt(0) === 'h' ? img : "https://picsum.photos/200";
        reportData["productImages"].push(img);
    }

    // get all the image links for the recipes
    for (const ingredient of recipeData.ingredients) {
        let img = await (await call_image_service(ingredient)).text();
        img = img.charAt(0) === 'h' ? img : "https://picsum.photos/200";
        reportData["ingredientImages"].push(img);
        const link = await (await call_product_service("kroger", ingredient)).json();
        reportData["ingredientLinks"].push(link.link);
    }

    reportData["ingredients"] = recipeData.ingredients;
    reportData["nutrition"] = nutritionInfo;

    return reportData;
}

export {
    generate_report_data,
    call_image_service,
    call_nutrient_service,
    call_recipe_scraper,
    call_product_service,
    get_user_data,
    new_user_data,
    push_history,
}