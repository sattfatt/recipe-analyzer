import { useEffect, useState, useRef } from 'react';
import NumberDisplay from './NumberDisplay';


function HealthScore(props) {

    const [currentScore, setCurrentScore] = useState(0);
    const intervalRef = useRef(0);

    function componentToHex(c) {
        let hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function lerp(start, end, t) {
        return start + t * (end - start);
    }

    function getColor(score) {

        return Math.floor(lerp(0, 1, score / 1000) * 120);
    }

    const incrementScore = () => {
        if (currentScore < props.score) {
            setCurrentScore((currentScore) => {
                if (currentScore < props.score) {
                    return currentScore + 5;
                }
                else {
                    clearInterval(intervalRef.current)
                    return props.score;
                }
            });
        }
    }

    useEffect(() => {
        intervalRef.current = setInterval(incrementScore);
    }, [])

    return (
        <div id="health-score">
            <NumberDisplay style={{ color: `hsl(${getColor(currentScore)}deg, 100%, 50%)`, fontSize: "100px" }} title="Score">
                {currentScore}
            </NumberDisplay>
        </div>
    );
}

export default HealthScore;