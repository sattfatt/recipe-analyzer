import {trigger} from "../Utilities/Events.js"

let session_token = null;

async function validate_session() {
    if (session_token === null) {
        return false;
    }
    try {
        const res = await fetch("http://localhost:4000/verify_token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(session_token)
        });

        const currentTime = Date.now()/1000
        const resbody = await res.json();
        
        if (currentTime > resbody.exp) {
            console.log("expired!", currentTime, resbody.exp)
            return false;
        }
        else {
            trigger('verify');
            return true;
        }

    } catch (error) {
        console.error(error);
        return false;
    }

}

async function login(email, password) {
    try {
        const res = await fetch("http://localhost:4000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': email, 'password': password })
        });

        if (res.status === 201) {
            const resbody = await res.json();
            session_token = {token : resbody.token};
            trigger('login', resbody);
            return resbody;
        } else {
            return({"error": "Not Found"})
        }
    } catch (error) {
        console.log(error);
    }


}

export {validate_session, login};