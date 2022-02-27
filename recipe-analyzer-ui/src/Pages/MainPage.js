import RecipeInput from "../Components/RecipeInput";
import RecipeCard from "../Components/RecipeCard";
import { useEffect, useState } from "react";
import { ProfileBox } from "../Components/ProfileBox";
import "../Styles/ProfileBox.css"
import { useLocation } from "react-router-dom";
import {useCookies} from "react-cookie";
import LoadingModule from "../Components/LoadingModule";

function MainPage(props) {
    const [nutrientInfo, setNutrientInfo] = useState(null);
    const [toolInfo, setToolsInfo] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'email', 'name']);

    return (
        <>
            <h1>Recipe Analyzer</h1>
            <RecipeInput cookies={cookies} setNutrientInfo = {setNutrientInfo} setToolsInfo = {setToolsInfo}></RecipeInput>
            <LoadingModule></LoadingModule>
            <RecipeCard nutrients={nutrientInfo}></RecipeCard>
            <ProfileBox cookies={cookies}></ProfileBox>
        </>
    );
}

export default MainPage;