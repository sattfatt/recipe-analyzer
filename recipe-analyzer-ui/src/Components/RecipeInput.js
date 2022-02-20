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

        try{
            let domain = new URL(input);
            console.log(domain.hostname);
            if (domain.hostname !== "www.nutrition.gov"){
                alert("URL needs to be of the form: http://www.nutrition.gov/recipes/<recipe name>")
                return;
            }
        }
        catch(error) {
            console.error(error);
            alert("URL needs to be of the form: http://www.nutrition.gov/recipes/<recipe name>")
            return;
        }

        

        generate_report_data(input).then((reportData) => {
            props.setToolsInfo(reportData.products);
            props.setNutrientInfo(reportData.nutrition);
            trigger('RecipeInput:new-report', reportData);
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }

    return (
        <div id="recipe-input-container">
            <div id="recipe-input-title" style={{fontSize:"14px"}}>Input a recipe link and I will generate a report!</div>
            <button onClick={()=>{alert("Supported Sites: \nhttps://www.nutrition.gov/recipes/<recipe name>")}}>Supported Sites</button>

            <form className="input-form" id="recipe-input-form" onSubmit={onSubmit}>
                <div>URL</div>
                <input placeholder="e.g. https://www.nutrition.gov/recipes/pita-pizzas" name="url" type="text" onChange={(event) => {setInput(event.target.value)}}/>
            </form>
            <button onClick={() => {scrape(input)}}>Analyze!</button>
        </div>
    )
}

export default RecipeInput;