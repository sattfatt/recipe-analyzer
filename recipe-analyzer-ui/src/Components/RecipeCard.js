import { useEffect, useState } from "react";
import '../Styles/RecipeCard.css';
import { off, on } from "../Utilities/Events";
import CollapseList from "./CollapseList";
import HealthScore from "./HealthScore";
import NumberDisplay from "./NumberDisplay";


function RecipeCard(props) {

    const [isActive, setIsActive] = useState(false);
    const [reportData, setReportData] = useState({});

    const onReport = (e) => {
        setReportData(e.detail);
        setIsActive((active)=>false);
        setIsActive((active)=>true);
        console.log("handling")
        document.getElementById("recipe-card-container").scrollIntoView({behavior:"smooth"});
    }

    useEffect(() => {
        on('RecipeInput:new-report', onReport);

        return (() => {
            off('RecipeInput:new-report', onReport);
        })
    }, [])


    if (isActive) {
        return (
            <div id="recipe-card-container">
                <div id="recipe-card-title">Recipe Report</div>
                <HealthScore score={reportData.nutrition.score}></HealthScore>
                <div id="recipe-card-macro-container" className="flex-row">
                    <NumberDisplay title="carbs" titleSize="15px" titlePad="3px 5px 3px 5px">{reportData.nutrition.carbs}</NumberDisplay>
                    <NumberDisplay title="fat" titleSize="15px" titlePad="3px 5px 3px 5px">{reportData.nutrition.fat}</NumberDisplay>
                    <NumberDisplay title="protein" titleSize="15px" titlePad="3px 5px 3px 5px">{reportData.nutrition.protein}</NumberDisplay>
                </div>
                <CollapseList
                    active={isActive}
                    title="Products"
                    items={reportData.products}
                    images={reportData.productImages}
                    itemNames={reportData.productNames}>

                </CollapseList>
                <CollapseList
                    active={isActive}
                    title="Ingredients"
                    items={reportData.ingredients}
                    images={reportData.ingredientImages}
                    itemNames={reportData.ingredients}>

                </CollapseList>

                <button onClick={()=>{document.querySelector("body").scrollIntoView({behavior:"smooth"})}}>Go Again!</button>
            </div>
        );
    } else {
        return (
            <div id="empty">

            </div>
        )
    }

}

export default RecipeCard;