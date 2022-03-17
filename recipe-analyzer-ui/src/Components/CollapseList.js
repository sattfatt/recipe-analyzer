import { useState, useEffect, useRef } from "react";
import { on, off } from "../Utilities/Events";
import "../Styles/CollapseList.css"
import ListItem from "./ListItem";
import { MdExpandLess } from "react-icons/md";

function CollapseList(props) {

    const [isActive, setIsActive] = useState(false);
    const [maxHeight, setMaxHeight] = useState("0px");
    const [opacity, setOpacity] = useState(0);
    const [angle, setAngle] = useState(0);

    const activate = (active) => {
        setIsActive(active);
        if (active) {
            setMaxHeight("500px");
            setOpacity(1);
            setAngle(180);
        }
        else {
            setMaxHeight("0px");
            setOpacity(0);
            setAngle(0);
        }
    }

    function displayList(items, images, itemNames, history) {

        if (history) {
            return (
                items.map((item, index) => {
                    return (
                        <ListItem item={item} scrape={props.scrape} key={index}>
                            <div >{item}</div>
                        </ListItem>
                    )
                })
            );
        }

        return (
            items.map((item, index) => {
                return (
                    <ListItem key={index}>
                        <a href={item} rel="noopener noreferrer" target="_blank">{itemNames[index]}</a>
                        <img src={images[index]} ></img>
                    </ListItem>
                )
            })
        );
    }

    return (
        <div id="collapse-main-container">
            <div id="collapse-list-title" className="flex-row" onClick={() => { activate(!isActive) }}>
                <div>{props.title}</div>
                <div style={{ transform: `rotateX(${angle}deg)`, transition: "0.5s", marginLeft: "auto" }}><MdExpandLess /></div>
            </div>
            <div id="collapse-list-container" style={{ opacity: opacity, maxHeight: maxHeight }}>
                {displayList(props.items, props.images, props.itemNames, props.history)}
            </div>
        </div>
    );
}

export default CollapseList;