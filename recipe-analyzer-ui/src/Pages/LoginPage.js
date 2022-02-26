import { useState } from "react";
import { login } from "../Session/session";

import "../Styles/LoginPage.css"

function LoginPage() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const callLogin = () => {
        console.log(username, password)
        login(username, password)
    }

    return (
        <div id="login-container">
            Login
            <input type="text" name="username" id="username" placeholder="Username" onChange={e => setUsername(e.target.value)}></input>
            <input type="password" name="Password" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
            <button id="login-button" onClick={callLogin}>Login</button>
        </div>
    )
}
export default LoginPage;