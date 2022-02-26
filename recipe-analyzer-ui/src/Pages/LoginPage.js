import { useState } from "react";
import { login } from "../Session/session";
import { Link } from "react-router-dom";
import "../Styles/LoginPage.css"

function LoginPage() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [failureMessage, setFailureMessage] = useState(<div></div>);

    const callLogin = () => {
        console.log(username, password)
        login(username, password).catch((error)=>{
            setFailureMessage(<div style={{color:"red", fontSize:"10px"}}>User not found!</div>)
        })
    }

    return (
        <div id="login-container">
            Login
            <input type="text" name="email" id="username" placeholder="Username" onChange={e => setUsername(e.target.value)}></input>
            <input type="password" name="Password" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
            {failureMessage}
            <button id="login-button" onClick={callLogin}>Login</button>
            <Link style={{fontSize: "10px"}} to="/register">Don't have an account?</Link>
        </div>
    )
}
export default LoginPage;