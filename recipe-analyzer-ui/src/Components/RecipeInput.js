import "../Styles/RecipeInput.css"
import {useState} from "react"
function RecipeInput(props) {

    const [input, setInput] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        const inputData = event.target.url.value;
        scrape(inputData);
    }

    const scrape = (input) => {
        analyze(input).then((data) => {
            console.log("scraped: " + data)
        })
    }

    const analyze = async (url) => {
        return url;
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