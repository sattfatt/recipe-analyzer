import { useEffect, useState } from "react";
import { off, on } from "../Utilities/Events";
import "../Styles/LoadingModule.css"
import React from "react";
import { ReactComponent as Loadsvg } from "../SVG/loading1.svg";

function LoadingModule(props) {
    const [html, setHtml] = useState();


    const onStart = (e) => {
        setHtml(
            <div>Generating Report<Loadsvg /></div>
        );
        document.getElementById("loading-container").scrollIntoView({ behavior: "smooth" });
    }

    const onEnd = (e) => {
        setHtml();
    }

    useEffect(() => {
        on("RecipeInput:start-report", onStart);
        on("RecipeInput:end-report", onEnd);

        return () => {
            off("RecipeInput:start-report", onStart);
            off("RecipeInput:end-report", onEnd);
        }

    }, [])

    return (
        <div id="loading-container">
            {html}
        </div>
    );
}

export default LoadingModule;