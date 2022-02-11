const call_recipe_scraper = async (url) => {
    // send get request with url query parameter for the site we are scraping
    const res = await fetch("http://localhost:3500" + "?" + "url=" + url, {
        method: 'GET'
    });
    // convert to json
    const json = await res.json();
    // return the data
    return json;
}

const call_nutrient_service = async (ingredients) => {
    const res = await fetch("http://localhost:3600", {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(ingredients)
    });

} 

const call_image_service = async (query) => {
    const res = await fetch("http://localhost:3700", {
        method: 'GET',
    })
} 

