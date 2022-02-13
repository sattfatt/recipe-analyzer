import { useEffect, useState } from "react";
import '../Styles/RecipeCard.css';
import { off, on } from "../Utilities/Events";
import HealthScore from "./HealthScore";
import NumberDisplay from "./NumberDisplay";


function RecipeCard(props) {
    
    const [isActive, setIsActive] = useState(false);
    const [reportData, setReportData] = useState({});

    const onReport = (e) => {
        setReportData(e.detail);
        setIsActive(true);
    }

    useEffect(()=>{
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
                <div className="flex-row">
                    <NumberDisplay title="carbs" titleSize="15px" titlePad="0px 5px 0px 5px">{reportData.nutrition.carbs}</NumberDisplay>
                    <NumberDisplay title="fat" titleSize="15px" titlePad="0px 5px 0px 5px">{reportData.nutrition.fat}</NumberDisplay> 
                    <NumberDisplay title="protein" titleSize="15px" titlePad="0px 5px 0px 5px">{reportData.nutrition.protein}</NumberDisplay> 
                </div>
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