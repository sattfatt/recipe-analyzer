const PRODUCT_SERVICE_URI = "https://cs-361-product-search.herokuapp.com/" //?source={source}&item={item_name}"

import fetch from "node-fetch";

const product_service = async (source, query) => {
    const response = await (await fetch(PRODUCT_SERVICE_URI+`?source=${source}&item=${query}`, {method:'GET'})).json();

    return response.link;
}

export default product_service;