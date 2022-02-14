import { useState, useEffect, useRef } from "react";
import { on, off } from "../Utilities/Events";
import "../Styles/CollapseList.css"
import ListItem from "./ListItem";
import {MdExpandLess} from "react-icons/md";

function CollapseList(props) {

    const [isActive, setIsActive] = useState(false);
    const [maxHeight, setMaxHeight] = useState("0px");
    const [opacity, setOpacity] = useState(0);
    const [visibility, setVisibility] = useState("hidden");
    const [angle, setAngle] = useState(0);

    const activate = (active) => {
        setIsActive(active);
        if (active) {
            setMaxHeight("min-content");
            setOpacity(1);
            setAngle(180);
        }
        else {
            setMaxHeight("0px");
            setOpacity(0);
            setAngle(0);
        }
    }

    function displayList(items, images, itemNames) {
        return (
            items.map((item, index) => {
                return (
                    <ListItem key={index}>
                        <a href={item} style={{ flex: 2 }}>{itemNames[index]}</a>
                        <img src={images[index]} styel={{ flex: 1 }}></img>
                    </ListItem>
                )
            })
        );
    }

    return (
        <div id="collapse-main-container">
            <div id="collapse-list-title" className="flex-row" onClick={() => { activate(!isActive) }}>
                <div>{props.title}</div>
                <div style={{transform: `rotateX(${angle}deg)`, transition: "0.5s", marginLeft:"auto"}}><MdExpandLess/></div>
            </div>
            <div id="collapse-list-container" style={{ opacity: opacity, maxHeight: maxHeight }}>
                {displayList(props.items, props.images, props.itemNames)}
            </div>
        </div>
    );
}

export default CollapseList;