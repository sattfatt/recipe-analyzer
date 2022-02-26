import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../Session/session";

import "../Styles/LoginPage.css"


function RegisterPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [failureMessage, setFailureMessage] = useState(<div></div>);

    const callRegister = () => {
        register(username, email, password).then(() => {
            navigate("/login", {replace:true});
        }).catch((error) => {
            setFailureMessage(<div style={{color:"red", fontSize:"10px"}}>{error.error}</div>)
        });
    }

    return (
        <div id="login-container">
            Register
            <input type="text" name="username" id="username" placeholder="Username" onChange={e => setUsername(e.target.value)}></input>
            <input type="text" name="email" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)}></input>
            <input type="password" name="Password" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
            {failureMessage}
            <button id="login-button" onClick={callRegister}>Register</button>
        </div>
    )
}
export default RegisterPage;