import RecipeInput from "../Components/RecipeInput";
import RecipeCard from "../Components/RecipeCard";
import { useState } from "react";
function MainPage() {
    const [nutrientInfo, setNutrientInfo] = useState(null);
    const [toolInfo, setToolsInfo] = useState(null);
    return (
        <>
            <h1>Recipe Analyzer</h1>
            <RecipeInput setNutrientInfo = {setNutrientInfo} setToolsInfo = {setToolsInfo}></RecipeInput>
            <RecipeCard nutrients={nutrientInfo}></RecipeCard>
        </>
    );
}

export default MainPage;