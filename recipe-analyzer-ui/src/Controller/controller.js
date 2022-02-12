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




export {call_image_service, call_nutrient_service, call_recipe_scraper, call_product_service}