import RecipeInput from "../Components/RecipeInput";
import RecipeCard from "../Components/RecipeCard";
import { useState } from "react";
function MainPage(props) {
    const [nutrientInfo, setNutrientInfo] = useState(null);
    const [toolInfo, setToolsInfo] = useState(null);
    const [analysisHistory, setAnanlysisHistory] = useState([])



    return (
        <>
            <h1>Recipe Analyzer</h1>
            <RecipeInput cookies={props.cookies} setNutrientInfo = {setNutrientInfo} setToolsInfo = {setToolsInfo}></RecipeInput>
            <RecipeCard nutrients={nutrientInfo}></RecipeCard>
        </>
    );
}

export default MainPage;