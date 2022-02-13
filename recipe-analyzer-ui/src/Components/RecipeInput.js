import "../Styles/RecipeInput.css"
import {useEffect, useState} from "react"
import { call_nutrient_service, call_recipe_scraper, generate_report_data } from "../Controller/controller";
import { trigger } from "../Utilities/Events";

function RecipeInput(props) {

    const [input, setInput] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        const inputData = event.target.url.value;
        scrape(inputData);
    }

    const scrape = (input) => {

        generate_report_data(input).then((reportData) => {
            props.setToolsInfo(reportData.products);
            props.setNutrientInfo(reportData.nutrition);
            trigger('RecipeInput:new-report', reportData);
        })
    }

    return (
        <div id="recipe-input-container">
            <div id="recipe-input-title">Input a recipe to begin!</div>
            <button>Supported Sites</button>

            <form className="input-form" id="recipe-input-form" onSubmit={onSubmit}>
                <div>URL</div>
                <input placeholder="e.g. https://www.nutrition.gov/recipes/pita-pizzas" name="url" type="text" onChange={(event) => {setInput(event.target.value)}}/>
            </form>
            <button onClick={() => {scrape(input)}}>Analyze!</button>
        </div>
    )
}

export default RecipeInput;