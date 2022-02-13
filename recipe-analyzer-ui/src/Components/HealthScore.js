import { useEffect, useState } from 'react';
import NumberDisplay from './NumberDisplay';


function HealthScore(props) {

    function componentToHex(c) {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function lerp(t, start, end) {
        return start + t * (end - start);
    }

    function getColor(score) {
        const r = Math.floor(lerp(255, 0, props.score/1000));
        const g = Math.floor(lerp(0, 255, props.score/1000));
        const b = 0;
        const hex = rgbToHex(r,g,b);
        return hex;
    }

    return (
        <div id="health-score">
            <NumberDisplay style={{ color: getColor(props.score), fontSize:"100px"}} title="Score">
                {props.score}
            </NumberDisplay>
        </div>
    );
}

export default HealthScore;