import { useState } from "react";
import {useCookies} from "react-cookie";

import {MdLogout} from "react-icons/md"

function ProfileBox(props) {

    const [toggle, setToggle] = useState(false);
    const [logoutElement, setLogoutElement] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'name', 'email']);
    
    const logout = () => {
        removeCookie('token');
        removeCookie('name');
        removeCookie('email');
        window.location.reload(false);
    }

    const onClick = () => {
        if (!logoutElement) {
            setLogoutElement(<button style={{background:"red", color:"white"}} id="logout-button" onClick={logout}>Logout &nbsp;<MdLogout/></button>)
        } else {
            setLogoutElement();
        }
    }


    return (
        <div onClick={onClick} id="profile-container">
            <div>{props.cookies.name}</div>
            {logoutElement}
        </div>
    );
}

export {ProfileBox};