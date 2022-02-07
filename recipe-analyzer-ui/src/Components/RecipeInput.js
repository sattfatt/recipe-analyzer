import "../Styles/RecipeInput.css"

function RecipeInput(props) {

    const onSubmit = (event) => {
        event.preventDefault();
        // do all the other stuff we need to do here.
        // i.e. api call webscraper microservice
        const inputData = event.target.url.value;

        console.log("scraping: " + inputData)
    }

    return (
        <div id="recipe-input-container">
            <div>Input a recipe to begin!</div>
            <button>Supported Sites</button>
            <form className="input-form" id="recipe-input-form" onSubmit={onSubmit}>
                <div>URL</div><input name="url" type="text" />
                <button>Analyze!</button>
            </form>
        </div>
    )
}

export default RecipeInput;