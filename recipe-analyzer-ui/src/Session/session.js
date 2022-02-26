import { trigger } from "../Utilities/Events.js"
import {new_user_data} from "../Controller/controller.js"

let session_token = null;
let current_user = null;
let current_email = null;

async function validate_session(token) {
    if (token === null || token === undefined) {
        return false;
    }

    const res = await fetch("http://localhost:4000/verify_token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'token': token })
    });

    const currentTime = Date.now() / 1000
    const resbody = await res.json();
    if (currentTime > resbody.exp) {
        console.log("expired!", currentTime, resbody.exp)
        throw ({ error: "token expired" })
    }
    else {
        trigger('verify');
        return true;
    }
}

async function login(email, password) {

    const res = await fetch("http://localhost:4000/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'email': email, 'password': password })
    });

    if (res.status === 201) {
        const resbody = await res.json();
        session_token = { token: resbody.token };
        current_email = resbody.email;
        current_user = resbody.name;
        trigger('login', resbody);
        return resbody;
    } else {
        throw ({ "error": "Not Found" })
    }
}

async function register(name, email, password) {

    if(!name || !email || !password) throw({error: "Must provide all fields."})

    const res = await fetch("http://localhost:4000/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'name': name, 'email': email, 'password': password })
    });
    if (res.status !== 201) throw ({ error: "Email already exists." })
    // also create user data here.
    new_user_data(name, email);
}


export { validate_session, login, register, current_email};