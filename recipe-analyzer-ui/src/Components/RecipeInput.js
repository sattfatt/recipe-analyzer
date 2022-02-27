import "../Styles/RecipeInput.css"
import {useEffect, useState} from "react"
import { call_nutrient_service, call_recipe_scraper, generate_report_data, get_user_data, push_history } from "../Controller/controller";
import { off, on, trigger } from "../Utilities/Events";
import { current_email } from "../Session/session";
import CollapseList from "./CollapseList";

function RecipeInput(props) {

    const [input, setInput] = useState("");

    const [history, setHistory] = useState([]);

    const onSubmit = (event) => {
        event.preventDefault();
        const inputData = event.target.url.value;
        scrape(inputData);
    }

    const onSelect = (event) => {
        event.preventDefault();
        const inputData = event.target.innerHTML
        scrape(inputData)
    }

    const gethistory = () => {
        get_user_data(props.cookies.email).then((data) => {
            setHistory(prev => data.history);
        });
    }

    useEffect(() => {
        gethistory();
    },[]);

    const scrape = (input) => {

        try{
            let domain = new URL(input);
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
            push_history(props.cookies.email, input).then(() => {
                get_user_data(props.cookies.email).then((data) => {
                    setHistory(data.history);
                });
            });
            trigger('RecipeInput:new-report', reportData);
        }).catch((error) => {
            console.log(error);
            //alert(error);
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

            <CollapseList
                active={true}
                title="History"
                items={history}
                itemNames={history}
                images={history}
                history
                scrape={scrape}
            />

            <button onClick={() => {scrape(input)}}>Analyze!</button>
        </div>
    )
}

export default RecipeInput;