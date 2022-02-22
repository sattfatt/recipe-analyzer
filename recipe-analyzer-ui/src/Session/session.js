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
        if (res.status == 200) {
            const currentTime = Date.now()
            const resbody = await res.json();
            if (currentTime > resbody.exp) {
                return false;
            }
            else return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
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

        if (res.status == 200) {
            const resbody = res.json();
            return ({
                "name" : resbody.name,
                "email": resbody.email,
                "token": resbody.token
            })
        }

    } catch (error) {
        console.log(error);
    }


}

export default session_token;