import "../Styles/LoginPage.css"

function LoginPage() {
    return (
        <div id="login-container">
            Login
            <input type="text" name="username" id="username" placeholder="Username"></input>
            <input type="text" name="Password" id="password" placeholder="Password"></input>
            <button id="login-button">Login</button>
        </div>
    )
}
export default LoginPage;