import "../Styles/RecipeInput.css"
import {useState} from "react"
import { call_nutrient_service, call_recipe_scraper } from "../Controller/controller";

function RecipeInput(props) {

    const [input, setInput] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        const inputData = event.target.url.value;
        scrape(inputData);
    }

    const scrape = (input) => {
        call_recipe_scraper(input).then((data) => {
            console.log("scraped: \n" + JSON.stringify(data))
            props.setToolsInfo(data.tools)
            call_nutrient_service(data).then((nutrients) => {
                props.setNutrientInfo(nutrients);
                console.log(JSON.stringify(nutrients))
            })
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