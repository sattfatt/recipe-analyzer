import "../Styles/NumberDisplay.css"


function NumberDisplay(props) {
    return (
        <div id="number-container" style = {props.style}>
            <div id="number-title" style={{fontSize:props.titleSize, padding: props.titlePad}}>{props.title}</div>
            {props.children}
        </div>
    )
}

export default NumberDisplay;